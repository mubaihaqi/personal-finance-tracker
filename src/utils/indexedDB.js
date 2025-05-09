import { openDB } from "idb";

const DB_NAME = "PersonalFinanceTracker";
const DB_VERSION = 1;
const STORE_NAME = "transactions";

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
}

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
