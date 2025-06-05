// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/themes/dark.css"; // Ganti tema sesuai kebutuhan
// import { useState, useRef, useEffect } from "react";

// export default function AddModal() {
//   const [categories, setCategories] = useState([
//     { id: 1, name: "Acara Sosial", penandaan: "acara-sosial" },
//     { id: 2, name: "Belanja", penandaan: "belanja" },
//     { id: 3, name: "Cicilan", penandaan: "cicilan" },
//     { id: 4, name: "Hiburan", penandaan: "hiburan" },
//     { id: 5, name: "Keluarga", penandaan: "keluarga" },
//     { id: 6, name: "Kesehatan", penandaan: "kesehatan" },
//     { id: 7, name: "Makanan & Minuman", penandaan: "makanan-minuman" },
//     { id: 8, name: "Pembayaran Pinjaman", penandaan: "pembayaran-pinjaman" },
//     { id: 9, name: "Pendidikan", penandaan: "pendidikan" },
//     { id: 10, name: "Tabungan", penandaan: "tabungan" },
//     { id: 11, name: "Tagihan", penandaan: "tagihan" },
//     { id: 12, name: "Titipan Pembayaran", penandaan: "titipan-pembayaran" },
//     { id: 13, name: "Top Up", penandaan: "top-up" },
//     { id: 14, name: "Transportasi", penandaan: "transportasi" },
//     { id: 15, name: "Lainnya", penandaan: "lainnya" },
//   ]);

//   const [selectedCategory, setSelectedCategory] = useState(null); // State untuk kategori yang dipilih
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk visibilitas dropdown
//   const dropdownRef = useRef(null); // Referensi untuk elemen dropdown

//   function handleRadio(event) {
//     const selected = event.target.value;
//     setSelectedCategory(selected); // Simpan kategori yang dipilih
//     setIsDropdownOpen(false); // Tutup dropdown setelah kategori dipilih
//   }

//   function toggleDropdown() {
//     setIsDropdownOpen((prev) => !prev); // Toggle visibilitas dropdown
//   }

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false); // Tutup dropdown jika klik di luar
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   function handleAddTransaction(event) {}

//   return (
//     <>
//       <div
//         id="modalTarget"
//         tabIndex="-1"
//         aria-hidden="true"
//         className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center !bg-transparent backdrop-blur-xs items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
//       >
//         <div className="relative">
//           <form
//             aria-hidden="true"
//             tabIndex="-1"
//             id="modalTarget"
//             className="bg-slate-950 w-[600px] rounded-lg shadow-sm shadow-teal-800 px-8 pb-6 pt-0 flex flex-col justify-center items-center"
//           >
//             {/* Modal header */}
//             <div className="flex items-center justify-between py-4 pt-8 pb-6 border-b-2 rounded-t border-teal-800 mb-7 w-full">
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Add Transaction
//               </h3>
//               <button
//                 type="button"
//                 className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                 data-modal-hide="modalTarget"
//               >
//                 <svg
//                   className="w-3 h-3"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 14 14"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                   />
//                 </svg>
//                 <span className="sr-only">Close modal</span>
//               </button>
//             </div>

//             {/* Nama Transaksi */}
//             <div className="relative z-0 w-full mb-5 group">
//               <input
//                 type="text"
//                 name="floating_name"
//                 id="floating_name"
//                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-teal-800 peer"
//                 placeholder=" "
//                 autoComplete="off"
//                 required
//               />
//               <label
//                 htmlFor="floating_name"
//                 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//               >
//                 Transaction Name
//               </label>
//             </div>
//             {/* Amount Transaksi */}
//             <div className="relative z-0 w-full mb-5 group">
//               <input
//                 type="number"
//                 min={0}
//                 name="floating_name"
//                 id="floating_name"
//                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-teal-800 peer"
//                 placeholder=" "
//                 autoComplete="off"
//                 onInput={(e) => {
//                   if (e.target.value < 0) e.target.value = 0;
//                 }}
//                 style={{
//                   appearance: "textfield",
//                   MozAppearance: "textfield",
//                   WebkitAppearance: "none",
//                 }}
//                 required
//               />
//               <label
//                 htmlFor="floating_name"
//                 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//               >
//                 Transaction Amount
//               </label>
//             </div>
//             {/* Date Transaksi */}
//             <div className="relative z-0 w-full mb-5 group">
//               <Flatpickr
//                 options={{ dateFormat: "Y-m-d" }}
//                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:border-teal-800 focus:outline-none focus:ring-0 peer"
//                 placeholder=""
//                 autoComplete="off"
//               />
//               <label
//                 htmlFor="transaction_date"
//                 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//               >
//                 Transaction Date
//               </label>
//             </div>
//             {/* Category Transaction */}
//             <div className="z-0 !w-full mb-5 group">
//               <button
//                 id="dropdownRadioBgHoverButton"
//                 onClick={toggleDropdown} // Toggle dropdown saat tombol diklik
//                 className="text-gray-400 inline-flex justify-between focus:outline-none peer-focus:font-medium text-sm px-0 py-2.5 text-center items-center !w-full focus:ring-0 hover:cursor-pointer border-b-2 border-gray-600 appearance-none focus:border-teal-800"
//                 type="button"
//               >
//                 {selectedCategory || "Transaction Category"}{" "}
//                 {/* Tampilkan kategori yang dipilih */}
//                 <svg
//                   className="w-2.5 h-2.5 ms-3"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 10 6"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="m1 1 4 4 4-4"
//                   />
//                 </svg>
//               </button>

//               {/* Dropdown menu */}
//               {isDropdownOpen && (
//                 <div
//                   id="dropdownRadioBgHover"
//                   ref={dropdownRef} // Tambahkan referensi ke elemen dropdown
//                   className="absolute left-12 mt-2 z-10 w-[500px] bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
//                 >
//                   <ul
//                     className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200 h-[200px] overflow-y-auto"
//                     aria-labelledby="dropdownRadioBgHoverButton"
//                   >
//                     {categories.map((category) => (
//                       <li key={category.id}>
//                         <div className="flex items-center p-2 rounded-sm hover:bg-teal-800/75 group">
//                           <input
//                             id={`${category.penandaan}`}
//                             type="radio"
//                             value={category.name}
//                             name="transactionCategory"
//                             onChange={handleRadio}
//                             className="w-4 h-4 !text-teal-600 bg-gray-100 border-gray-300 group-hover:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring dark:bg-gray-600 dark:border-gray-500"
//                           />
//                           <label
//                             htmlFor={`${category.penandaan}`}
//                             className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
//                           >
//                             {category.name}
//                           </label>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="text-white text w-1/2 bg-teal-800 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
//               onClick={handleAddTransaction}
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }
