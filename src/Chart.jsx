import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({ categories, totalAmount }) {
  const data = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        label: "Jumlah Transaksi",
        data: categories.map((category) => category.count),
        backgroundColor: categories.map((category) => category.style),
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

  console.log(totalAmount);
  return (
    <>
      <h2 className="font-semibold lg:font-bold text-lg lg:text-3xl mx-3 lg:mx-32 px-4 mt-8 border-b-2 pb-2 lg:pb-4 text-teal-500 border-slate-300">
        My Transactions Chart
      </h2>
      <div className="mt-8 lg:mt-12 lg:inline-flex px-3 lg:px-32 w-full justify-start gap-18 items-center">
        <div className="w-full lg:w-1/2 px-8 lg:px-12 flex items-center justify-center aspect-auto relative">
          <Doughnut data={data} options={options} />
          <div className="absolute top-2/5 lg:top-5/12 text-center px-16 lg:px-40 flex flex-col gap-1">
            <p className="font-bold text-2xl lg:font-black lg:text-4xl text-teal-500 mb-2">
              Rp {totalAmount.toLocaleString("id-ID")}
            </p>
            <p className="text-base font-medium tracking-normal leading-tight lg:font-semibold lg:text-lg">
              Kamu mengeluarkan 100% dibandingkan bulan lalu
            </p>
          </div>
        </div>
        <div className="z-10 w-auto lg:w-1/2 p-5 pt-3 border-teal-700 border-t-2 lg:border-t-0 mt-6 lg:mt-0 lg:border-l-2 lg:pl-12">
          <h6 className="mb-3 lg:mb-5 lg:font-bold text-lg font-semibold text-gray-900 dark:text-white">
            Category
          </h6>
          <ul
            className="space-y-2 text-sm gap-x-5 gap-y-2 lg:flex lg:flex-wrap"
            aria-labelledby="dropdownDefault"
          >
            {categories.map((category) => (
              <li
                className="flex items-center gap-3 justify-start pl-2 py-2  bg-teal-900 shadow-teal-800 hover:bg-teal-800 shadow-sm rounded-xl lg:w-2/5 hover:cursor-pointer"
                key={category.id}
              >
                <div
                  className={`h-4 aspect-[3/2] shadow-2xl rounded-md ${category.color}`}
                ></div>
                <div
                  htmlFor={category.id}
                  className="ml-2 text-base font-semibold text-gray-900 dark:text-gray-100 w-full inline-flex justify-between pr-4 py-1"
                >
                  <p>{category.name} </p>
                  <p className="font-semibold text-base">{category.count}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
export default React.memo(Chart);
