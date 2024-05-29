/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactDOM from "react-dom/client";
import "../lib/tailwind.css";
import "zmp-ui/zaui.css";
import { Loading } from "../lib/components/Loading";
import { Button } from "../lib/components/Button";

const ComponentApp = () => {
  const [active, setActive] = React.useState(false);
  return (
    <div className="w-full h-screen bg-background text-text p-10 ">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl w-[20rem] h-[40rem] border-[10px] border-gray-600 overflow-hidden ">
        <div className="flex flex-col gap-4 h-full  items-center">
          <Button className="w-fit" onClick={() => setActive(!active)}>
            open
          </Button>
          <Loading
            active={active}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN4kL3QrZwpnzRtoxqYBiri57oN8v9RJ0LWA&s"
          />
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<ComponentApp />);
