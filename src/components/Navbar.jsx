import { Link } from "react-router-dom";
import orangGanteng from "../assets/orang-ganteng.jpg";
export default function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm shadow-teal-800">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost text-xl text-teal-500 normal-case font-bold"
          >
            M-Tracker
          </Link>
        </div>
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-24 aspect-[1/1] rounded-full border-2 border-teal-600">
                <img alt="Profile" src={orangGanteng} className="object-top" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <Link to="/mychart" className="justify-between">
                  My Chart
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
