import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import FavoriteTransactions from "./components/FavoriteTransactions";

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Dashboard({
  transactions,
  month,
  account,
  onEditAccount,
  onRemoveFavorite,
}) {
  // Hitung total pemasukan dan pengeluaran per bulan
  const monthlyIncome = Array(12).fill(0);
  const monthlyExpense = Array(12).fill(0);

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    const monthIdx = transactionDate.getMonth();
    const cleanedAmount =
      parseFloat(transaction.amount.replace(/[^\d]/g, "")) || 0;
    if (transaction.type === "income") {
      monthlyIncome[monthIdx] += cleanedAmount;
    } else if (transaction.type === "expense") {
      monthlyExpense[monthIdx] += cleanedAmount;
    }
  });

  //data untuk chart
  const data = {
    labels: month.map((m) => m.name),
    datasets: [
      {
        label: "Pemasukan (Rp)",
        data: month.map((m, idx) => {
          const monthIdx = idx;
          return monthlyIncome[monthIdx] || 0;
        }),
        backgroundColor: "rgba(34,197,94,0.7)",
        borderColor: "rgba(22,163,74,1)",
        borderWidth: 1,
        type: "bar",
      },
      {
        label: "Pengeluaran (Rp)",
        data: month.map((m, idx) => {
          const monthIdx = idx;
          return monthlyExpense[monthIdx] || 0;
        }),
        backgroundColor: "rgba(239,68,68,0.7)",
        borderColor: "rgba(220,38,38,1)",
        borderWidth: 1,
        type: "bar",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        bodyColor: "#14b8a6",
        callbacks: {
          label: (context) => `Rp ${context.raw.toLocaleString("id-ID")}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#14b8a6",
        },
        grid: {
          color: "#0f766e",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#14b8a6",
          callback: (value) => `Rp ${value.toLocaleString("id-ID")}`,
        },
        grid: {
          color: "#115e59",
        },
      },
    },
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce(
      (sum, t) => sum + (parseFloat(t.amount.replace(/[^\d]/g, "")) || 0),
      0
    );

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (sum, t) => sum + (parseFloat(t.amount.replace(/[^\d]/g, "")) || 0),
      0
    );

  const balance = totalIncome - totalExpense;

  // Persentase berdasarkan totalIncome
  const expensePercent = totalIncome ? (totalExpense / totalIncome) * 100 : 0;
  const balancePercent = totalIncome ? (balance / totalIncome) * 100 : 0;

  const now = new Date();
  const currentYear = now.getFullYear();

  // Total pemasukan sepanjang waktu
  const totalIncomeAllTime = transactions
    .filter((t) => t.type === "income")
    .reduce(
      (sum, t) => sum + (parseFloat(t.amount.replace(/[^\d]/g, "")) || 0),
      0
    );

  // Total pemasukan tahun ini
  const totalIncomeThisYear = transactions
    .filter(
      (t) =>
        t.type === "income" && new Date(t.date).getFullYear() === currentYear
    )
    .reduce(
      (sum, t) => sum + (parseFloat(t.amount.replace(/[^\d]/g, "")) || 0),
      0
    );

  // Persentase pemasukan tahun ini dari total pemasukan
  const incomeYearPercent = totalIncomeAllTime
    ? (totalIncomeThisYear / totalIncomeAllTime) * 100
    : 0;

  return (
    <>
      <h2 className="font-bold text-lg lg:text-3xl mx-3 lg:mx-32 px-4 mt-4 lg:mt-8 border-b-2 pb-2 lg:pb-4 text-teal-500 border-slate-300 text-center lg:text-start flex justify-between items-center">
        <p>My Dashboard</p>
      </h2>

      <div className="flex flex-col lg:flex-row items-start lg:justify-between mt-6 lg:mt-12 mx-6 lg:mx-32">
        <div className="w-full lg:w-auto px-8 lg:px-6 py-6 rounded-lg border-2 border-teal-500/10 hover:border-teal-500 hover:bg-slate-100/5 hover:shadow-accent hover:shadow-sm flex flex-col transition-all duration-100 ease-in-out hover:cursor-pointer group mr-6 items-center md:flex-row lg:flex-col">
          <div
            className={`w-9/10 lg:w-80 aspect-[1/1] mb-6 rounded-full border-5 group-hover:border-4 border-dotted group-hover:border-solid border-teal-600 shadow-sm shadow-teal-500 group-hover:shadow-lg overflow-hidden transition-all duration-1000 ease-in-out md:flex-1 ${
              account?.photo
                ? "bg-gradient-to-t from-teal-600/30 via-teal-600/10 to-transparent"
                : "bg-gradient-to-tr from-emerald-500 via-teal-500 to-lime-500"
            }`}
          >
            {/* <img alt="Profile" src={orangGanteng} className="object-top" /> */}
            {account?.photo ? (
              <img
                alt="Profile"
                src={account.photo}
                className="object-cover w-full h-full"
              />
            ) : null}
          </div>
          <div className="w-full flex flex-col justify-start items-center gap-2 md:flex-1 md:pl-6 lg:pl-0 md:">
            <a href="" className="w-full inline-flex justify-center">
              <p className="text-center w-full font-bold lg:font-black text-lg lg:text-xl text-teal-500 md:mb-6 lg:mb-0">
                {account?.name || "Outlander"}
              </p>
            </a>
            <div className="px-1 lg:px-3 w-full md:w-[80%] lg:w-full text-start gap-1 md:gap-3 lg:gap-1 flex flex-col font-normal md:font-medium text-sm lg:text-base mb-3">
              <p className="inline-flex justify-between">
                Pekerjaan : <span>{account?.pekerjaan || "-"}</span>
              </p>
              <p className="inline-flex justify-between">
                Penghasilan :{" "}
                <span>Rp {account?.gaji?.toLocaleString("id-ID") || "-"}</span>
              </p>
              <p className="inline-flex justify-between">
                Skor Kredit :{" "}
                <span>
                  {" "}
                  <span className="text-accent">98 </span>/100{" "}
                </span>
              </p>
              <p className="inline-flex justify-between">
                Catatan Asuransi : <span> {"-"} </span>
              </p>
            </div>
            <Link>
              <button
                className="btn btn-accent btn-outline mt-1 md:mt-6 lg:mt-1 rounded-lg py-2"
                onClick={onEditAccount}
              >
                Change Data
              </button>
            </Link>
          </div>
        </div>

        <div className=" lg:p-6 pt-4 w-full flex flex-col gap-4 justify-between">
          <h2 className="font-bold text-lg lg:text-3xl mb-6 text-teal-500">
            <p className="pt-4 lg:pt-0 lg:pb-6 px-2 text-center w-auto md:mx-auto text-xl pb-5">
              My Transactions Recap
            </p>

            {/* Bar statistik */}
            <div className="w-full flex flex-col lg:flex-row justify-between gap-4 lg:gap-6 px-2 lg:px-0 mx-auto mt-4 ">
              {/* Bar pemasukan */}
              <div style={{ flex: 1.3 }}>
                <p className="text-base font-medium lg:text-lg lg:font-semibold">
                  Pemasukan tahun ini : Rp{" "}
                  {totalIncomeThisYear.toLocaleString("id-ID")}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden flex">
                  <div
                    className="bg-green-500 h-full"
                    style={{ width: `${incomeYearPercent}%` }}
                  ></div>
                  <div
                    className="bg-slate-500 h-full"
                    style={{ width: `${100 - incomeYearPercent}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Total pemasukan sepanjang waktu: Rp{" "}
                  {totalIncomeAllTime.toLocaleString("id-ID")}
                </p>
              </div>

              {/* Bar pengeluaran */}
              <div className="flex-1">
                <p className="text-base font-medium lg:text-lg lg:font-semibold">
                  Pengeluaran : Rp {totalExpense.toLocaleString("id-ID")}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden flex">
                  <div
                    className="bg-red-500 h-full"
                    style={{ width: `${expensePercent}%` }}
                  ></div>
                  <div
                    className="bg-slate-500 h-full"
                    style={{ width: `${100 - expensePercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Bar saldo akhir */}
              <div className="flex-1">
                <p className="text-base font-medium lg:text-lg lg:font-semibold">
                  Saldo Akhir : Rp {balance.toLocaleString("id-ID")}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden flex">
                  <div
                    className="bg-blue-500 h-full"
                    style={{ width: `${balancePercent}%` }}
                  ></div>
                  <div
                    className="bg-slate-500 h-full"
                    style={{ width: `${100 - balancePercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </h2>
          <div className="lg:w-auto">
            <Bar
              data={data}
              options={options}
              className="lg:!w-full lg:!h-full"
            />
          </div>
        </div>
      </div>
      <h2 className="font-bold md:text-xl md:mt-8 lg:text-2xl px-4 mt-6 lg:mt-8 pb-2 mx-auto lg:w-auto lg:pb-4 text-teal-500 text-center text-lg lg:text-start flex justify-between items-center">
        <p className="w-auto mx-auto">My Favorite Transactions</p>
      </h2>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between mt-2 md:mt-3 lg:mt-6 mx-3">
        <FavoriteTransactions
          transactions={transactions}
          onRemoveFavorite={onRemoveFavorite}
        />
      </div>
    </>
  );
}
