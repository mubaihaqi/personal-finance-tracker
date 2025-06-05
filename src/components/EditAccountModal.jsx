import React, { useState, useEffect } from "react";

export default function EditAccountModal({ isOpen, account, onSave, onClose }) {
  const [name, setName] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [gaji, setGaji] = useState("");
  const [photo, setPhoto] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (account) {
      setName(account.name || "");
      setPekerjaan(account.pekerjaan || "");
      setGaji(account.gaji || "");
      setPhoto(account.photo || "");
      setPreview(account.photo || "");
    } else if (isOpen) {
      setName("");
      setPekerjaan("");
      setGaji("");
      setPhoto("");
      setPreview("");
    }
  }, [account, isOpen]);

  // Handler upload file
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4 text-teal-600">Edit Account</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave({ ...account, name, pekerjaan, gaji: Number(gaji), photo });
          }}
        >
          {/* Nama */}
          <div className="relative h-11 w-full min-w-[200px] mb-4">
            <input
              placeholder=" "
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-none disabled:border-0 disabled:bg-blue-gray-50"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              id="edit-account-name"
              autoComplete="off"
            />
            <label
              htmlFor="edit-account-name"
              className="before:content-[' '] after:content-[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-teal-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-teal-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
            >
              Nama
            </label>
          </div>
          {/* Pekerjaan */}
          <div className="relative h-11 w-full min-w-[200px] mb-4">
            <input
              placeholder=" "
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-none disabled:border-0 disabled:bg-blue-gray-50"
              value={pekerjaan}
              onChange={(e) => setPekerjaan(e.target.value)}
              required
              id="edit-account-pekerjaan"
              autoComplete="off"
            />
            <label
              htmlFor="edit-account-pekerjaan"
              className="before:content-[' '] after:content-[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-teal-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-teal-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
            >
              Pekerjaan
            </label>
          </div>
          {/* Gaji */}
          <div className="relative h-11 w-full min-w-[200px] mb-4">
            <input
              placeholder=" "
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border !focus:outline-none placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-500 focus:border-t-transparent focus:outline-none disabled:border-0 disabled:bg-blue-gray-50"
              value={gaji === "" ? "" : Number(gaji).toLocaleString("id-ID")}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/[^0-9]/g, "");
                setGaji(rawValue);
              }}
              required
              min={0}
              type="text"
              inputMode="numeric"
              id="edit-account-gaji"
              autoComplete="off"
            />
            <label
              htmlFor="edit-account-gaji"
              className="before:content-[' '] after:content-[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-teal-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-teal-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
            >
              Gaji Perbulan
            </label>
          </div>
          {/* Upload Photo */}
          <div className="relative w-full min-w-[200px] mb-4 flex flex-col">
            <label className="mb-1 text-[11px] font-normal text-blue-gray-400">
              Foto (opsional)
            </label>
            <div className="flex items-center gap-3">
              {/* {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-12 aspect-square rounded-lg object-cover border border-teal-400"
                />
              )} */}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="text-sm file:py-2 focus:text-transparent font-semibold text-gray-500 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-500/30 file:text-white hover:file:bg-teal-600 transition-all duration-500 ease-in-out file:cursor-pointer"
              />
            </div>
          </div>

          {/* Tombol */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-md btn-soft"
              onClick={onClose}
            >
              Batal
            </button>
            <button type="submit" className="btn btn-soft btn-accent btn-md">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
