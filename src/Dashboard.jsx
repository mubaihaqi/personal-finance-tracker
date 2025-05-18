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
  LineElement, // Import LineElement untuk line chart
} from "chart.js";
import orangGanteng from "./assets/orang-ganteng.jpg";

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Dashboard({ transactions, month, totalAmount }) {
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

  // Siapkan data untuk chart
  const data = {
    labels: month.map((m) => m.name),
    datasets: [
      {
        label: "Pemasukan (Rp)",
        data: month.map((m, idx) => {
          // Cari index bulan di array month (pastikan urutannya benar)
          const monthIdx = idx; // idx dari array month
          return monthlyIncome[monthIdx] || 0;
        }),
        backgroundColor: "rgba(34,197,94,0.7)", // hijau
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
        backgroundColor: "rgba(239,68,68,0.7)", // merah
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
        bodyColor: "#14b8a6", // teal-500
        callbacks: {
          label: (context) => `Rp ${context.raw.toLocaleString("id-ID")}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#14b8a6", // teal-500 untuk label X
        },
        grid: {
          color: "#0f766e", // teal-700 untuk garis grid X
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#14b8a6", // teal-500 untuk label Y
          callback: (value) => `Rp ${value.toLocaleString("id-ID")}`,
        },
        grid: {
          color: "#115e59", // teal-700 untuk garis grid Y
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
  const total = totalIncome + totalExpense + Math.max(balance, 0); // agar bar balance tetap proporsional

  const incomePercent = total ? (totalIncome / total) * 100 : 0;
  const expensePercent = total ? (totalExpense / total) * 100 : 0;
  const balancePercent = total ? (Math.max(balance, 0) / total) * 100 : 0;

  return (
    <>
      <h2 className="font-bold text-lg lg:text-3xl mx-3 lg:mx-32 px-4 mt-4 lg:mt-8 border-b-2 pb-2 lg:pb-4 text-teal-500 border-slate-300 text-center lg:text-start flex justify-between items-center">
        <p>My Dashboard</p>
      </h2>

      <div className="flex items-start justify-between mt-12 lg:mx-32">
        <div className=" px-6 py-6 rounded-lg border-2 border-teal-500/10 hover:border-teal-500 hover:bg-slate-100/5 hover:shadow-accent hover:shadow-sm flex flex-col transition-all duration-100 ease-in-out hover:cursor-pointer group mr-6">
          <div className="w-80 aspect-[1/1] mb-6 rounded-full border-5 group-hover:border-4 border-dotted group-hover:border-solid border-teal-600 shadow-sm shadow-teal-500 group-hover:shadow-lg overflow-hidden transition-all duration-1000 ease-in-out">
            <img alt="Profile" src={orangGanteng} className="object-top" />
          </div>
          <div className="w-full flex flex-col justify-start items-center gap-2">
            <p className="text-center w-full font-black text-xl text-transparent bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 bg-clip-text">
              Muhammad Umar Baihaqi
            </p>
            <div className="w-full text-start gap-1 flex flex-col font-medium text-base mb-3">
              <p className="inline-flex justify-between pr-20">
                Pekerjaan : <span>Software Engineer</span>
              </p>
              <p className="inline-flex justify-between pr-20">
                Penghasilan : <span>RP 500.000.000 </span>
              </p>
              <p className="inline-flex justify-between pr-20">
                Skor Kredit :{" "}
                <span>
                  {" "}
                  <span className="text-accent">98 </span>/100{" "}
                </span>
              </p>
              <p className="inline-flex justify-between pr-20">
                Catatan Asuransi : <span> {"-"} </span>
              </p>
            </div>
            <Link>
              <button className="btn btn-accent btn-outline mt-1 rounded-lg py-2">
                Change Data
              </button>
            </Link>
          </div>
        </div>

        <div className="p-6 pt-4 w-full flex flex-col gap-6 justify-between">
          <h2 className="font-bold text-lg lg:text-3xl mb-6 text-teal-500">
            <p className="pb-3 px-2 text-center border-teal-600">
              My Transactions Recap
            </p>

            <div className="text-slate-300 text-center text-lg lg:text-2xl">
              Total: <span>Rp {totalAmount.toLocaleString("id-ID")}</span>
            </div>

            {/* Bar statistik */}
            <div className="w-full flex justify-between gap-6 px-12 mx-auto mt-4">
              {/* Bar pemasukan */}
              <div className="flex-1">
                <p className="text-lg font-semibold">
                  Pemasukan : Rp {totalIncome.toLocaleString("id-ID")}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden flex">
                  <div
                    className="bg-green-500 h-full"
                    style={{ width: `${incomePercent}%` }}
                  ></div>
                  <div
                    className="bg-slate-500 h-full"
                    style={{ width: `${100 - incomePercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Bar pengeluaran */}
              <div className="flex-1">
                <p className="text-lg font-semibold">
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
                <p className="text-lg font-semibold">
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
          <div className="w-auto chart-container">
            <Bar data={data} options={options} className="!w-full !h-full" />
          </div>
        </div>
      </div>
    </>
  );
}
