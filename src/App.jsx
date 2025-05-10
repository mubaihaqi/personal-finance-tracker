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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedTransactions, setSelectedTransactions] = useState([]);

  const categories = [
    { id: 1, name: "Acara Sosial" },
    { id: 2, name: "Belanja" },
    { id: 3, name: "Cicilan" },
    { id: 4, name: "Hiburan" },
    { id: 5, name: "Keluarga" },
    { id: 6, name: "Kesehatan" },
    { id: 7, name: "Makanan & Minuman" },
    { id: 8, name: "Pembayaran Pinjaman" },
    { id: 9, name: "Pendidikan" },
    { id: 10, name: "Tabungan" },
    { id: 11, name: "Tagihan" },
    { id: 12, name: "Titipan Pembayaran" },
    { id: 13, name: "Top Up" },
    { id: 14, name: "Transportasi" },
    { id: 15, name: "Lainnya" },
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
        <Route path="/mychart" element={<MyChart />} />
      </Routes>
    </Router>
  );
}
