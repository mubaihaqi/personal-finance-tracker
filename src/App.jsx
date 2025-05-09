import { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Tables from "./components/Tables";
import AddModal from "./components/AddModal";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal

  const handleAddTransaction = (transaction) => {
    if (editingTransaction) {
      // Update transaksi yang sedang diedit
      setTransactions(
        transactions.map((t) =>
          t.id === editingTransaction.id
            ? { ...transaction, id: editingTransaction.id }
            : t
        )
      );
      setEditingTransaction(null); // Reset transaksi yang sedang diedit
    } else {
      // Tambahkan transaksi baru
      setTransactions([...transactions, transaction]);
    }
    setIsModalOpen(false); // Tutup modal setelah submit
  };

  const [editingTransaction, setEditingTransaction] = useState(null); // State untuk transaksi yang sedang diedit
  const handleRemoveTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const handleEditTransaction = (id) => {
    const transactionToEdit = transactions.find(
      (transaction) => transaction.id === id
    );
    setEditingTransaction(transactionToEdit); // Set transaksi yang akan diedit
    setIsModalOpen(true); // Buka modal
  };

  return (
    <>
      <Navbar />
      <Header onOpenModal={() => setIsModalOpen(true)} /> {/* Buka modal */}
      <Tables
        transactions={transactions}
        onRemoveTransaction={handleRemoveTransaction}
        onEditTransaction={handleEditTransaction}
      />
      <AddModal
        isOpen={isModalOpen} // Kontrol visibilitas modal
        onAddTransaction={handleAddTransaction}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null); // Reset transaksi yang sedang diedit saat modal ditutup
        }}
        editingTransaction={editingTransaction} // Kirim transaksi yang sedang diedit
      />
    </>
  );
}
