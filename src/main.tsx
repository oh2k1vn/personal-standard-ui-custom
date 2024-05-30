/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactDOM from "react-dom/client";
import "../lib/tailwind.css";
import PullToRefresh from "../lib/components/PullToRefresh";

interface Root {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const ComponentApp = () => {
  const [data, setData] = React.useState<Root[]>([]);

  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full h-screen bg-background text-text p-10 ">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl w-[20rem] h-[40rem] border-[10px] border-gray-600 overflow-hidden">
        <PullToRefresh
          srcLogo="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/918px-NASA_logo.svg.png"
          onRefresh={() => {
            return new Promise((res) => {
              setTimeout(() => {
                res([]);
                console.log("onRefresh");
              }, 2000);
            });
          }}
        >
          <div className="flex flex-col gap-4 m-4 text-black bg-white">
            {data?.map((item: Root) => (
              <div
                key={item.id}
                className="min-h-40 border rounded-2xl shadow-xl p-4 text-center"
              >
                {item.title}
              </div>
            ))}
          </div>
        </PullToRefresh>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<ComponentApp />);
