export default function Tables({
  transactions,
  onRemoveTransaction,
  onEditTransaction,
}) {
  return (
    <>
      <h2 className="font-bold text-lg mx-32 px-4 mt-8 border-b-2 pb-4 text-teal-600 border-slate-300">
        My Transactions
      </h2>
      <div className="relative overflow-x-auto sm:rounded-lg mx-auto max-w-7xl mt-8 shadow-sm shadow-teal-800">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Nama Transaksi
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={transaction.id || transaction.name || Math.random()}
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {transaction.name || "N/A"}
                </th>
                <td className="px-6 py-4">{transaction.category || "N/A"}</td>
                <td className="px-6 py-4">{transaction.amount || 0}</td>
                <td className="px-6 py-4">{transaction.date || "N/A"}</td>
                <td className="flex items-center px-6 py-4 justify-center">
                  <a
                    onClick={() => onEditTransaction(transaction.id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-white btn btn-outline btn-info h-8"
                  >
                    Edit
                  </a>
                  <a
                    onClick={() => onRemoveTransaction(transaction.id)} // Panggil fungsi hapus
                    className="font-medium text-red-600 dark:text-red-500 hover:underline hover:text-white ms-3 btn btn-outline btn-error h-8"
                  >
                    Remove
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
