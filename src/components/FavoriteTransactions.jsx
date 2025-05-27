import { useState } from "react";
import Swal from "sweetalert2";
import StarIcon from "../assets/icons/StarIcon.svg";

export default function FavoriteTransactions({
  transactions,
  onRemoveFavorite,
}) {
  const [activeId, setActiveId] = useState(null);
  const favorites = transactions.filter((t) => t.favorite);

  // Handler hapus favorite dengan SweetAlert
  const handleRemoveFavorite = (e, id) => {
    e.stopPropagation();
    Swal.fire({
      title: "Yakin dengan pilihanmu?",
      text: "Transaksi akan dihapus dari favorite.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus favorite",
      cancelButtonText: "Batal",
      background: "#1e293b",
      color: "#f0f0f0",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          text: "Telah dihapus dari favorite.",
          icon: "success",
          background: "#1e293b",
          color: "#f0f0f0",
        });
        onRemoveFavorite && onRemoveFavorite(id);
        setActiveId(null);
      }
    });
  };

  if (favorites.length === 0)
    return (
      <div className="p-4 text-center text-gray-400 italic">
        No favorite transactions.
      </div>
    );

  return (
    <ul className="w-[95%] md:w-[96%] lg:w-[85%] md:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {favorites.map((t) => (
        <li
          key={t.id}
          className="py-3 flex items-center gap-4 cursor-pointer rounded-md px-3 border-2 border-teal-500/10 hover:border-teal-500 hover:bg-slate-50/5 hover:shadow-accent hover:shadow-sm group transition-all duration-200 ease-in-out"
          onClick={() => setActiveId(activeId === t.id ? null : t.id)}
        >
          {/* Gambar */}
          {t.photo ? (
            <img
              src={t.photo}
              alt={t.name}
              className="w-22 lg:w-12 aspect-square rounded-lg object-cover border border-transparent transition-all duration-200 ease-in-out group-hover:border-teal-700"
            />
          ) : (
            <div className="w-22 lg:w-12 aspect-square rounded-lg bg-gradient-to-tr from-emerald-500 via-teal-500 to-lime-500 flex items-center justify-center text-gray-400 text-xs"></div>
          )}

          {/* Info */}
          <div className="flex-1 flex flex-col lg:items-center gap-1">
            <div className="flex flex-col !items-start w-full !justify-start">
              <div className="capitalize font-semibold text-gray-800 dark:text-white">
                {t.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-300 text-justify">
                {t.category ? t.category : "Uncategorized"} | {t.type}
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="w-1/2 flex flex-col items-start">
                <div className="text-teal-600 font-bold text-base w-auto text-start">
                  Rp{" "}
                  {Number(
                    String(t.amount).replace(/[^\d]/g, "")
                  ).toLocaleString("id-ID")}
                </div>
                <div className="text-teal-700 font-bold text-xs w-auto text-start">
                  {t.date
                    ? new Date(t.date).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </div>
              </div>

              {/* Tombol hapus favorite */}
              <button
                className="btn btn-error md:btn-soft"
                onClick={(e) => handleRemoveFavorite(e, t.id)}
              >
                <img src={StarIcon} alt="Hapus" className="w-4 aspect-square" />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
