import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import { useState, useRef, useEffect } from "react";

export default function AddModal({
  isOpen,
  onAddTransaction,
  onClose,
  editingTransaction,
  categories,
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const nameInputRef = useRef(null);

  const dropdownRef = useRef(null);
  const focusedItemRef = useRef(null);

  // Isi form dengan data transaksi yang sedang diedit
  useEffect(() => {
    if (editingTransaction) {
      setName(editingTransaction.name);
      setAmount(editingTransaction.amount.replace(/[^\d]/g, "")); // Hapus format rupiah
      setDate(editingTransaction.date);
      setSelectedCategory(editingTransaction.category);
    }
  }, [editingTransaction]);

  // Tambahkan event listener untuk tombol Esc
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose(); // Tutup modal jika tombol Esc ditekan
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const rupiah = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
    // console.log(rupiah);
    const formattedDate = date
      ? new Date(date).toISOString().split("T")[0]
      : ""; // Format date to YYYY-MM-DD
    const newTransaction = {
      id: Date.now(),
      name,
      category: selectedCategory,
      amount: rupiah,
      date: formattedDate,
    };
    onAddTransaction(newTransaction);
    setName("");
    setAmount("");
    setDate("");
    setSelectedCategory(null);
    onClose();
  };

  // Deteksi klik di luar dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Navigasi keyboard untuk dropdown
  const handleDropdownKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      // Navigasi ke bawah
      setFocusedIndex((prevIndex) =>
        prevIndex < categories.length - 1 ? prevIndex + 1 : 0
      );
    } else if (event.key === "ArrowUp") {
      // Navigasi ke atas
      setFocusedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : categories.length - 1
      );
    } else if (event.key === "Enter" && isDropdownOpen) {
      // Pilih item yang difokuskan
      if (focusedIndex >= 0 && focusedIndex < categories.length) {
        setSelectedCategory(categories[focusedIndex].name);
        setIsDropdownOpen(false);
        setFocusedIndex(-1); // Reset fokus
      }
    }
  };

  // Scroll otomatis untuk opsi yang difokuskan
  useEffect(() => {
    if (focusedItemRef.current) {
      focusedItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [focusedIndex]);

  // Reset fokus saat dropdown ditutup
  useEffect(() => {
    if (!isDropdownOpen) {
      setFocusedIndex(-1);
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div
      tabIndex="-1"
      aria-hidden={!isOpen} // Aksesibilitas
      className={`${
        isOpen ? "flex" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center !bg-transparent backdrop-blur-xs items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative">
        <form
          onSubmit={handleSubmit} // Tangani submit form
          className="bg-slate-950 w-[600px] rounded-lg shadow-sm shadow-teal-800 px-8 pb-6 pt-0 flex flex-col justify-center items-center"
        >
          {/* Modal header */}
          <div className="flex items-center justify-between py-4 pt-8 pb-6 border-b-2 rounded-t border-teal-800 mb-7 w-full">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {editingTransaction ? "Edit Transaction" : "Add Transaction"}
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Nama Transaksi */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              ref={nameInputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-teal-800 peer"
              autoComplete="off"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Transaction Name
            </label>
          </div>

          {/* Amount Transaksi */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={0}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-teal-800 peer"
              placeholder=""
              onInput={(e) => {
                if (e.target.value < 0) e.target.value = 0;
              }}
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Transaction Amount
            </label>
          </div>

          {/* Date Transaksi */}
          <div className="relative z-0 w-full mb-5 group">
            <Flatpickr
              value={date}
              onChange={(selectedDates) => setDate(selectedDates[0])}
              options={{ dateFormat: "Y-m-d", position: "auto right" }}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-teal-800 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="transaction_date"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Transaction Date
            </label>
          </div>
          {/* Category Transaction */}
          <div className="z-0 w-full mb-5 group">
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              onKeyDown={handleDropdownKeyDown} // Tambahkan handler untuk navigasi keyboard
              className="text-gray-400 inline-flex justify-between focus:outline-none peer-focus:font-medium text-sm px-0 py-2.5 text-center items-center !w-full focus:ring-0 hover:cursor-pointer border-b-2 border-gray-600 appearance-none focus:border-teal-800"
            >
              {selectedCategory || "Transaction Category"}
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
            {/* Modal */}
            {isDropdownOpen && (
              <div
                ref={dropdownRef} // Tambahkan referensi ke elemen dropdown
                className="absolute left-12 mt-2 z-10 w-[500px] divide-y divide-gray-100 rounded-lg !bg-slate-950 shadow-sm shadow-teal-800 dark:divide-gray-600"
              >
                <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200 h-[200px] overflow-y-auto ">
                  {categories.map((category, index) => (
                    <li key={category.id}>
                      <button
                        type="button"
                        ref={focusedIndex === index ? focusedItemRef : null} // Tambahkan referensi ke item yang difokuskan
                        onClick={() => {
                          setSelectedCategory(category.name);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded-md hover:bg-teal-800/75 ${
                          focusedIndex === index ? "bg-teal-800 text-white" : ""
                        }`}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="text-white text w-1/2 bg-teal-800 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 hover:cursor-pointer"
          >
            {editingTransaction ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
