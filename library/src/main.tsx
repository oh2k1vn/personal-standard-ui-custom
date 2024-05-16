import React from "react";
import ReactDOM from "react-dom/client";
import "../lib/tailwind.css";
import { Button } from "../lib/components/Button";
import { Toggle } from "../lib/components/Toggle";
import { Checkbox } from "../lib/components/Checkbox";
import { useDialog } from "../lib/hooks/useDialog";
import { Dialog, IDialog } from "../lib/components/Dialog";

const ComponentApp = () => {
  const dialogRef = React.useRef<IDialog>(null);
  const { open, close } = useDialog(dialogRef);

  return (
    <div className="w-full h-screen bg-background text-text p-10">
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={async () => {
            await open({
              content: "content 1",
              flex: "col",
              buttons: [
                {
                  text: "Xác nhận",
                  onClick: () => {
                    console.log("button");
                  },
                },
                {
                  text: "Hủy",
                  onClick() {
                    close();
                  },
                },
              ],
            });
          }}
        >
          Hieu Nguyen Hieu Nguyen
        </Button>
        <Toggle />
        <Checkbox />
      </div>
      {/* <ComponentA /> */}
      <Dialog ref={dialogRef} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<ComponentApp />);
