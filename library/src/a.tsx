/* eslint-disable react-refresh/only-export-components */
import React from "react";
import "../lib/tailwind.css";

import { BottomSheet, IBottomSheet } from "../lib/components/BottomSheet";
import { Button } from "../lib/components/Button";
import { Dialog, IDialog } from "../lib/components/Dialog";
import { Input } from "../lib/components/Input";
import { useDialog } from "../lib/hooks/useDialog";
import { Demo } from "./demo";

export const ComponentA = () => {
  // const [open, setOpen] = React.useState(false);

  const ref = React.useRef<IBottomSheet>(null);
  const ref1 = React.useRef<IBottomSheet>(null);

  const dialogRef = React.useRef<IDialog>(null);
  const { open, close } = useDialog(dialogRef);

  return (
    <>
      <div
        id="container"
        className="transition-all duration-500 bg-background flex items-center justify-center h-screen"
        style={{
          padding: "1rem",
        }}
      >
        <div className="bg-surface max-w-80 w-full rounded shadow dark:text-white text-black flex flex-col gap-4 p-4 h-full overflow-y-auto">
          <div className="flex flex-col gap-6 items-center bg-white">
            <Input className=" bg-white" type="text" />

            <Button
              onClick={() => {
                // Promise.all([ref.current?.open()]);

                open({
                  content: "content 1",
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
              Bottom Sheet
            </Button>

            <Button
              onClick={() => {
                // dialog.current?.open();
                open({
                  content: "content 2",
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
              Dialog
            </Button>

            <BottomSheet
              ref={ref}
              iconClose
              onClickIconClose={() => {
                console.log("123123123123");
              }}
            >
              <div className="mx-auto max-w-2xl space-y-4 ">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Minima laboriosam quos deleniti veniam est culpa quis nihil
                  enim suscipit nulla aliquid iure optio quaerat deserunt,
                  molestias quasi facere aut quidem reprehenderit maiores.
                </p>
                <Button
                  onClick={() => {
                    // setOpen(!open);
                  }}
                >
                  Bottom Sheet
                </Button>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Minima laboriosam quos deleniti veniam est culpa quis nihil
                  enim suscipit nulla aliquid iure optio quaerat deserunt,
                  molestias quasi facere aut quidem reprehenderit maiores.
                </p>
                {/* {open && (
                  <>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Minima laboriosam quos deleniti veniam est culpa quis
                      nihil enim suscipit nulla aliquid iure optio quaerat
                      deserunt, molestias quasi facere aut quidem reprehenderit
                      maiores.
                    </p>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Minima laboriosam quos deleniti veniam est culpa quis
                      nihil enim suscipit nulla aliquid iure optio quaerat
                      deserunt, molestias quasi facere aut quidem reprehenderit
                      maiores.
                    </p>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Minima laboriosam quos deleniti veniam est culpa quis
                      nihil enim suscipit nulla aliquid iure optio quaerat
                      deserunt, molestias quasi facere aut quidem reprehenderit
                      maiores.
                    </p>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Minima laboriosam quos deleniti veniam est culpa quis
                      nihil enim suscipit nulla aliquid iure optio quaerat
                      deserunt, molestias quasi facere aut quidem reprehenderit
                      maiores.
                    </p>
                  </>
                )} */}
              </div>
            </BottomSheet>

            <BottomSheet ref={ref1} title="hiêu">
              <div className="mx-auto max-w-2xl space-y-4 ">
                <h2 className="text-4xl font-bold ">
                  Drag the handle at the top of this modal downwards 100px to
                  close it
                </h2>
                <Button
                  onClick={() => {
                    ref1.current?.close();
                  }}
                >
                  Bottom Sheet
                </Button>
              </div>
            </BottomSheet>

            <Dialog ref={dialogRef} />
          </div>
          <Demo />
        </div>
      </div>
    </>
  );
};
