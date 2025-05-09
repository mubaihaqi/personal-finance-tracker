import { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Tables from "./components/Tables";
import AddModal from "./components/AddModal";

export default function App() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      name: "Batagor Jawa",
      category: "Makanan & Minuman",
      amount: 100000,
      date: "2025-05-06",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal

  const handleAddTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
    setIsModalOpen(false); // Tutup modal setelah submit
  };

  const handleRemoveTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <>
      <Navbar />
      <Header onOpenModal={() => setIsModalOpen(true)} /> {/* Buka modal */}
      <Tables
        transactions={transactions}
        onRemoveTransaction={handleRemoveTransaction}
      />
      <AddModal
        isOpen={isModalOpen} // Kontrol visibilitas modal
        onAddTransaction={handleAddTransaction}
        onClose={() => setIsModalOpen(false)} // Tutup modal
      />
    </>
  );
}
