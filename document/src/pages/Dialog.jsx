import BlockCode from "../components/BlockCode";
import Page from "../components/Page";

const Dialog = () => {
  const fullCode = `
import React from "react";
import { Dialog, useDialog } from "personal-standard-ui-custom";

const DemoDialog = () => {
  const dialogRef = React.useRef<IDialog>(null);
  const { open, close } = useDialog(dialogRef);

  const handleOpenDialog = () => {
    open({
      title: "Tiêu đề dialog",
      content: "Nội dung dialog",
      buttons: [
        {
          text: "Xác nhận",

          onClick: () => {
            close();
          },
        },
        {
          text: "Hủy",
          isClose: true,
        },
        
      ],
    });
  };

  return (
    <>
      <Button onclick={handleOpenDialog}>Mở dialog</Button>
      <Dialog ref={dialogRef} />
    </>
  );
};
export default DemoDialog;
  `;
  return (
    <Page>
      <BlockCode code={fullCode} />
      <div>12312321</div>
      <div>12312321</div>
    </Page>
  );
};
export default Dialog;
