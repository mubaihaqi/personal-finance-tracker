import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Tables from "./components/Tables";
import AddModal from "./components/AddModal";
import MyChart from "./mychart";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleAddTransaction = (transaction) => {
    if (editingTransaction) {
      setTransactions(
        transactions.map((t) =>
          t.id === editingTransaction.id
            ? { ...transaction, id: editingTransaction.id }
            : t
        )
      );
      setEditingTransaction(null);
    } else {
      setTransactions([...transactions, transaction]);
    }
    setIsModalOpen(false);
  };

  const handleRemoveTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
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
        {/* Halaman utama */}
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
        {/* Halaman MyChart */}
        <Route path="/mychart" element={<MyChart />} />
      </Routes>
    </Router>
  );
}
