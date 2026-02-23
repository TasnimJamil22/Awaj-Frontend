import React, { useMemo, useRef, useState } from "react";

type ReportMode = "anonymous" | "verified";

type ComplaintCategory =
  | "corruption"
  | "fraud"
  | "harassment"
  | "misconduct"
  | "cyber"
  | "other";

type EvidenceFile = {
  name: string;
  size: number;
  type: string;
  lastModified: number;
};

type ComplaintRecord = {
  caseId: string;
  pin: string;
  createdAt: string;
  status:
    | "Submitted"
    | "Under Review"
    | "Assigned"
    | "In Progress"
    | "Resolved"
    | "Closed";
  mode: ReportMode;
  category: ComplaintCategory;
  incidentDate: string;
  location: {
    division?: string;
    district?: string;
    area?: string;
    address?: string;
  };
  accused?: string;
  description: string;
  contact?: {
    name?: string;
    phone?: string;
    email?: string;
  };
  evidence: EvidenceFile[];
};

const STORAGE_KEY = "civic_complaints_v1";
const LAST_SUBMIT_KEY = "civic_complaints_last_submit_ms";

// You can optionally set: VITE_COMPLAINT_API_URL=https://your-api.com
const getApiBase = () => {
  const meta = import.meta as ImportMeta & { env: Record<string, string | undefined> };
  return meta.env.VITE_COMPLAINT_API_URL as string | undefined;
};

const formatBytes = (bytes: number) => {
  const units = ["B", "KB", "MB", "GB"];
  let n = bytes;
  let i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
};

const bdPhoneOk = (v: string) => {
  // Accepts: 01XXXXXXXXX or +8801XXXXXXXXX
  const s = v.trim();
  return /^(\+8801|01)\d{9}$/.test(s);
};

const safeNowIso = () => new Date().toISOString();

function randomDigits(len: number) {
  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  return Array.from(arr, (n) => (n % 10).toString()).join("");
}

function generateCaseId() {
  // Example: BD-2026-02-23-834291
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `BD-${yyyy}-${mm}-${dd}-${randomDigits(6)}`;
}

function generatePin() {
  // 6-digit pin
  return randomDigits(6);
}

function loadComplaints(): ComplaintRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveComplaint(rec: ComplaintRecord) {
  const all = loadComplaints();
  all.unshift(rec);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

async function trySubmitToApi(payload: Omit<ComplaintRecord, "caseId" | "pin" | "createdAt" | "status">) {
  const base = getApiBase();
  if (!base) return { ok: false as const, reason: "no_api" as const };

  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/complaints`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // NOTE: For real production, evidence should be uploaded via presigned URLs or multipart.
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return { ok: false as const, reason: "bad_status" as const };
    }

    const data = await res.json().catch(() => ({}));
    return { ok: true as const, data };
  } catch {
    return { ok: false as const, reason: "network" as const };
  }
}

const CATEGORIES: { id: ComplaintCategory; title: string; hint: string }[] = [
  {
    id: "corruption",
    title: "Corruption / Bribery",
    hint: "Bribe demand, misuse of public funds, illegal advantage.",
  },
  {
    id: "fraud",
    title: "Fraud / Scam",
    hint: "Fake promises, money fraud, cheating, identity fraud.",
  },
  {
    id: "harassment",
    title: "Harassment / Eve-teasing",
    hint: "Harassment in public, workplace, transport, or online.",
  },
  {
    id: "misconduct",
    title: "Misconduct / Abuse of Power",
    hint: "Threats, unfair treatment, illegal pressure, coercion.",
  },
  {
    id: "cyber",
    title: "Cyber harassment / Online fraud",
    hint: "Account hacking, extortion, impersonation, harassment online.",
  },
  {
    id: "other",
    title: "Other",
    hint: "Anything not covered above.",
  },
];

const DIVISIONS = [
  "Dhaka",
  "Chattogram",
  "Khulna",
  "Rajshahi",
  "Sylhet",
  "Barishal",
  "Rangpur",
  "Mymensingh",
];

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "application/pdf",
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "video/mp4",
]);

export default function SubmitComplaint() {
  const [mode, setMode] = useState<ReportMode>("anonymous");
  const [category, setCategory] = useState<ComplaintCategory>("corruption");
  const [incidentDate, setIncidentDate] = useState<string>(() => {
    // Default to today (YYYY-MM-DD)
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });

  const [division, setDivision] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [accused, setAccused] = useState<string>("");

  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [consent, setConsent] = useState<boolean>(false);

  const [evidence, setEvidence] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [banner, setBanner] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  const [success, setSuccess] = useState<{
    caseId: string;
    pin: string;
    savedLocal: boolean;
  } | null>(null);

  const selectedCategory = useMemo(
    () => CATEGORIES.find((c) => c.id === category),
    [category]
  );

  const validate = () => {
    const e: Record<string, string> = {};

    if (!category) e.category = "Please choose a category.";
    if (!incidentDate) e.incidentDate = "Incident date is required.";

    // Disallow future dates (client-side)
    if (incidentDate) {
      const chosen = new Date(incidentDate + "T00:00:00");
      const now = new Date();
      if (chosen.getTime() > now.getTime() + 24 * 60 * 60 * 1000) {
        e.incidentDate = "Incident date cannot be in the future.";
      }
    }

    if (!description.trim()) e.description = "Please describe what happened.";
    if (description.trim() && description.trim().length < 30) {
      e.description = "Please add more details (at least 30 characters).";
    }

    if (mode === "verified") {
      if (!name.trim()) e.name = "Name is required for verified reports.";
      if (!phone.trim()) e.phone = "Phone is required for verified reports.";
      if (phone.trim() && !bdPhoneOk(phone)) {
        e.phone = "Enter a valid BD phone (01XXXXXXXXX or +8801XXXXXXXXX).";
      }
      if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        e.email = "Enter a valid email address.";
      }
    }

    if (!consent) e.consent = "You must confirm the declaration to submit.";

    if (evidence.length > MAX_FILES) {
      e.evidence = `You can upload up to ${MAX_FILES} files.`;
    }
    for (const f of evidence) {
      if (f.size > MAX_FILE_SIZE) {
        e.evidence = `Each file must be <= ${formatBytes(MAX_FILE_SIZE)}.`;
        break;
      }
      if (f.type && !ACCEPTED_TYPES.has(f.type)) {
        e.evidence =
          "Unsupported file type. Allowed: JPG, PNG, PDF, MP3/WAV, MP4.";
        break;
      }
    }

    // Simple anti-spam honeypot could be added; leaving minimal here.

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onPickFiles = (files: FileList | null) => {
    if (!files) return;
    const picked = Array.from(files);
    const next = [...evidence];

    for (const f of picked) {
      if (next.length >= MAX_FILES) break;
      next.push(f);
    }
    setEvidence(next);

    // Reset input so picking same file again works
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (idx: number) => {
    setEvidence((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setBanner(null);

    // Local rate limit (30 seconds)
    const last = Number(localStorage.getItem(LAST_SUBMIT_KEY) || "0");
    const now = Date.now();
    if (now - last < 30_000) {
      setBanner({
        type: "error",
        text: "Please wait a few seconds before submitting another report.",
      });
      return;
    }

    if (!validate()) {
      setBanner({ type: "error", text: "Please fix the highlighted fields." });
      return;
    }

    setSubmitting(true);
    try {
      const caseId = generateCaseId();
      const pin = generatePin();

      const payload = {
        caseId,
        // In production, never return/store PIN in plain form server-side.
        pin,
        createdAt: safeNowIso(),
        status: "Submitted",
        mode,
        category,
        incidentDate,
        location: {
          division: division || undefined,
          district: district || undefined,
          area: area || undefined,
          address: address || undefined,
        },
        accused: accused.trim() || undefined,
        description: description.trim(),
        contact:
          mode === "verified"
            ? {
                name: name.trim() || undefined,
                phone: phone.trim() || undefined,
                email: email.trim() || undefined,
              }
            : undefined,
        evidence: evidence.map((f) => ({
          name: f.name,
          size: f.size,
          type: f.type,
          lastModified: f.lastModified,
        })),
      };

      // Try API first if configured, otherwise fall back to local
      const apiResult = await trySubmitToApi(payload);

      let savedLocal = false;

      if (!apiResult.ok) {
        // Save locally (MVP offline-friendly)
        const rec: ComplaintRecord = {
          caseId,
          pin,
          createdAt: payload.createdAt,
          status: "Submitted",
          mode,
          category,
          incidentDate,
          location: payload.location,
          accused: payload.accused,
          description: payload.description,
          contact: payload.contact,
          evidence: payload.evidence,
        };
        saveComplaint(rec);
        savedLocal = true;
      }

      localStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()));

      setSuccess({ caseId, pin, savedLocal });
      setBanner({
        type: "success",
        text: "Your complaint has been submitted successfully.",
      });

      // Reset form (optional)
      setDescription("");
      setAccused("");
      setEvidence([]);
      setConsent(false);
      if (mode === "verified") {
        setName("");
        setPhone("");
        setEmail("");
      }
    } catch {
      setBanner({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <h1 className="text-2xl font-semibold text-slate-900">
            Complaint Submitted ✅
          </h1>
          <p className="mt-2 text-slate-600">
            Save your <span className="font-medium">Case ID</span> and{" "}
            <span className="font-medium">PIN</span> to track updates.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Case ID
              </div>
              <div className="mt-1 font-mono text-lg text-slate-900">
                {success.caseId}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                PIN
              </div>
              <div className="mt-1 font-mono text-lg text-slate-900">
                {success.pin}
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            {success.savedLocal ? (
              <p>
                Note: This submission was saved <b>locally</b> in your browser
                (API not configured or unreachable). To enable server submission,
                set <code className="font-mono">VITE_COMPLAINT_API_URL</code>.
              </p>
            ) : (
              <p>
                Submitted to server successfully. You can track progress using
                Case ID + PIN.
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-white hover:bg-slate-800"
              onClick={() => {
                navigator.clipboard?.writeText(
                  `Case ID: ${success.caseId}\nPIN: ${success.pin}`
                );
                setBanner({ type: "success", text: "Copied to clipboard." });
              }}
            >
              Copy Case ID & PIN
            </button>

            <button
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 hover:bg-slate-50"
              onClick={() => setSuccess(null)}
            >
              Submit Another Complaint
            </button>
          </div>

          {banner && (
            <div
              className={`mt-4 rounded-xl p-3 text-sm ${
                banner.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-rose-50 text-rose-800 border border-rose-200"
              }`}
            >
              {banner.text}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Submit a Complaint
              </h1>
              <p className="mt-1 text-slate-600">
                Report corruption, fraud, harassment, and misconduct securely.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-700">
              <div className="font-medium">Emergency?</div>
              <div>Call 999 (Bangladesh Emergency)</div>
            </div>
          </div>

          {banner && (
            <div
              className={`mt-4 rounded-xl p-3 text-sm ${
                banner.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-rose-50 text-rose-800 border border-rose-200"
              }`}
            >
              {banner.text}
            </div>
          )}

          <form className="mt-6 grid gap-5" onSubmit={handleSubmit}>
            {/* Report mode */}
            <div className="rounded-xl border border-slate-200 p-4">
              <label className="text-sm font-medium text-slate-900">
                Report Type
              </label>
              <div className="mt-3 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setMode("anonymous")}
                  className={`rounded-xl px-4 py-2 text-sm border ${
                    mode === "anonymous"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  Anonymous
                </button>
                <button
                  type="button"
                  onClick={() => setMode("verified")}
                  className={`rounded-xl px-4 py-2 text-sm border ${
                    mode === "verified"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  Verified (name + phone)
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-600">
                Anonymous reports do not require your identity. Verified reports
                may help faster follow-up.
              </p>
            </div>

            {/* Category */}
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-900">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
                className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                  errors.category ? "border-rose-300" : "border-slate-300"
                }`}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-600">{selectedCategory?.hint}</p>
              {errors.category && (
                <p className="text-xs text-rose-700">{errors.category}</p>
              )}
            </div>

            {/* Incident date */}
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-900">
                Incident Date
              </label>
              <input
                type="date"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                  errors.incidentDate ? "border-rose-300" : "border-slate-300"
                }`}
              />
              {errors.incidentDate && (
                <p className="text-xs text-rose-700">{errors.incidentDate}</p>
              )}
            </div>

            {/* Location */}
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-900">
                  Location (optional but helpful)
                </label>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <span className="text-xs text-slate-600">Division</span>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none"
                  >
                    <option value="">Select division</option>
                    {DIVISIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-2">
                  <span className="text-xs text-slate-600">District</span>
                  <input
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g., Gazipur"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none"
                  />
                </div>

                <div className="grid gap-2">
                  <span className="text-xs text-slate-600">Area</span>
                  <input
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g., Kaliganj"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none"
                  />
                </div>

                <div className="grid gap-2 sm:col-span-2">
                  <span className="text-xs text-slate-600">Address / Details</span>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Landmark, office name, road, etc."
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Accused (optional) */}
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-900">
                Accused Person/Office (optional)
              </label>
              <input
                value={accused}
                onChange={(e) => setAccused(e.target.value)}
                placeholder="Name/position/office (if known)"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none"
              />
              <p className="text-xs text-slate-600">
                If you don’t know, leave it blank.
              </p>
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-900">
                What happened? (details)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write clear details: what, when, where, how, any witnesses, any proof."
                rows={7}
                className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                  errors.description ? "border-rose-300" : "border-slate-300"
                }`}
              />
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Minimum 30 characters.</span>
                <span>{description.trim().length} chars</span>
              </div>
              {errors.description && (
                <p className="text-xs text-rose-700">{errors.description}</p>
              )}
            </div>

            {/* Contact (verified) */}
            {mode === "verified" && (
              <div className="rounded-xl border border-slate-200 p-4">
                <label className="text-sm font-medium text-slate-900">
                  Your Contact (Verified)
                </label>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <span className="text-xs text-slate-600">Name</span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                        errors.name ? "border-rose-300" : "border-slate-300"
                      }`}
                      placeholder="Full name"
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-700">{errors.name}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <span className="text-xs text-slate-600">Phone</span>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                        errors.phone ? "border-rose-300" : "border-slate-300"
                      }`}
                      placeholder="01XXXXXXXXX or +8801XXXXXXXXX"
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-700">{errors.phone}</p>
                    )}
                  </div>

                  <div className="grid gap-2 sm:col-span-2">
                    <span className="text-xs text-slate-600">Email (optional)</span>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                        errors.email ? "border-rose-300" : "border-slate-300"
                      }`}
                      placeholder="name@email.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-700">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Evidence */}
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <label className="text-sm font-medium text-slate-900">
                  Evidence (optional)
                </label>
                <span className="text-xs text-slate-600">
                  Up to {MAX_FILES} files • Max {formatBytes(MAX_FILE_SIZE)} each
                </span>
              </div>

              <div className="mt-3 flex flex-col gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={(e) => onPickFiles(e.target.files)}
                  className="block w-full text-sm"
                  accept=".jpg,.jpeg,.png,.pdf,.mp3,.wav,.mp4"
                />

                {errors.evidence && (
                  <p className="text-xs text-rose-700">{errors.evidence}</p>
                )}

                {evidence.length > 0 && (
                  <div className="grid gap-2">
                    {evidence.map((f, idx) => (
                      <div
                        key={`${f.name}-${f.lastModified}-${idx}`}
                        className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
                      >
                        <div className="min-w-0">
                          <div className="truncate text-sm text-slate-900">
                            {f.name}
                          </div>
                          <div className="text-xs text-slate-600">
                            {formatBytes(f.size)} • {f.type || "unknown type"}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="ml-3 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-800 hover:bg-slate-100"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-xs text-slate-600">
                  Tip: Avoid uploading extremely sensitive personal data unless
                  necessary.
                </p>
              </div>
            </div>

            {/* Declaration */}
            <div className="rounded-xl border border-slate-200 p-4">
              <label className="flex items-start gap-3 text-sm text-slate-800">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4"
                />
                <span>
                  I confirm that this report is submitted in good faith and the
                  information is accurate to the best of my knowledge.
                </span>
              </label>
              {errors.consent && (
                <p className="mt-2 text-xs text-rose-700">{errors.consent}</p>
              )}
            </div>

            {/* Submit */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-slate-600">
                After submission, you’ll receive a Case ID + PIN for tracking.
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`rounded-xl px-5 py-2.5 text-white ${
                  submitting
                    ? "bg-slate-400"
                    : "bg-slate-900 hover:bg-slate-800"
                }`}
              >
                {submitting ? "Submitting..." : "Submit Complaint"}
              </button>
            </div>

            {/* Dev hint */}
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-700">
              <div className="font-medium">Developer Note</div>
              <div className="mt-1">
                If you set{" "}
                <code className="font-mono">VITE_COMPLAINT_API_URL</code>, this
                form will POST to <code className="font-mono">/complaints</code>.
                Otherwise it saves locally to{" "}
                <code className="font-mono">{STORAGE_KEY}</code>.
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}