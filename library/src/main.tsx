/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactDOM from "react-dom/client";
import "../lib/tailwind.css";

const ComponentApp = () => {
  const Menus = [
    {
      name: "Home",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5 20v-9.144l-1.935 1.49l-.603-.792L12 4.25l9.538 7.304l-.603.786L19 10.856V20zm3-5.23q-.31 0-.54-.23T7.23 14t.23-.54t.54-.23t.54.23t.23.54t-.23.54t-.54.23m4 0q-.31 0-.54-.23t-.23-.54t.23-.54t.54-.23t.54.23t.23.54t-.23.54t-.54.23m4 0q-.31 0-.54-.23t-.23-.54t.23-.54t.54-.23t.54.23t.23.54t-.23.54t-.54.23"
          />
        </svg>
      ),
      dis: "translate-x-0",
    },
    {
      name: "Home",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5 20v-9.144l-1.935 1.49l-.603-.792L12 4.25l9.538 7.304l-.603.786L19 10.856V20zm3-5.23q-.31 0-.54-.23T7.23 14t.23-.54t.54-.23t.54.23t.23.54t-.23.54t-.54.23m4 0q-.31 0-.54-.23t-.23-.54t.23-.54t.54-.23t.54.23t.23.54t-.23.54t-.54.23m4 0q-.31 0-.54-.23t-.23-.54t.23-.54t.54-.23t.54.23t.23.54t-.23.54t-.54.23"
          />
        </svg>
      ),
      dis: "translate-x-[3.5rem]",
    },
    {
      name: "Home",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5 20v-9.144l-1.935 1.49l-.603-.792L12 4.25l9.538 7.304l-.603.786L19 10.856V20zm3-5.23q-.31 0-.54-.23T7.23 14t.23-.54t.54-.23t.54.23t.23.54t-.23.54t-.54.23m4 0q-.31 0-.54-.23t-.23-.54t.23-.54t.54-.23t.54.23t.23.54t-.23.54t-.54.23m4 0q-.31 0-.54-.23t-.23-.54t.23-.54t.54-.23t.54.23t.23.54t-.23.54t-.54.23"
          />
        </svg>
      ),
      dis: "translate-x-[7rem]",
    },
    {
      name: "Home",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5 20v-9.144l-1.935 1.49l-.603-.792L12 4.25l9.538 7.304l-.603.786L19 10.856V20zm3-5.23q-.31 0-.54-.23T7.23 14t.23-.54t.54-.23t.54.23t.23.54t-.23.54t-.54.23m4 0q-.31 0-.54-.23t-.23-.54t.23-.54t.54-.23t.54.23t.23.54t-.23.54t-.54.23m4 0q-.31 0-.54-.23t-.23-.54t.23-.54t.54-.23t.54.23t.23.54t-.23.54t-.54.23"
          />
        </svg>
      ),
      dis: "translate-x-[10.7rem]",
    },
    {
      name: "Home",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5 20v-9.144l-1.935 1.49l-.603-.792L12 4.25l9.538 7.304l-.603.786L19 10.856V20zm3-5.23q-.31 0-.54-.23T7.23 14t.23-.54t.54-.23t.54.23t.23.54t-.23.54t-.54.23m4 0q-.31 0-.54-.23t-.23-.54t.23-.54t.54-.23t.54.23t.23.54t-.23.54t-.54.23m4 0q-.31 0-.54-.23t-.23-.54t.23-.54t.54-.23t.54.23t.23.54t-.23.54t-.54.23"
          />
        </svg>
      ),
      dis: "translate-x-[14.3rem]",
    },
  ];

  const [active, setActive] = React.useState(0);
  return (
    <div className="w-full h-screen bg-background text-text p-10 ">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl w-[20rem] h-[40rem] border-[10px] border-gray-600 overflow-hidden ">
        <div className="flex flex-col justify-end h-full">
          <div className="bg-gray-200 max-h-[4.4rem] rounded-t-xl relative px-1">
            <span
              className={`bg-red-500 border-4  border-white size-16 absolute rounded-full -top-6 duration-500  ${Menus[active].dis}`}
            >
              <span className="size-3.5 bg-transparent absolute top-5 -left-[18px] rounded-tr-[11px] shadow-myShadow1"></span>
              <span className="size-3.5 bg-transparent absolute top-5 -right-[18px] rounded-tl-[11px] shadow-myShadow2"></span>
            </span>
            <ul className=" relative grid grid-cols-5 items-center">
              {Menus.map((item, i) => (
                <li
                  key={i}
                  className="flex justify-center items-center flex-col pt-4"
                  onClick={() => setActive(i)}
                >
                  <span
                    className={`text-xl cursor-pointer duration-500 text-gray-400 ${
                      active === i && "-mt-[3.2rem] text-white"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`font-medium text-red-500 ${
                      active === i
                        ? "translate-y-4 duration-700 opacity-100 "
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<ComponentApp />);
