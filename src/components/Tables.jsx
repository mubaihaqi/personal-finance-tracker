import Swal from "sweetalert2";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import DotsAnimation from "./animations/DotsAnimation";
import { useRef, useEffect, useState } from "react";
import editIcon from "../assets/icons/EditIcon.svg";
import starIcon from "../assets/icons/StarIcon.svg";
import photoIcon from "../assets/icons/PhotoIcon.svg";
import trashIcon from "../assets/icons/TrashIcon.svg";
import ButtonAction from "./ButtonAction";

export default function Tables({
  transactions,
  onRemoveTransaction,
  onEditTransaction,
  onSort,
  sortConfig,
  selectedTransactions,
  onSelectTransaction,
  onSelectAllTransactions,
  month,
  selectedMonths,
  onMonthChange,
  onToggleFavorite,
  categories,
  onAddPhoto,
}) {
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const dropdownModalRef = useRef(null);
  const monthDropdownRef = useRef(null);

  const toggleDropdown = (id) => {
    setDropdownOpenId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownModalRef.current &&
        !dropdownModalRef.current.contains(event.target)
      ) {
        setDropdownOpenId(null);
      }
    }
    if (dropdownOpenId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpenId]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        monthDropdownRef.current &&
        !monthDropdownRef.current.contains(event.target)
      ) {
        setMonthDropdownOpen(false);
      }
    }
    if (monthDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [monthDropdownOpen]);

  const showAlert = (transactionId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You g bisa ngembaliin datanya lagi lho ntar",
      icon: "warning",
      showCancelButton: "true",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#1e293b",
      color: "#f0f0f0",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          text: "Dah kehapus dah",
          icon: "success",
          background: "#1e293b",
          color: "#f0f0f0",
        });
        onRemoveTransaction(transactionId);
      }
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  const isAllSelected =
    transactions.length > 0 &&
    selectedTransactions.length === transactions.length;

  function groupTransactions(transactions) {
    const grouped = {};

    transactions.forEach((tx) => {
      const date = new Date(tx.date);
      const monthName = format(date, "MMMM", { locale: id });
      const day = format(date, "yyyy-MM-dd");

      if (selectedMonths.length > 0 && !selectedMonths.includes(monthName))
        return;

      if (!grouped[monthName]) grouped[monthName] = {};
      if (!grouped[monthName][day]) grouped[monthName][day] = [];

      grouped[monthName][day].push(tx);
    });

    return Object.entries(grouped).map(([month, days]) => ({
      month,
      days: Object.entries(days)
        .sort((a, b) => new Date(b[0]) - new Date(a[0]))
        .map(([date, transactions]) => ({ date, transactions })),
    }));
  }

  const groupedByMonth = groupTransactions(transactions);

  const handleChangeImage = () => {
    // Cari transaksi yang sedang di-preview
    const transaction = transactions.find((t) => t.photo === previewPhoto);
    if (!transaction) return;
    onAddPhoto(transaction.id);
  };

  const handleRemoveImage = async () => {
    const transaction = transactions.find((t) => t.photo === previewPhoto);
    if (!transaction) return;
    const result = await Swal.fire({
      title: "Hapus Foto?",
      text: "Yakin ni, mau hapus?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yakin bwang",
      cancelButtonText: "Ntar dlu deh",
      background: "#1e293b",
      color: "#f0f0f0",
    });
    if (result.isConfirmed) {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        text: "Dah kehapus dah",
        icon: "success",
        background: "#1e293b",
        color: "#f0f0f0",
      });
      await onAddPhoto(transaction.id, null);
      setPreviewPhoto(null);
    }
  };

  const handleRemoveImageDropdown = async (transactionId) => {
    const result = await Swal.fire({
      title: "Hapus Foto?",
      text: "Yakin ni, mau hapus?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yakin bwang",
      cancelButtonText: "Ntar dlu deh",
      background: "#1e293b",
      color: "#f0f0f0",
    });
    if (result.isConfirmed) {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        text: "Dah kehapus dah",
        icon: "success",
        background: "#1e293b",
        color: "#f0f0f0",
      });
      await onAddPhoto(transactionId, null);
    }
  };

  return (
    <>
      <h2 className="font-bold text-lg mx-auto lg:mx-32 px-2 md:px-1 w-[92%] md:w-[96%] lg:w-auto md:mx-auto lg:px-4 mt-8 md:mt-6 lg:mt-8 border-b-2 pb-4 text-teal-500 border-slate-300 text-center lg:text-start flex justify-between items-center relative">
        <p
          className="hover:cursor-pointer hover:text-accent"
          onClick={() => onSelectAllTransactions(!isAllSelected)}
        >
          My Transactions
        </p>

        {/* Month Filter Button */}
        <div className="relative">
          <button
            className="text-white btn btn-outline btn-accent border-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            type="button"
            onClick={() => setMonthDropdownOpen((v) => !v)}
          >
            Month
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {monthDropdownOpen && (
            <div
              ref={monthDropdownRef}
              className="z-50 p-3 bg-white divide-y divide-gray-100 rounded-lg w-32 dark:bg-gray-700 shadow-sm shadow-teal-800 absolute right-0 mt-2"
            >
              <h6 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white border-teal-800 border-b-2 pb-1">
                Month
              </h6>
              <ul className="space-y-2 py-1 text-sm text-gray-700 dark:text-gray-200">
                {month.map((m) => (
                  <li key={m.id} className="flex justify-start">
                    <input
                      id={m.name}
                      type="checkbox"
                      value={m.name}
                      checked={selectedMonths.includes(m.name)}
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-teal-600 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => onMonthChange(m.name)}
                    />
                    <label
                      htmlFor={m.name}
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      {m.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </h2>

      {/* Table hanya tampil di desktop (lg ke atas) */}
      <div className="relative overflow-x-auto sm:rounded-lg md:mx-auto max-w-7xl mt-8 pb-8 mx-3 hidden md:w-[96%] md:block">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-sm shadow-teal-800 rounded-b-xl overflow-hidden">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="h-10">
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={(e) => onSelectAllTransactions(e.target.checked)}
                    className="w-4 h-4  bg-gray-100 border-gray-300 rounded text-teal-700 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                </div>
              </th>
              <th scope="col" className="px-9 py-3">
                <div
                  className="w-full inline-flex justify-between items-center cursor-pointer"
                  onClick={() => onSort("name")}
                >
                  Nama Transaksi {getSortIcon("name")}
                </div>
              </th>
              <th scope="col" className="px-14 py-3">
                <div
                  className="w-full inline-flex justify-between items-center cursor-pointer"
                  onClick={() => onSort("category")}
                >
                  Category {getSortIcon("category")}
                </div>
              </th>
              <th scope="col" className="px-14 py-3">
                <div
                  className="w-full inline-flex justify-between items-center cursor-pointer"
                  onClick={() => onSort("amount")}
                >
                  Amount {getSortIcon("amount")}
                </div>
              </th>
              <th scope="col" className="px-14 py-3">
                <div
                  className="w-full inline-flex justify-between items-center cursor-pointer"
                  onClick={() => onSort("date")}
                >
                  Date {getSortIcon("date")}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Photo
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className={`border-b border-gray-200 dark:border-gray-700
                ${
                  transaction.category === "Pemasukan"
                    ? "bg-green-50 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-900"
                }
                hover:bg-gray-50 dark:hover:bg-gray-600`}
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedTransactions.includes(transaction.id)}
                      onChange={() => onSelectTransaction(transaction.id)}
                      className="w-4 h-4  bg-gray-100 border-gray-300 rounded text-teal-600 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {transaction.name || "N/A"}
                </th>
                <td className="px-6 py-4">{transaction.category || "N/A"}</td>
                <td className="px-6 py-4 text-justify">
                  {transaction.amount || 0}
                </td>
                <td className="px-6 py-4">
                  {transaction.date
                    ? format(new Date(transaction.date), "yyyy-MM-dd")
                    : "N/A"}
                </td>
                <td className="px-6 py-4 text-center">
                  {transaction.photo ? (
                    <button
                      type="button"
                      className="text-green-500 font-semibold underline hover:text-green-700 transition"
                      onClick={() => setPreviewPhoto(transaction.photo)}
                      title="Klik untuk preview"
                    >
                      Documented
                    </button>
                  ) : (
                    <span className="text-gray-400 italic">null</span>
                  )}
                </td>
                <td className="flex items-center pr-2 py-4 justify-center gap-2">
                  <ButtonAction
                    onClick={() => onEditTransaction(transaction.id)}
                    icon={
                      <img
                        src={editIcon}
                        alt="edit"
                        className="w-4 aspect-square"
                      />
                    }
                    bgColor="bg-blue-500"
                    afterColor="after:bg-blue-800"
                  />
                  <ButtonAction
                    onClick={() => onToggleFavorite(transaction.id)}
                    icon={
                      <img
                        src={starIcon}
                        alt="star"
                        className="w-4 aspect-square"
                      />
                    }
                    bgColor={
                      transaction.favorite ? "bg-yellow-400" : "bg-slate-500"
                    }
                    afterColor={
                      transaction.favorite
                        ? "after:bg-yellow-600"
                        : "after:bg-slate-700"
                    }
                  />
                  <ButtonAction
                    onClick={() => onAddPhoto(transaction.id)}
                    icon={
                      <img
                        src={photoIcon}
                        alt="photo"
                        className="w-4 aspect-square"
                      />
                    }
                    bgColor="bg-teal-500"
                    afterColor="after:bg-teal-800"
                  />
                  <ButtonAction
                    onClick={() => showAlert(transaction.id)}
                    icon={
                      <img
                        src={trashIcon}
                        alt="trash"
                        className="w-4 aspect-square"
                      />
                    }
                    bgColor="bg-red-500"
                    afterColor="after:bg-red-800"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* List 1 kolom hanya tampil di mobile */}
      <div
        className="md:hidden mt-4 mx-4 block gap-x-4 gap-y-10"
        style={{
          gridTemplateColumns: `repeat(${groupedByMonth.length}, minmax(0, 1fr))`,
          gridAutoFlow: "column",
        }}
        ref={dropdownModalRef}
      >
        {groupedByMonth.map((monthGroup) => {
          const monthTransactionIds = monthGroup.days.flatMap((dayGroup) =>
            dayGroup.transactions.map((t) => t.id)
          );
          const isMonthAllSelected =
            monthTransactionIds.length > 0 &&
            monthTransactionIds.every((id) =>
              selectedTransactions.includes(id)
            );

          const handleSelectAllMonth = (isChecked) => {
            if (isChecked) {
              const newSelected = Array.from(
                new Set([...selectedTransactions, ...monthTransactionIds])
              );
              onSelectAllTransactions(newSelected);
            } else {
              const newSelected = selectedTransactions.filter(
                (id) => !monthTransactionIds.includes(id)
              );
              onSelectAllTransactions(newSelected);
            }
          };

          return (
            <div key={monthGroup.month} className="mb-0 flex flex-col">
              <div className="flex flex-col items-start px-1">
                <h3
                  className="text-xl font-semibold text-white mb-8 mt-6 px-1 pb-2 cursor-pointer select-none hover:cursor-pointer hover:text-slate-300 transition-all duration-500 ease-in-out border-b-2 border-slate-300 w-full text-start"
                  onClick={() => handleSelectAllMonth(!isMonthAllSelected)}
                >
                  {monthGroup.month}
                </h3>
              </div>
              {monthGroup.days.map((dayGroup) => {
                const dayTransactionIds = dayGroup.transactions.map(
                  (t) => t.id
                );
                const isDayAllSelected =
                  dayTransactionIds.length > 0 &&
                  dayTransactionIds.every((id) =>
                    selectedTransactions.includes(id)
                  );
                const handleSelectAllDay = (isChecked) => {
                  if (isChecked) {
                    const newSelected = Array.from(
                      new Set([...selectedTransactions, ...dayTransactionIds])
                    );
                    onSelectAllTransactions(newSelected);
                  } else {
                    const newSelected = selectedTransactions.filter(
                      (id) => !dayTransactionIds.includes(id)
                    );
                    onSelectAllTransactions(newSelected);
                  }
                };

                return (
                  <div
                    key={dayGroup.date}
                    className="bg-slate-800 rounded-lg px-2 py-2 mb-2 shadow-md space-y-4 flex flex-col"
                  >
                    {/* Header Hari Custom */}
                    <div
                      className={`flex justify-between items-center mb-0 px-4 pt-3 pb-2 cursor-pointer select-none transition-all duration-200 rounded-lg ${
                        isDayAllSelected ? "" : ""
                      }`}
                      onClick={() => handleSelectAllDay(!isDayAllSelected)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`text-4xl font-normal text-teal-500 leading-none transition-all duration-700 ease-in-out ${
                            isDayAllSelected ? "text-teal-600" : ""
                          }`}
                        >
                          {format(new Date(dayGroup.date), "d", { locale: id })}
                        </div>
                        <div className="flex flex-col leading-tight">
                          <div className="text-md text-teal-600">
                            {format(new Date(dayGroup.date), "EEEE", {
                              locale: id,
                            })}
                          </div>
                          <div className="text-xs text-gray-400">
                            {format(new Date(dayGroup.date), "MMMM yyyy", {
                              locale: id,
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-medium text-teal-500">
                        Rp{" "}
                        {dayGroup.transactions
                          .reduce((sum, t) => {
                            let amt = t.amount;
                            if (typeof amt === "string") {
                              amt = amt
                                .replace(/[^0-9,-]/g, "")
                                .replace(/\./g, "")
                                .replace(",", ".");
                              amt = amt.trim() === "" ? "0" : amt;
                              amt = parseFloat(amt);
                            } else {
                              amt = Number(amt) || 0;
                            }
                            // income +, expense -
                            return sum + (t.type === "income" ? amt : -amt);
                          }, 0)
                          .toLocaleString("id-ID")}
                      </div>
                    </div>

                    {/* Garis bawah */}
                    <div
                      className={`h-[1px] mb-3 mt-1 rounded-full mx-auto transition-all duration-1000 ease-in-out ${
                        isDayAllSelected
                          ? "bg-teal-500 w-[90%] animate-pulse"
                          : "bg-transparent w-[1px]"
                      }`}
                    />

                    {/* Card Day */}
                    {dayGroup.transactions.map((transaction) => {
                      const isSelected = selectedTransactions.includes(
                        transaction.id
                      );
                      const categoryObj = categories?.find(
                        (cat) => cat.name === transaction.category
                      );
                      const bgColor = categoryObj
                        ? categoryObj.style
                        : "#06b6d4";

                      return (
                        <div
                          key={transaction.id}
                          className={`flex items-center gap-3 py-3 pr-1 border bg-slate-800 rounded-lg px-4 cursor-pointer transition duration-700
                          ${
                            transaction.favorite
                              ? "border-b-2 border-b-amber-500"
                              : ""
                          }
                          ${
                            transaction.photo
                              ? "border-t-2 border-t-teal-500"
                              : ""
                          }
                          ${
                            !transaction.favorite && !transaction.photo
                              ? "border-b-0 border-t-0"
                              : ""
                          }
                          ${
                            isSelected
                              ? "border-teal-500"
                              : "border-transparent"
                          }
                          `}
                          onClick={() => onSelectTransaction(transaction.id)}
                          tabIndex={0}
                          role="button"
                          aria-pressed={isSelected}
                        >
                          {/* Icon/Avatar */}
                          <div
                            className="w-14 h-14 rounded-xl flex justify-center items-center shrink-0"
                            style={{ backgroundColor: bgColor }}
                          >
                            {transaction.icon ? (
                              <img
                                src={transaction.icon}
                                alt={transaction.name}
                                className="w-10 h-10"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <p className="text-gray-500 text-lg font-bold">
                                  {transaction.name[0].toUpperCase()}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Info transaksi */}
                          <div className="flex flex-col flex-grow gap-1">
                            <p className="text-base font-bold text-white">
                              {transaction.name}
                            </p>
                            <p className="text-sm text-gray-300">
                              {transaction.category}
                            </p>
                          </div>
                          {/* Amount & time */}
                          <div className="flex flex-col items-end w-auto gap-2">
                            <p className="text-sm text-teal-400">
                              Rp{" "}
                              {Number(
                                String(transaction.amount).replace(/[^\d]/g, "")
                              )?.toLocaleString("id-ID")}
                            </p>
                            <p className="text-xs text-gray-300 mt-1">
                              {format(new Date(transaction.date), "HH:mm", {
                                locale: id,
                              })}
                            </p>
                          </div>
                          {/* Dropdown menu button */}
                          <div className="relative">
                            <button
                              onClick={() => toggleDropdown(transaction.id)}
                            >
                              <div className="h-9 overflow-hidden aspect-square flex items-center justify-center rounded-full hover:bg-slate-700/60 transition-all duration-200 hover:cursor-pointer">
                                <DotsAnimation />
                              </div>
                            </button>

                            {/* Dropdown Modal */}
                            {dropdownOpenId === transaction.id && (
                              <div
                                ref={dropdownModalRef}
                                className="absolute flex flex-col p-2 -right-3 w-38 -top-9 mt-2 bg-slate-800/90 backdrop-blur-sm text-sm rounded-lg shadow-md z-50 gap-1"
                              >
                                <button
                                  onClick={() =>
                                    onEditTransaction(transaction.id)
                                  }
                                  className=" text-start ps-2 rounded-md h-auto py-[6px] hover:cursor-pointer hover:bg-teal-600/30"
                                >
                                  Edit
                                </button>
                                <button
                                  className=" text-start ps-2 rounded-md h-auto py-[6px] hover:cursor-pointer hover:bg-teal-600/30 w-full"
                                  onClick={() =>
                                    onToggleFavorite(transaction.id)
                                  }
                                >
                                  {transaction.favorite
                                    ? "Remove from Favorite"
                                    : "Add to Favorite"}
                                </button>
                                <button
                                  className="text-start ps-2 rounded-md h-auto py-[6px] hover:cursor-pointer hover:bg-teal-600/30"
                                  onClick={
                                    transaction.photo
                                      ? () =>
                                          handleRemoveImageDropdown(
                                            transaction.id
                                          )
                                      : () => onAddPhoto(transaction.id)
                                  }
                                >
                                  {transaction.photo
                                    ? "Remove Photo"
                                    : "Add Photo"}
                                </button>
                                <div className="h-[1px] bg-teal-400 rounded-full w-[90%] mx-auto"></div>
                                <button
                                  onClick={() => showAlert(transaction.id)}
                                  className=" text-start ps-2 rounded-md h-auto py-[6px] hover:cursor-pointer hover:bg-teal-600/30"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Modal preview */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-slate-800/90 rounded-lg p-4 max-w-xs w-full flex flex-col items-center relative">
            <button
              className="absolute top-0 right-3 text-gray-700 hover:text-red-500 text-xl"
              onClick={() => setPreviewPhoto(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={previewPhoto}
              alt="Transaction Photo"
              className="max-w-full max-h-80 rounded mb-4"
            />
            <div className="h-auto w-full flex gap-2 px-3">
              <button
                className="flex-1 flex btn btn-outline btn-info text-sm font-medium px-1 transition-all duration-500 ease-in-out"
                onClick={handleChangeImage}
              >
                Change image
              </button>
              <button
                className="flex-1 flex btn btn-outline btn-error text-sm font-medium px-1 transition-all duration-500 ease-in-out"
                onClick={handleRemoveImage}
              >
                Remove image
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
