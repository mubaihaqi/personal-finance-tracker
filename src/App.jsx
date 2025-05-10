import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Tables from "./components/Tables";
import AddModal from "./components/AddModal";
import MyChart from "./mychart";
import {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from "./utils/indexedDB";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Load data dari IndexedDB saat aplikasi dimuat
  useEffect(() => {
    async function fetchTransactions() {
      const storedTransactions = await getTransactions();
      // Sortir data berdasarkan tanggal (dari terbaru ke terlama)
      const sortedTransactions = storedTransactions.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setTransactions(sortedTransactions);
    }
    fetchTransactions();
  }, []);

  const handleAddTransaction = async (transaction) => {
    if (editingTransaction) {
      const updatedTransaction = { ...transaction, id: editingTransaction.id };
      await updateTransaction(updatedTransaction); // Update di IndexedDB
      const updatedTransactions = transactions.map((t) =>
        t.id === editingTransaction.id ? updatedTransaction : t
      );
      // Sortir data setelah update
      setTransactions(
        updatedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))
      );
      setEditingTransaction(null);
    } else {
      const newTransaction = { ...transaction, id: Date.now() };
      await addTransaction(newTransaction); // Tambahkan ke IndexedDB
      const updatedTransactions = [...transactions, newTransaction];
      // Sortir data setelah menambahkan
      setTransactions(
        updatedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))
      );
    }
    setIsModalOpen(false);
  };

  const handleRemoveTransaction = async (id) => {
    await deleteTransaction(id); // Hapus dari IndexedDB
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    // Sortir data setelah penghapusan
    setTransactions(
      updatedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))
    );
  };

  const handleEditTransaction = (id) => {
    const transactionToEdit = transactions.find(
      (transaction) => transaction.id === id
    );
    setEditingTransaction(transactionToEdit);
    setIsModalOpen(true);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header onOpenModal={() => setIsModalOpen(true)} />
              <Tables
                transactions={transactions}
                onRemoveTransaction={handleRemoveTransaction}
                onEditTransaction={handleEditTransaction}
              />
              <AddModal
                isOpen={isModalOpen}
                onAddTransaction={handleAddTransaction}
                onClose={() => {
                  setIsModalOpen(false);
                  setEditingTransaction(null);
                }}
                editingTransaction={editingTransaction}
              />
            </>
          }
        />
        <Route path="/mychart" element={<MyChart />} />
      </Routes>
    </Router>
  );
}
