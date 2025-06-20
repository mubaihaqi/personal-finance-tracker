import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";

export default function Header({
  onOpenModal,
  categories,
  onSearchChange,
  onCategoryChange,
  onDeleteAll,
  onExportCSV,
  onImportCSV,
}) {
  const [actionsOpen, setActionsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const actionsRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        setActionsOpen(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showAlert = () => {
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
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          text: "Dah kehapus dah",
          icon: "success",
          background: "#1e293b",
          color: "#f0f0f0",
        });
        onDeleteAll();
      }
    });
  };

  return (
    <>
      <section className="h-auto flex items-center mt-8 px-3 lg:px-0">
        <div className="max-w-screen-xl mx-auto w-full">
          <div className="relative sm:rounded-lg">
            <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4 shadow-sm shadow-teal-800 rounded-xl lg:rounded-md bg-gray-800">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                      placeholder="Search"
                      required=""
                      onChange={(e) => onSearchChange(e)}
                    />
                  </div>
                </form>
              </div>

              <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                {/* Add Transaction Feature */}
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="btn btn-outline btn-accent border-2 flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg hover:cursor-pointer"
                >
                  <svg
                    className="h-3.5 w-3.5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Add Transaction
                </button>

                <div className="flex w-full gap-2 relative">
                  {/* Actions Feature */}
                  <button
                    className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg btn btn-outline hover:bg-slate-600 hover:border-slate-600 border-2 focus:ring-0"
                    type="button"
                    onClick={() => setActionsOpen((v) => !v)}
                  >
                    <svg
                      className="-ml-1 mr-1.5 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      />
                    </svg>
                    Actions
                  </button>
                  {actionsOpen && (
                    <div
                      ref={actionsRef}
                      className="z-50 bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute left-0 top-12"
                    >
                      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                        <li className="p-2 pb-0">
                          <button
                            onClick={onExportCSV}
                            className="btn btn-soft btn-accent w-full border-2 px-4 py-2 text-sm font-medium rounded-md mb-1"
                          >
                            Export to CSV
                          </button>
                        </li>
                        <li className="p-2 pt-0">
                          <label className="btn btn-soft btn-accent w-full border-2 px-4 py-2 text-sm font-medium rounded-md cursor-pointer">
                            Import from CSV
                            <input
                              type="file"
                              accept=".csv"
                              onChange={onImportCSV}
                              className="hidden"
                            />
                          </label>
                        </li>
                      </ul>
                      <div className="p-2">
                        <button
                          type="button"
                          onClick={() => showAlert()}
                          className="btn btn-soft btn-error w-full rounded-md"
                        >
                          Delete All
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Filter Feature */}
                  <button
                    className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg btn btn-outline hover:bg-slate-600 hover:border-slate-600 border-2 focus:ring-0"
                    type="button"
                    onClick={() => setFilterOpen((v) => !v)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="w-4 h-4 mr-2 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Filter
                  </button>
                  {filterOpen && (
                    <div
                      ref={filterRef}
                      className="z-50 w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700 absolute right-0 top-12"
                    >
                      <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                        Category
                      </h6>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center" key="income-category">
                          <input
                            id="income-category"
                            type="checkbox"
                            value="Pemasukan"
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-teal-600 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            onChange={() => onCategoryChange("Pemasukan")}
                          />
                          <label
                            htmlFor="income-category"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                          >
                            Pemasukan
                          </label>
                        </li>
                        {categories.map((category) => (
                          <li className="flex items-center" key={category.id}>
                            <input
                              id={category.id}
                              type="checkbox"
                              value={category.name}
                              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-teal-600 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                              onChange={() => onCategoryChange(category.name)}
                            />
                            <label
                              htmlFor={category.id}
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                            >
                              {category.name}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
