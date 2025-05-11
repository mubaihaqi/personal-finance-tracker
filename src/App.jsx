import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Tables from "./components/Tables";
import AddModal from "./components/AddModal";
import Chart from "./Chart";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedTransactions, setSelectedTransactions] = useState([]);

  const categories = [
    { id: 1, name: "Acara Sosial", color: "bg-blue-500", style: "#3b82f6" },
    { id: 2, name: "Belanja", color: "bg-purple-500", style: "#a855f7" },
    { id: 3, name: "Cicilan", color: "bg-fuchsia-500", style: "#d946ef" },
    { id: 4, name: "Hiburan", color: "bg-amber-500", style: "#f59e0b" },
    { id: 5, name: "Keluarga", color: "bg-sky-500", style: "#0ea5e9" },
    { id: 6, name: "Kesehatan", color: "bg-pink-500", style: "#ec4899" },
    { id: 7, name: "Makanan & Minuman", color: "bg-red-500", style: "#ef4444" },
    {
      id: 8,
      name: "Pembayaran Pinjaman",
      color: "bg-violet-500",
      style: "#8b5cf6",
    },
    { id: 9, name: "Pendidikan", color: "bg-teal-500", style: "#14b8a6" },
    { id: 10, name: "Tabungan", color: "bg-indigo-500", style: "#6366f1" },
    { id: 11, name: "Tagihan", color: "bg-orange-500", style: "#f97316" },
    {
      id: 12,
      name: "Titipan Pembayaran",
      color: "bg-violet-500",
      style: "#8b5cf6",
    },
    { id: 13, name: "Top Up", color: "bg-lime-500", style: "#84cc16" },
    { id: 14, name: "Transportasi", color: "bg-emerald-500", style: "#10b981" },
    { id: 15, name: "Lainnya", color: "bg-yellow-500", style: "#eab308" },
  ];

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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (categoryName) => {
    if (categoryName === "all") {
      setSelectedCategories([]); // Kosongkan array untuk menampilkan semua data
    } else {
      setSelectedCategories(
        (prevSelected) =>
          prevSelected.includes(categoryName)
            ? prevSelected.filter((name) => name !== categoryName) // Hapus kategori jika sudah dipilih
            : [...prevSelected, categoryName] // Tambahkan kategori jika belum dipilih
      );
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 || // Jika tidak ada kategori dipilih, tampilkan semua
      selectedCategories.includes(transaction.category); // Cocokkan nama kategori
    return matchesSearch && matchesCategory;
  });

  const handleSort = (key) => {
    setSortConfig((prevConfig) => {
      const isSameKey = prevConfig.key === key;
      const newDirection =
        isSameKey && prevConfig.direction === "asc" ? "desc" : "asc";
      return { key, direction: newDirection };
    });
  };

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortConfig.key) return 0; // Jika tidak ada kolom yang disortir
    const { key, direction } = sortConfig;

    let comparison = 0;
    if (key === "name" || key === "category") {
      comparison = a[key].localeCompare(b[key]); // Sortir string
    } else if (key === "amount") {
      comparison = parseFloat(a[key]) - parseFloat(b[key]); // Sortir angka
    } else if (key === "date") {
      comparison = new Date(a[key]) - new Date(b[key]); // Sortir tanggal
    }

    return direction === "asc" ? comparison : -comparison;
  });

  const handleSelectTransaction = (id) => {
    setSelectedTransactions(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((transactionId) => transactionId !== id) // Hapus jika sudah dipilih
          : [...prevSelected, id] // Tambahkan jika belum dipilih
    );
  };

  const handleSelectAllTransactions = (isChecked) => {
    if (isChecked) {
      // Pilih semua transaksi
      setSelectedTransactions(
        transactions.map((transaction) => transaction.id)
      );
    } else {
      // Kosongkan pilihan
      setSelectedTransactions([]);
    }
  };

  const handleDeleteAll = async () => {
    for (const id of selectedTransactions) {
      await deleteTransaction(id);
    }

    const updatedTransactions = transactions.filter(
      (transaction) => !selectedTransactions.includes(transaction.id)
    );

    setTransactions(updatedTransactions);
    setSelectedTransactions([]);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (
        event.key === "k" &&
        event.target.tagName !== "INPUT" &&
        event.target.tagName !== "TEXTAREA"
      ) {
        setIsModalOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // useEffect(() => {
  //   console.log("Transactions (updated):", transactions);
  // }, [transactions]);
  // useEffect(() => {
  //   console.log("Categories:", categories);
  // }, []);

  const getCategoryData = () => {
    return categories.map((category) => {
      const count = transactions.filter(
        (transaction) => transaction.category === category.name
      ).length;
      return { ...category, count };
    });
  };

  const getTotalAmount = () => {
    return transactions.reduce((total, transaction) => {
      const cleanedAmount = parseFloat(
        transaction.amount.replace(/[^\d]/g, "")
      );
      return total + (cleanedAmount || 0);
    }, 0);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header
                onOpenModal={() => setIsModalOpen(true)}
                onDeleteAll={handleDeleteAll}
                categories={categories}
                onSearchChange={handleSearchChange}
                onCategoryChange={handleCategoryChange}
              />
              <Tables
                transactions={sortedTransactions}
                onRemoveTransaction={handleRemoveTransaction}
                onEditTransaction={handleEditTransaction}
                onSort={handleSort}
                sortConfig={sortConfig}
                selectedTransactions={selectedTransactions}
                onSelectTransaction={handleSelectTransaction}
                onSelectAllTransactions={handleSelectAllTransactions}
              />
              <AddModal
                isOpen={isModalOpen}
                onAddTransaction={handleAddTransaction}
                categories={categories}
                onClose={() => {
                  setIsModalOpen(false);
                  setEditingTransaction(null);
                }}
                editingTransaction={editingTransaction}
              />
            </>
          }
        />
        <Route
          path="/mychart"
          element={
            <Chart
              categories={getCategoryData()}
              totalAmount={getTotalAmount()}
            />
          }
        />
      </Routes>
    </Router>
  );
}
