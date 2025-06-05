import { useEffect, useState } from "react";
import { addTransaction, getTransactions, deleteTransaction } from "./utils/db";
import Navbar from "./components/Navbar";
import "flowbite";
function App() {
  const [transactions, setTransactions] = useState([]);
  const [newTx, setNewTx] = useState("");

  const loadTransactions = async () => {
    const txs = await getTransactions();
    setTransactions(txs);
  };

  const handleAdd = async () => {
    if (!newTx) return;
    await addTransaction({ name: newTx, amount: 10000 });
    setNewTx("");
    loadTransactions();
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    loadTransactions();
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>IndexedDB Finance Tracker</h2>
        <input
          type="text"
          value={newTx}
          onChange={(e) => setNewTx(e.target.value)}
          placeholder="Nama transaksi"
        />
        <button onClick={handleAdd} className="btn btn-accent btn-outline h-8">
          Add
        </button>

        <ul>
          {transactions.map((tx) => (
            <li key={tx.id}>
              {tx.name} - {tx.amount}
              <button onClick={() => handleDelete(tx.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
