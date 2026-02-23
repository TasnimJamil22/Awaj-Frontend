 export default function Sidebar() {
  return (
    <div className="h-full w-full p-4">
      <div className="flex flex-col space-y-6">
        {/* Profile Card (keep your design if you want) */}
        <div className="mx-auto rounded-2xl px-12 py-4 shadow-sm text-center bg-white">
          <div className="w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-yellow-300 to-white shadow-sm overflow-hidden">
            <div className="w-full h-full rounded-full bg-white" />
          </div>

          <h1 className="mt-4 text-4xl font-semibold text-[#a17c37] tracking-wide">
            Rina
          </h1>
        </div>

        {/* Your nav links */}
        {/* <nav>...</nav> */}
      </div>
    </div>
  );
}