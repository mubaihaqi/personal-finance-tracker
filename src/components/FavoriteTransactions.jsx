export default function FavoriteTransactions({ transactions }) {
  const favorites = transactions.filter((t) => t.favorite);
  if (favorites.length === 0)
    return (
      <div className="p-4 text-center text-gray-400 italic">
        No favorite transactions.
      </div>
    );

  return (
    <div className="max-w-xl mx-auto my-6 bg-white dark:bg-slate-800 rounded-xl shadow-md p-4">
      <h3 className="text-lg font-bold text-amber-500 mb-4 flex items-center gap-2">
        <svg
          className="w-6 h-6 text-amber-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
        </svg>
        Favorite Transactions
      </h3>
      <ul className="divide-y divide-gray-200 dark:divide-slate-700">
        {favorites.map((t) => (
          <li key={t.id} className="py-3 flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-800 dark:text-white">
                {t.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-300">
                {t.category ? t.category : "Uncategorized"}
              </div>
            </div>
            <div className="text-amber-600 font-bold text-base">
              Rp{" "}
              {Number(String(t.amount).replace(/[^\d]/g, "")).toLocaleString(
                "id-ID"
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
