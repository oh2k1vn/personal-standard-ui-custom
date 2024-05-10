import React from "react";
import ReactDOM from "react-dom/client";
import "../lib/tailwind.css";
import { ComponentA } from "./a";

const ComponentApp = () => {
  return (
    <>
      <ComponentA />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<ComponentApp />);
