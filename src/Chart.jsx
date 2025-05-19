import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ArrowAnimation from "./components/animations/ArrowAnimation";
import Calendar from "./components/Calendar";
import EmptyAnimation from "./components/animations/EmptyAnimation";

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({ categories, month, transactions }) {
  const [openIndex, setOpenIndex] = useState(null);
  const today = new Date();
  const [mont, setMont] = useState(today.getMonth()); // 0 = January
  const [year, setYear] = useState(today.getFullYear());

  const handlePrev = () => {
    if (mont === 0) {
      setMont(11);
      setYear(year - 1);
    } else {
      setMont(mont - 1);
    }
  };

  const handleNext = () => {
    if (mont === 11) {
      setMont(0);
      setYear(year + 1);
    } else {
      setMont(mont + 1);
    }
  };

  const result = month.find((obj) => obj.id === mont + 1);

  // Filter transaksi untuk bulan ini
  const filteredTransactions = transactions.filter((transaction) => {
    const date = new Date(transaction.date);
    return (
      date.getMonth() === mont && // bulan (0-11)
      date.getFullYear() === year // tahun
    );
  });

  // Hitung total pengeluaran bulan ini (hanya type expense)
  const totalAmount = filteredTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => {
      const cleanedAmount = parseFloat(
        transaction.amount.replace(/[^\d]/g, "")
      );
      return sum + (cleanedAmount || 0);
    }, 0);

  // Hitung bulan lalu
  const prevMonth = mont === 0 ? 11 : mont - 1;
  const prevYear = mont === 0 ? year - 1 : year;

  // Filter transaksi untuk bulan lalu
  const prevMonthTransactions = transactions.filter((transaction) => {
    const date = new Date(transaction.date);
    return date.getMonth() === prevMonth && date.getFullYear() === prevYear;
  });

  // Hitung total pengeluaran bulan lalu
  const prevTotalAmount = prevMonthTransactions.reduce((sum, transaction) => {
    const cleanedAmount = parseFloat(transaction.amount.replace(/[^\d]/g, ""));
    return sum + (cleanedAmount || 0);
  }, 0);

  // Hitung perbandingan
  const comparison =
    prevTotalAmount > 0
      ? ((totalAmount - prevTotalAmount) / prevTotalAmount) * 100
      : 0;

  // Data untuk chart
  const categoryData = categories.map((category) => {
    const categoryTransactions = filteredTransactions.filter(
      (transaction) => transaction.category === category.name
    );

    const categoryTotalAmount = categoryTransactions.reduce(
      (sum, transaction) => {
        const cleanedAmount = parseFloat(
          transaction.amount.replace(/[^\d]/g, "")
        );
        return sum + (cleanedAmount || 0);
      },
      0
    );

    return {
      ...category,
      totalAmount: categoryTotalAmount,
      count: categoryTransactions.length,
    };
  });

  const data = {
    labels: categoryData.map((category) => category.name),
    datasets: [
      {
        label: "Jumlah Amount",
        data: categoryData.map((category) => category.totalAmount),
        backgroundColor: categoryData.map((category) => category.style),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "75%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const filteredCalendarTransactions = transactions.filter((transaction) => {
    const date = new Date(transaction.date);
    return (
      date.getMonth() === mont && // bulan (0-11)
      date.getFullYear() === year // tahun
    );
  });

  // console.log("Filter bulan:", mont, "tahun:", year);
  // console.log(
  //   "Data transaksi:",
  //   transactions.map((t) => t.date)
  // );
  // console.log(
  //   "Filtered:",
  //   filteredCalendarTransactions.map((t) => t.date)
  // );

  return (
    <>
      <h2 className="font-bold text-lg lg:text-3xl mx-3 lg:mx-32 px-4 mt-4 lg:mt-8 border-b-2 pb-2 lg:pb-4 text-teal-500 border-slate-300 text-center lg:text-start flex justify-between items-center">
        <p>My Transactions Chart</p>
        <div className="hidden lg:block">
          <div className="flex items-center justify-center gap-2 lg:gap-4">
            <button
              onClick={handlePrev}
              className="rounded-full !overflow-hidden w-6 lg:w-9 aspect-[1/1] flex items-center justify-center border-2 border-accent hover:bg-slate-800 transition-all ease-in-out duration-500 hover:cursor-pointer hover:border-teal-600 border-dotted hover:border-solid hover:shadow-sm inset-shadow-xs hover:shadow-teal-500"
            >
              <span className="text-xl rotate-180">
                <ArrowAnimation />
              </span>
            </button>

            <div className="text-center w-22 lg:w-32">
              <h2 className="text-base font-bold lg:text-xl uppercase text-black">
                {result?.name}
              </h2>
              <p className="text-teal-500 h-auto text-base lg:text-xl font-bold">
                {year}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="rounded-full !overflow-hidden w-6 lg:w-9 aspect-[1/1] flex items-center justify-center border-2 border-accent hover:bg-slate-800 transition-all ease-in-out duration-500 hover:cursor-pointer hover:border-teal-600 border-dotted hover:border-solid hover:shadow-sm inset-shadow-xs hover:shadow-teal-500"
            >
              <span className="text-xs">
                <ArrowAnimation />
              </span>
            </button>
          </div>
        </div>
      </h2>

      <div className="block lg:hidden mt-6">
        <div className="flex items-center justify-center gap-2 lg:gap-4">
          <button
            onClick={handlePrev}
            className="rounded-full !overflow-hidden w-6 lg:w-9 aspect-[1/1] flex items-center justify-center border-2 border-accent hover:bg-slate-800 transition-all ease-in-out duration-500 hover:cursor-pointer hover:border-teal-600 border-dotted hover:border-solid hover:shadow-sm inset-shadow-xs hover:shadow-teal-500"
          >
            <span className="text-xl rotate-180">
              <ArrowAnimation />
            </span>
          </button>

          <div className="text-center w-22 lg:w-44">
            <h2 className="text-base font-bold lg:text-3xl uppercase text-black">
              {result?.name}
            </h2>
            <p className="text-teal-500 text-base lg:text-3xl font-bold">
              {year}
            </p>
          </div>

          <button
            onClick={handleNext}
            className=" rounded-full !overflow-hidden w-6 lg:w-9 aspect-[1/1] flex items-center justify-center border-2 border-accent hover:bg-slate-800 transition-all ease-in-out duration-500 hover:cursor-pointer hover:border-teal-600 border-dotted hover:border-solid hover:shadow-sm inset-shadow-xs hover:shadow-teal-500"
          >
            <span className="text-xs">
              <ArrowAnimation />
            </span>
          </button>
        </div>
      </div>

      <div className="mt-6 lg:mt-12 lg:inline-flex px-3 lg:px-32 w-full justify-start gap-0 items-start">
        <div className="w-full lg:w-1/2 px-8 lg:px-12 lg:pr-28 flex items-center justify-center aspect-auto relative border-teal-700 lg:border-r-2 ">
          <Doughnut data={data} options={options} />
          <div className="absolute top-2/5 lg:top-5/12 text-center px-16 lg:px-40 flex flex-col gap-1">
            <p className="font-black text-3xl tracking-tight lg:font-black lg:text-4xl text-teal-500 mb-2">
              Rp {totalAmount.toLocaleString("id-ID")}
            </p>
            <p className="text-base font-medium tracking-normal leading-normal lg:font-semibold lg:text-lg px-6 text-slate-300">
              Kamu mengeluarkan{" "}
              <span
                className={`font-black tracking-tight ${
                  comparison > 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {comparison.toFixed(2)}%
              </span>{" "}
              dibandingkan{" "}
              <span className="font-black tracking-tight text-teal-500">
                bulan lalu
              </span>
            </p>
          </div>
        </div>

        {/* Deskription Section */}
        <div className="z-10 w-auto !h-full lg:w-1/2 p-5 pt-3 border-teal-700 border-t-2 lg:border-t-0 mt-6 lg:mt-0 lg:pl-12 lg:pb-12">
          <h6 className="mb-3 lg:mb-9 lg:font-bold text-xl font-semibold text-gray-900 dark:text-white">
            Category
          </h6>
          {categoryData.filter((category) => category.totalAmount > 0)
            .length === 0 ? (
            <div className="flex flex-col items-center justify-between pb-6 h-full">
              <EmptyAnimation />
              <p className="mt-4 text-slate-400 text-base text-center">
                Belum ada transaksi pada bulan ini
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5 text-sm">
              {categoryData
                .filter((category) => category.totalAmount > 0)
                .map((category, idx) => (
                  <li key={category.id} className="relative">
                    <button
                      onClick={() =>
                        setOpenIndex(openIndex === idx ? null : idx)
                      }
                      type="button"
                      className={`w-full text-left text-white bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 flex items-center justify-between border-2 border-transparent hover:cursor-pointer ${category.color}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-4 aspect-[3/2] shadow-2xl rounded-md"
                          style={{ backgroundColor: category.style }}
                        ></div>
                        <span className="text-base font-semibold">
                          {category.name}
                        </span>
                      </div>
                      <svg
                        className="w-2.5 h-2.5 ml-3 transform transition-transform duration-300"
                        style={{
                          transform:
                            openIndex === idx
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                        }}
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

                    {openIndex === idx && (
                      <div className="absolute left-0 mt-2 w-full z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Total:{" "}
                            <span className="font-medium">
                              Rp {category.totalAmount.toLocaleString("id-ID")}
                            </span>
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Jumlah Data:{" "}
                            <span className="font-medium">
                              {category.count}
                            </span>{" "}
                            Transaction
                          </li>
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      <div className="h-[2px] mx-32 mt-6 lg:mt-10 bg-slate-300"></div>

      {/* Calendar */}
      <div className="px-26 py-8 w-full">
        <Calendar
          transactions={filteredCalendarTransactions}
          currentMonth={mont}
          currentYear={year}
        />
      </div>
    </>
  );
}

export default React.memo(Chart);
