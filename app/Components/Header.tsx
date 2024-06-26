import { useState } from "react";

export default function Header() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <nav className="bg-white py-3 shadow-md">
        <div
          className={`max-w-[1200px] m-auto px-3 md:flex md:justify-between`}
        >
          <div className="flex justify-between">
            <div className="my-auto">OtakuClone</div>
            <button
              onClick={() => setToggle(!toggle)}
              type="button"
              className="p-2 text-sm text-gray-500 md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className={`md:flex md:space-x-3 *:py-1 *:hover:cursor-pointer ${
              !toggle ? "hidden" : ""
            }`}
          >
            <div>Home</div>
            <div>Anime List</div>
            <div>Ongoing Anime</div>
            <div>Genre List</div>
          </div>
        </div>
      </nav>
    </>
  );
}
