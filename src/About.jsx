import { useState, useRef, useEffect } from "react";
import BGAnimation from "./components/animations/BGAnimation";

export default function About() {
  const [showBackupDropdown, setShowBackupDropdown] = useState(false);
  const backupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (backupRef.current && !backupRef.current.contains(event.target)) {
        setShowBackupDropdown(false);
      }
    }
    if (showBackupDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showBackupDropdown]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-64px)] overflow-hidden font-sans">
      {/* Background Lottie */}
      <div className="absolute inset-0 -z-20">
        <BGAnimation />
      </div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-100/80 via-white/60 to-teal-200/80 -z-10 pointer-events-none" />
      {/* Konten utama */}
      <div className="w-full max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-teal-600 text-center mb-3 drop-shadow-lg tracking-tight">
          <span role="img" aria-label="info">
            ℹ️
          </span>{" "}
          About M-Tracker
        </h1>
        {/* Animated Divider */}
        <div className="flex justify-center mb-8">
          <span className="block h-[3px] w-32 bg-gradient-to-r from-teal-400 via-teal-600 to-teal-400 rounded-full animate-pulse shadow-lg"></span>
        </div>
        <p className="text-center text-xl text-slate-700 mb-10 font-medium">
          Aplikasi pelacak keuangan pribadi yang{" "}
          <span className="text-teal-600 font-bold">ringan</span>,{" "}
          <span className="text-teal-600 font-bold">cepat</span>, dan{" "}
          <span className="text-teal-600 font-bold">
            sepenuhnya berjalan di perangkatmu
          </span>
          !
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-7 flex flex-col gap-3 border border-teal-200 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-center mb-2">
              <span className="text-4xl">🛡️</span>
            </div>
            <h2 className="text-2xl font-bold text-teal-700 text-center mb-1">
              Privasi & Keamanan
            </h2>
            <p className="text-slate-700 text-center">
              Semua data <b>hanya</b> disimpan di browser kamu menggunakan{" "}
              <span className="text-teal-600 font-semibold">IndexedDB</span>.
              Tidak ada data yang dikirim ke server mana pun. Kamu punya kontrol
              penuh atas data keuanganmu.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-7 flex flex-col gap-3 border border-teal-200 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-center mb-2">
              <span className="text-4xl">✨</span>
            </div>
            <h2 className="text-2xl font-bold text-teal-700 text-center mb-1">
              Fitur Utama
            </h2>
            <ul className="list-disc list-inside text-slate-700 space-y-1 text-start">
              <li>Pencatatan pemasukan & pengeluaran harian</li>
              <li>Statistik Charts</li>
              <li>Ringkasan bulanan</li>
              <li>Penyimpanan lokal (IndexedDB)</li>
              <li>Tanpa login, tanpa internet</li>
            </ul>
          </div>
          {/* Card 3 */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-7 flex flex-col gap-3 border border-teal-200 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-center mb-2">
              <span className="text-4xl">🛠️</span>
            </div>
            <h2 className="text-2xl font-bold text-teal-700 text-center mb-1">
              Teknologi
            </h2>
            <ul className="list-disc list-inside text-slate-700 space-y-1 text-start">
              <li>React + Vite</li>
              <li>IndexedDB via idb wrapper</li>
              <li>Tailwind CSS</li>
              <li>No server, no cloud</li>
            </ul>
          </div>
        </div>
        {/* Footer Card */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-teal-600/90 rounded-xl p-4 text-white shadow flex flex-col gap-2">
            <span className="font-bold text-lg flex items-center gap-2">
              <span role="img" aria-label="author">
                👨‍💻
              </span>{" "}
              Dibuat oleh{" "}
              <a
                href="https://www.instagram.com/haq_xgi"
                className="text-teal-100 hover:text-teal-300"
              >
                mubaihaqi
              </a>
            </span>
            <span className="text-sm">
              Proyek pribadi untuk belajar & berbagi.
            </span>
          </div>
          <div className="bg-teal-600/90 rounded-xl p-4 text-white shadow flex flex-col gap-2">
            <span className="font-bold text-lg flex items-center gap-2">
              <span role="img" aria-label="feedback">
                💡
              </span>{" "}
              Feedback & Bug
            </span>
            <span className="text-sm">
              Kirim ide atau bug ke{" "}
              <a
                href="mailto:muhammadbaihaqidev@gmail.com"
                className="underline"
              >
                muhammadbaihaqidev@gmail.com
              </a>{" "}
              atau kunjungi{" "}
              <a
                href="https://github.com/mubaihaqi/personal-finance-tracker"
                className="underline"
              >
                GitHub Repo
              </a>
              .
            </span>
          </div>
          {/* Backup Data Dropdown (upwards) untuk md ke atas */}
          <div
            ref={backupRef}
            className="relative hidden bg-teal-600/90 rounded-xl p-4 text-white shadow md:flex flex-col gap-2 overflow-visible transition-all duration-300 cursor-pointer"
            onClick={() => setShowBackupDropdown((v) => !v)}
            tabIndex={0}
            role="button"
            aria-expanded={showBackupDropdown}
            aria-controls="backup-dropdown-content"
          >
            {/* Dropdown content (show above card) */}
            <div
              className={`absolute left-1/2 bottom-full z-10 w-80 max-w-xs -translate-x-1/2 mb-4 transition-all duration-500 ${
                showBackupDropdown
                  ? "opacity-100 -translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-8 pointer-events-none"
              }`}
              id="backup-dropdown-content"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-teal-200 text-teal-900 text-sm animate-fade-in-up">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">💾</span>
                  <span className="font-bold">Backup Data</span>
                </div>
                <ol className="list-decimal list-inside space-y-1">
                  <li>
                    Buka menu <b>Export/Backup</b> di halaman utama (ikon atau
                    tombol <b>Export to CSV</b>).
                  </li>
                  <li>
                    Data transaksi akan diekspor dan otomatis diunduh sebagai
                    file <b>.csv</b> ke perangkatmu.
                  </li>
                  <li>
                    Simpan file backup <b>.csv</b> tersebut di tempat yang aman
                    (misal: Google Drive, email, atau flashdisk).
                  </li>
                  <li>
                    Untuk restore, buka menu <b>Import/Restore</b> lalu pilih
                    file <b>.csv</b> hasil backup tadi.
                  </li>
                  <li>
                    Data transaksi akan otomatis masuk ke aplikasi setelah
                    proses import selesai.
                  </li>
                </ol>
                <div className="mt-3 text-xs text-slate-500">
                  Backup hanya tersimpan di perangkatmu, pastikan file tidak
                  hilang.
                </div>
              </div>
            </div>
            {/* Card content */}
            <span className="font-bold text-lg flex items-center gap-2">
              <span role="img" aria-label="backup">
                💾
              </span>{" "}
              Backup Data
              <span className="ml-12 text-xl transition-transform duration-300">
                {showBackupDropdown ? "🙂" : ""}
              </span>
            </span>
            <span className="text-sm">Bagaimana cara backup data?</span>
          </div>

          {/* Backup Data Accordion (sm) */}
          <div
            ref={backupRef}
            className="md:hidden bg-teal-600/90 rounded-xl p-4 text-white shadow flex flex-col gap-2 overflow-visible transition-all duration-300 cursor-pointer"
            onClick={() => setShowBackupDropdown((v) => !v)}
            tabIndex={0}
            role="button"
            aria-expanded={showBackupDropdown}
            aria-controls="backup-accordion-content"
          >
            {/* Card content */}
            <span className="font-bold text-lg flex items-center gap-2">
              <span role="img" aria-label="backup">
                💾
              </span>{" "}
              Backup Data
              <span className="ml-12 text-xl transition-transform duration-300">
                {showBackupDropdown ? "🙂" : ""}
              </span>
            </span>
            <span className="text-sm">Bagaimana cara backup data?</span>
            {/* Accordion content (show below card) */}
            <div
              id="backup-accordion-content"
              className={`grid transition-all duration-500 ease-in-out ${
                showBackupDropdown
                  ? "grid-rows-[1fr] opacity-100 mt-3"
                  : "grid-rows-[0fr] opacity-0"
              }`}
              style={{ overflow: "hidden" }}
            >
              <div className="min-h-0">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-teal-200 text-teal-900 text-sm animate-fade-in-up">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">💾</span>
                    <span className="font-bold">Backup Data</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>
                      Buka menu <b>Export/Backup</b> di halaman utama (ikon atau
                      tombol <b>Export to CSV</b>).
                    </li>
                    <li>
                      Data transaksi akan diekspor dan otomatis diunduh sebagai
                      file <b>.csv</b> ke perangkatmu.
                    </li>
                    <li>
                      Simpan file backup <b>.csv</b> tersebut di tempat yang
                      aman (misal: Google Drive, email, atau flashdisk).
                    </li>
                    <li>
                      Untuk restore, buka menu <b>Import/Restore</b> lalu pilih
                      file <b>.csv</b> hasil backup tadi.
                    </li>
                    <li>
                      Data transaksi akan otomatis masuk ke aplikasi setelah
                      proses import selesai.
                    </li>
                  </ol>
                  <div className="mt-3 text-xs text-slate-500">
                    Backup hanya tersimpan di perangkatmu, pastikan file tidak
                    hilang.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
