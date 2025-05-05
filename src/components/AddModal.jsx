export default function AddModal() {
  return (
    <>
      <div
        id="modalTarget"
        tabindex="-1"
        aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center !bg-transparent backdrop-blur-xs items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div class="relative">
          <form
            aria-hidden="true"
            tabindex="-1"
            id="modalTarget"
            className="bg-slate-950 w-[600px] rounded-lg shadow-sm shadow-teal-800 px-8 py-6"
          >
            {/* Nama Transaksi */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_name"
                id="floating_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Transaction Name
              </label>
            </div>
            {/* Amount Transaksi */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_name"
                id="floating_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Transaction Amount
              </label>
            </div>
            {/* Date Transaksi */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="date"
                name="floating_name"
                id="floating_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                required
              />
              <label
                htmlFor="floating_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Transaction Date
              </label>
            </div>
            {/* Category Transaction */}
            <div className="z-0 !w-full mb-5 group">
              <button
                id="dropdownRadioBgHoverButton"
                data-dropdown-toggle="dropdownRadioBgHover"
                class="text-gray-400 inline-flex justify-between focus:outline-none peer-focus:font-medium text-sm px-0 py-2.5 text-center items-center !w-full focus:ring-0 hover:cursor-pointer border-b-2 border-gray-600 appearance-none focus:border-blue-600"
                type="button"
              >
                Transaction Category{" "}
                <svg
                  class="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* <!-- Dropdown menu --> */}
              <div
                id="dropdownRadioBgHover"
                class="z-10 hidden w-[500px] bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownRadioBgHoverButton"
                >
                  <li>
                    <div class="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id="acara-sosial"
                        type="radio"
                        value=""
                        name="acara-sosial"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        for="acara-sosial"
                        class="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
                      >
                        Acara Sosial
                      </label>
                    </div>
                  </li>
                  <li>
                    <div class="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        checked
                        id="belanja"
                        type="radio"
                        value=""
                        name="belanja"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        for="belanja"
                        class="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
                      >
                        Belanja
                      </label>
                    </div>
                  </li>
                  <li>
                    <div class="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id="cicilan"
                        type="radio"
                        value=""
                        name="cicilan"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        for="cicilan"
                        class="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
                      >
                        Cicilan
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

// acara sosial
// belanja
// cicilan
// hiburan
// keluarga
// kesehatan
// makanan & minuman
// pembayaran pinjaman
// pendidikan
// tabungan
// tagihan
// titipan pembayaran
// top up
// transportasi
// lainnya
