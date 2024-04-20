/* eslint-disable react-refresh/only-export-components */
import React from "react";
import ReactDOM from "react-dom/client";
import "../lib/tailwind.css";
import {
  Button,
  Checkbox,
  Toggle,
  Slider,
  Loading,
  Input,
} from "../lib/components";

const ComponentApp = () => {
  const data = [
    {
      url: "https://yamicomputer.com/image/data/tintuc-ngoc/hinh-nen-anime-3.jpg",
    },
    {
      url: "https://i.pinimg.com/736x/3e/93/65/3e9365c4c47666579f9270b649a1342f.jpg",
    },
    {
      url: "https://i.pinimg.com/736x/81/31/20/8131208cdb98026d71d3f89b8097c522.jpg",
    },
    {
      url: "https://i.pinimg.com/originals/ac/96/80/ac9680c31e6962428ea4ea48a9cb2588.jpg",
    },
  ];
  return (
    <>
      <div
        className="transition-all duration-500 h-screen bg-background flex items-center justify-center"
        style={{
          padding: "1rem",
        }}
      >
        <div className=" bg-surface rounded shadow dark:text-white text-black flex flex-col gap-4 p-4">
          <Button>hieu nguyen</Button>
          <Checkbox className="size-7" />
          <Toggle />
          <Input />
          <Loading />
          <div className="h-[25rem] w-[50rem]">
            <Slider images={data} />
          </div>
        </div>
      </div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<ComponentApp />);
