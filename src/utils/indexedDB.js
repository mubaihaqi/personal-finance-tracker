import { openDB } from "idb";

const DB_NAME = "PersonalFinanceTracker";
const DB_VERSION = 2;
const STORE_NAME = "transactions";
const ACCOUNT_STORE = "accounts";

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(ACCOUNT_STORE)) {
        db.createObjectStore(ACCOUNT_STORE, { keyPath: "id" });
      }
    },
  });
}

// Account CRUD
export async function getAccounts() {
  const db = await initDB();
  return db.getAll(ACCOUNT_STORE);
}

export async function addAccount(account) {
  const db = await initDB();
  return db.add(ACCOUNT_STORE, account);
}

export async function updateAccount(account) {
  const db = await initDB();
  return db.put(ACCOUNT_STORE, account);
}

export async function deleteAccount(id) {
  const db = await initDB();
  return db.delete(ACCOUNT_STORE, id);
}

// Transaction CRUD
export async function addTransaction(transaction) {
  const db = await initDB();
  return db.add(STORE_NAME, transaction);
}

export async function getTransactions() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function deleteTransaction(id) {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
}

export async function updateTransaction(transaction) {
  const db = await initDB();
  return db.put(STORE_NAME, transaction);
}

export async function exportTransactionsToCSV() {
  const transactions = await getTransactions();
  if (transactions.length === 0) return "";

  const headers = Object.keys(transactions[0]);
  const rows = transactions.map((t) =>
    headers.map((h) => `"${String(t[h]).replace(/"/g, '""')}"`).join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}

export async function importCSVToTransactions(file) {
  const text = await file.text();
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",");

  const transactions = lines.slice(1).map((line) => {
    const values = line
      .split(",")
      .map((v) => v.replace(/^"|"$/g, "").replace(/""/g, '"'));
    return Object.fromEntries(headers.map((h, i) => [h.trim(), values[i]]));
  });

  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  for (const t of transactions) {
    store.put(t); // pake put biar update kalau ID udah ada
  }

  return tx.done;
}

export async function getTransactionsByAccount(accountId) {
  const db = await initDB();
  const all = await db.getAll(STORE_NAME);
  return all.filter((t) => t.account_id === accountId);
}
