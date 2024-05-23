import { Button as Btn, Checkbox, Input } from "personal-standard-ui-custom";
import BlockCode from "../components/BlockCode";
import TitleComponent from "../components/TitleComponent";
import ContentComponent from "../components/contentComponent";
import React from "react";
const Button = () => {
  const [data, setData] = React.useState({
    children: "Default",
    disabled: false,
  });

  const [hiddenInfo, setHiddenInfo] = React.useState(false);

  const example = `import { Button } from "personal-standard-ui-custom";

export const ExampleButton = () => {
  return (
    <Button onClick={() => {} className="w-fit" ${
      data.disabled ? "disabled" : ""
    }>${data.children}</Button>
  )
}`;

  return (
    <>
      <TitleComponent title="Default button block" />
      <ContentComponent>
        <Btn disabled={data.disabled} onClick={() => {}}>
          {data.children}
        </Btn>
      </ContentComponent>

      <BlockCode code={example} />

      <TitleComponent title="Default button inline block" />
      <ContentComponent>
        <Btn disabled={data.disabled} onClick={() => {}} className="w-fit">
          {data.children}
        </Btn>
      </ContentComponent>

      <BlockCode code={example} />

      <div className="bg-slate-900 p-4 fixed bottom-0 left-0 w-full">
        <svg
          onClick={() => setHiddenInfo(!hiddenInfo)}
          xmlns="http://www.w3.org/2000/svg"
          className="size-5 text-white border border-gray-300 p-2 box-content rounded-lg cursor-pointer"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5 5q-.425 0-.712-.288T4 4t.288-.712T5 3h14q.425 0 .713.288T20 4t-.288.713T19 5zm7 16q-.425 0-.712-.288T11 20v-9.2l-1.9 1.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l3.6-3.6q.15-.15.325-.212T12 7.425t.375.063t.325.212l3.6 3.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275L13 10.8V20q0 .425-.287.713T12 21"
          />
        </svg>

        {!hiddenInfo && (
          <div className="divide-y divide-gray-700 mt-8 text-white">
            <div className="flex items-center gap-2 capitalize text-gray-500 font-bold pb-2">
              <p className="w-[20%] ">Tên</p>
              <p className="flex-1">Điều khiển</p>
            </div>

            <div className="py-4 flex items-center">
              <p className="w-[20%] ">
                Text <span className="text-red-500">*</span>
              </p>
              <p className="flex-1">
                <Input
                  className="text-white border-gray-700"
                  value={data.children}
                  onChange={(e) =>
                    setData({ ...data, children: e.target.value })
                  }
                />
              </p>
            </div>
            <div className="py-4 flex items-center">
              <p className="w-[20%] ">Disabled</p>
              <p className="flex-1">
                <Checkbox
                  checked={data.disabled}
                  onChange={(e) =>
                    setData({ ...data, disabled: e.target.checked })
                  }
                />
              </p>
            </div>

            <div className="py-4 flex items-center">
              <p className="w-[20%] ">onClick</p>
              <p className="flex-1">-</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Button;
