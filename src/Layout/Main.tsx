 import { useEffect, useState } from "react";
import Header from "../Shared/Header/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../UI/Sidebar";

const Main = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur">
        <Header />

        {/* Mobile menu button */}
        <div className="md:hidden px-3 py-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg bg-white px-3 py-2 text-sm shadow-sm hover:shadow"
          >
            ☰
          </button>
          <div className="text-sm font-medium text-slate-800">Menu</div>
        </div>
      </div>

      {/* Outer wrapper (only shadow here) */}
      <div className="mx-auto w-full max-w-[1400px] px-3 sm:px-4  ">
        <div className="rounded-2xl bg-white shadow-[0_1px_14px_rgba(15,23,42,0.08)] overflow-hidden">
          {/* GRID makes columns locked */}
          <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] min-h-[calc(100vh-120px)]">
            {/* Sidebar column */}
            <aside className="hidden md:block min-w-0">
              <div className="h-full overflow-y-auto p-3">
                <Sidebar />
              </div>
            </aside>

            {/* Content column */}
            <main className="min-w-0">
              <div className="h-full overflow-y-auto p-3 sm:p-4 lg:p-6">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className="md:hidden">
        <div
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
            mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.18)]
          transform transition-transform duration-200 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-3 py-3">
            <div className="text-sm font-semibold text-slate-800">Navigation</div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-white px-3 py-1.5 text-sm shadow-sm hover:shadow"
            >
              ✕
            </button>
          </div>

          <div className="h-full overflow-y-auto px-3 pb-6" onClick={() => setMobileOpen(false)}>
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

//  import Header from "../Shared/Header/Header";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../UI/Sidebar";

// const Main = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />

//       <div className="flex flex-1 overflow-hidden">
//         <aside className="w-52 shrink-0 border-r bg-white overflow-y-auto">
//           <Sidebar />
//         </aside>

//         <main className="flex-1 overflow-y-auto p-4">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Main;