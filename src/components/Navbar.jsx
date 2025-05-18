import { Link } from "react-router-dom";
import orangGanteng from "../assets/orang-ganteng.jpg";
export default function Navbar({ balance }) {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm shadow-teal-800">
        {/* App Logo */}
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost text-xl text-teal-500 normal-case font-bold"
          >
            M-Tracker
          </Link>
        </div>

        <div className=" gap-2 pr-4">
          {/* User Information */}
          <div className="inline-flex items-center dropdown dropdown-end gap-0 xl:gap-4 relative">
            {/* Saldo saat ini */}
            <div className="flex flex-col lg:gap-0 items-end justify-center rounded-lg border-l border-transparent hover:bg-clip-border hover:bg-gradient-to-r hover:from-teal-600/30 hover:via-teal-600/10 hover:to-transparent px-3 pb-1 hover:cursor-pointer hover:border-teal-500/50 group transition-all duration-500 ease-in-out">
              <p className="font-semibold text-xs lg:text-sm text-teal-500 group-hover:text-teal-600 transition-all duration-500 ease-in-out">
                Guweh Sekali
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
            >
              <div className="w-24 aspect-[1/1] rounded-full border-2 border-teal-600">
                <img alt="Profile" src={orangGanteng} className="object-top" />
              </div>
            </div>

            {/* Dropdown user navigation */}
            <ul
              tabIndex={0}
              className="menu menu-sm absolute top-10 dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/dashboard" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/mychart" className="justify-between">
                  My Chart
                </Link>
              </li>
              <li>
                <Link>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
