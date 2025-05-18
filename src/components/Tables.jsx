import Swal from "sweetalert2";
export default function Tables({
  transactions,
  onRemoveTransaction,
  onEditTransaction,
  onSort,
  sortConfig,
  selectedTransactions,
  onSelectTransaction,
  onSelectAllTransactions,
  month,
  selectedMonths,
  onMonthChange,
}) {
  const showAlert = (transactionId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You g bisa ngembaliin datanya lagi lho ntar",
      icon: "warning",
      showCancelButton: "true",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#1e293b",
      color: "#f0f0f0",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your transaction has been deleted.",
          icon: "success",
          background: "#1e293b",
          color: "#f0f0f0",
        });
        onRemoveTransaction(transactionId);
      }
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  const isAllSelected =
    transactions.length > 0 &&
    selectedTransactions.length === transactions.length;

  return (
    <>
      <h2 className="font-bold text-lg mx-3 lg:mx-32 px-4 mt-8 border-b-2 pb-4 text-teal-500 border-slate-300 text-center lg:text-start flex justify-between items-center">
        <p>My Transactions</p>

        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="text-white btn btn-outline btn-accent border-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
          type="button"
        >
          Month
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {/* Filter Month */}
        <div
          id="dropdown"
          className="z-10 p-3 hidden bg-white divide-y divide-gray-100 rounded-lg w-32 dark:bg-gray-700 shadow-sm shadow-teal-800"
        >
          <h6 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white border-teal-800 border-b-2 pb-1">
            Month
          </h6>
          <ul
            className="space-y-2 py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {month.map((m) => (
              <li key={m.id} className="flex justify-start">
                <input
                  id={m.name}
                  type="checkbox"
                  value={m.name}
                  checked={selectedMonths.includes(m.name)}
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-teal-600 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onChange={() => onMonthChange(m.name)}
                />
                <label
                  htmlFor={m.name}
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {m.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </h2>

      <div className="relative overflow-x-auto sm:rounded-lg lg:mx-auto max-w-7xl mt-8  pb-8 mx-3  ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-sm shadow-teal-800 rounded-b-xl overflow-hidden">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="h-10">
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={(e) => onSelectAllTransactions(e.target.checked)}
                    className="w-4 h-4  bg-gray-100 border-gray-300 rounded text-teal-700 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                </div>
              </th>
              <th scope="col" className="px-14 py-3">
                <div
                  className="w-full inline-flex justify-between items-center cursor-pointer"
                  onClick={() => onSort("name")}
                >
                  Nama Transaksi {getSortIcon("name")}
                </div>
              </th>
              <th scope="col" className="px-14 py-3">
                <div
                  className="w-full inline-flex justify-between items-center cursor-pointer"
                  onClick={() => onSort("category")}
                >
                  Category {getSortIcon("category")}
                </div>
              </th>
              <th scope="col" className="px-14 py-3">
                <div
                  className="w-full inline-flex justify-between items-center cursor-pointer"
                  onClick={() => onSort("amount")}
                >
                  Amount {getSortIcon("amount")}
                </div>
              </th>
              <th scope="col" className="px-14 py-3">
                <div
                  className="w-full inline-flex justify-between items-center cursor-pointer"
                  onClick={() => onSort("date")}
                >
                  Date {getSortIcon("date")}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className={`border-b border-gray-200 dark:border-gray-700
                ${
                  transaction.category === "Pemasukan"
                    ? "bg-green-50 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-900"
                }
                hover:bg-gray-50 dark:hover:bg-gray-600`}
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedTransactions.includes(transaction.id)}
                      onChange={() => onSelectTransaction(transaction.id)}
                      className="w-4 h-4  bg-gray-100 border-gray-300 rounded text-teal-600 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {transaction.name || "N/A"}
                </th>
                <td className="px-6 py-4">{transaction.category || "N/A"}</td>
                <td className="px-6 py-4 text-justify">
                  {transaction.amount || 0}
                </td>
                <td className="px-6 py-4">{transaction.date || "N/A"}</td>
                <td className="flex items-center px-6 py-4 justify-center">
                  <a
                    onClick={() => onEditTransaction(transaction.id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-white btn btn-outline btn-info h-8"
                  >
                    Edit
                  </a>
                  <a
                    onClick={() => showAlert(transaction.id)}
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
