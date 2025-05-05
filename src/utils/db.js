import { openDB } from "idb";

const DB_NAME = "FinanceTrackerDB";
const STORE_NAME = "transactions";
const DB_VERSION = 1;

// Open the DB and create store if not exist
export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

// Add a transaction
export const addTransaction = async (transaction) => {
  const db = await initDB();
  await db.add(STORE_NAME, transaction);
};

// Get all transactions
export const getTransactions = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

// Delete transaction by ID
export const deleteTransaction = async (id) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};
