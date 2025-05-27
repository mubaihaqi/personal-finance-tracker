import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import TrashIcon from "../assets/icons/TrashIcon.svg";
import Swal from "sweetalert2";
import logom from "../assets/logom.png";

export default function Navbar({
  balance,
  accounts = [],
  activeAccountId,
  onSwapAccount,
  onAddAccountClick,
  onDeleteAccount,
}) {
  const [isSwapOpen, setIsSwapOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown jika klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsSwapOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeAccount = accounts.find((a) => a.id === activeAccountId);

  // Handler konfirmasi hapus akun
  const handleDeleteAccount = (id) => {
    Swal.fire({
      title: "Yakin mau hapus akun?",
      text: "Data lu bakal ilang semua lho kalau akunnya lu hapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus bwang",
      cancelButtonText: "Ntar dlu",
      background: "#1e293b",
      color: "#f0f0f0",
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteAccount(id);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Akun berhasil dihapus.",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          background: "#1e293b",
          color: "#f0f0f0",
        });
      }
    });
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm shadow-teal-800">
        {/* App Logo */}
        <div className="flex-1">
          <Link
            to="/"
            className="ps-4 flex items-center gap-2 text-xl text-teal-500 hover:text-teal-600 normal-case font-bold"
          >
            <img
              src={logom}
              alt="M-Tracker Logo"
              className="w-8 h-8 object-contain"
            />
            M-Tracker
          </Link>
        </div>

        <div className=" gap-2 pr-4">
          {/* User Information */}
          <div className="inline-flex items-center dropdown dropdown-end gap-0 xl:gap-4 relative">
            {/* Saldo saat ini */}
            <div className="flex flex-col lg:gap-0 items-end justify-center rounded-lg border-l border-transparent hover:bg-clip-border hover:bg-gradient-to-r hover:from-teal-600/30 hover:via-teal-600/10 hover:to-transparent px-3 pb-1 hover:cursor-pointer hover:border-teal-500/50 group transition-all duration-500 ease-in-out">
              <p className="font-semibold text-xs lg:text-sm text-teal-500 group-hover:text-teal-600 transition-all duration-500 ease-in-out">
                {activeAccount?.name || "Outlander"}
              </p>
              <p className="font-medium text-xs group-hover:text-gray-400 transition-all duration-500 ease-in-out">
                Rp {(balance ?? 0).toLocaleString("id-ID")}
              </p>
            </div>

            {/* Profile Photo */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <div
                className={`w-24 aspect-[1/1] rounded-full border-2 border-teal-600 overflow-hidden bg-gradient-to-tr from-emerald-500 via-teal-500 to-lime-500 flex items-center justify-center ${
                  activeAccount?.photo
                    ? "bg-gradient-to-t from-teal-600/30 via-teal-600/10 to-transparent"
                    : "bg-gradient-to-tr from-emerald-500 via-teal-500 to-lime-500"
                }`}
              >
                {activeAccount?.photo ? (
                  <img
                    alt="Profile"
                    src={activeAccount.photo}
                    className="object-cover w-full h-full"
                  />
                ) : null}
              </div>
            </div>

            {/* Dropdown user navigation */}
            <ul
              ref={dropdownRef}
              className={`menu menu-sm dropdown-content absolute top-10 -right-3 bg-base-100 rounded-box z-1 mt-3 w-84 p-2 shadow transition-all duration-200 ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
              <li>
                <Link
                  to="/dashboard"
                  className="justify-between font-semibold text-base py-2 mb-1"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="justify-between font-semibold text-base py-2 mb-1"
                >
                  Transaction
                </Link>
              </li>
              <li>
                <Link
                  to="/mychart"
                  className="justify-between font-semibold text-base py-2"
                >
                  My Chart
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="justify-between font-semibold text-base py-2"
                >
                  About
                </Link>
              </li>
              <div className="h-[2px] w-[95%] mx-auto px-2 mt-2 mb-3 rounded-full bg-teal-500/80"></div>

              {/* Swap Account */}
              <li>
                <button
                  type="button"
                  className="font-semibold text-base py-2 flex items-center w-full justify-between pr-4"
                  onClick={() => setIsSwapOpen((prev) => !prev)}
                >
                  Swap Account
                  <svg
                    className={`w-2.5 h-2.5 ml-3 transform transition-transform duration-300 ${
                      isSwapOpen ? "rotate-180" : ""
                    }`}
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

                {/* Dropdown content untuk Swap Account */}
                {isSwapOpen && (
                  <ul className="pl-4 py-2 flex flex-col gap-1 w-[90%]">
                    {accounts.map((acc) => (
                      <li
                        key={acc.id}
                        className="inline-flex items-start gap-1"
                      >
                        <div className="w-full justify-between flex items-center">
                          {/* Nama akun */}
                          <button
                            className={`text-base py-1 text-left ${
                              acc.id === activeAccountId
                                ? "font-bold text-teal-500"
                                : ""
                            }`}
                            onClick={() => {
                              setIsSwapOpen(false);
                              onSwapAccount(acc.id);
                            }}
                          >
                            {acc.name}
                          </button>
                          {/* Tombol hapus akun */}
                          <button
                            className="px-1 aspect-square btn btn-sm btn-error rounded w-auto mr-2"
                            title="Hapus akun"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAccount(acc.id);
                            }}
                            disabled={accounts.length <= 1}
                            style={
                              accounts.length <= 1
                                ? { opacity: 0.5, cursor: "not-allowed" }
                                : {}
                            }
                          >
                            <img
                              src={TrashIcon}
                              alt="Hapus"
                              className="w-4 aspect-square"
                            />
                          </button>
                        </div>
                      </li>
                    ))}
                    <li>
                      <button
                        className="text-base h-10 py-[10px] w-full text-left"
                        onClick={() => {
                          setIsSwapOpen(false);
                          onAddAccountClick();
                        }}
                        disabled={accounts.length >= 5}
                        style={
                          accounts.length >= 5
                            ? { opacity: 0.5, cursor: "not-allowed" }
                            : {}
                        }
                      >
                        Add Account
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
