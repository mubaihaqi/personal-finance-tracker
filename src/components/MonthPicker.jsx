import React, { useState } from "react";
import ArrowAnimation from "./ArrowAnimation";

export default function MonthPicker({ month, transactions }) {
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

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionMonth = new Date(transaction.date).toLocaleString(
      "id-ID",
      {
        month: "long",
      }
    );
    return transactionMonth === result?.name;
  });

  return (
    <>
      <div className="flex items-center justify-center gap-6 py-6">
        <button
          onClick={handlePrev}
          className="rounded-full overflow-hidden w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300"
        >
          <span className="text-xl rotate-180">
            <ArrowAnimation />
          </span>
        </button>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-black">{result?.name}</h2>
          <p className="text-purple-600 text-lg font-semibold">{year}</p>
        </div>

        <button
          onClick={handleNext}
          className="rounded-full overflow-hidden w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300"
        >
          <span className="text-xl">
            <ArrowAnimation />
          </span>
        </button>
      </div>

      {/* Tampilkan transaksi yang sesuai */}
      <div id="hasil" className="p-4 rounded-md">
        <h3 className="text-lg font-bold mb-2">
          Transaksi di Bulan {result?.name}:
        </h3>
        {filteredTransactions.length > 0 ? (
          <ul>
            {filteredTransactions.map((transaction) => (
              <li key={transaction.id} className="mb-2">
                <p>
                  <strong>Nama:</strong> {transaction.name}
                </p>
                <p>
                  <strong>Jumlah:</strong> {transaction.amount}
                </p>
                <p>
                  <strong>Category:</strong> {transaction.category}
                </p>
                <p>
                  <strong>Tanggal:</strong>{" "}
                  {new Date(transaction.date).toLocaleDateString("id-ID")}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Tidak ada transaksi di bulan ini.</p>
        )}
      </div>
    </>
  );
}
