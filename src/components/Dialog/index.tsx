import React from 'react';
import { cn } from '../../main';
import Button from '../Button';

interface IDialogProps {
  title?: string | React.ReactNode;
  content?: string | React.ReactNode;
  buttons?: {
    text: string;
    isClose?: boolean;
    style?: React.CSSProperties;
    isBorder?: boolean;
    onClick?: () => void;
    className?: string;
  }[];
  flex?: "row" | "col";
  closeByBackdropClick?: boolean;
}

export interface IDialog {
  open: (data: IDialogProps) => void;
  close: () => void;
}

const Dialog = React.forwardRef<IDialog, IDialogProps>((_, ref) => {

  const [open, setOpen] = React.useState(false);
  const [dataDialog, setDataDialog] = React.useState<IDialogProps>({});

  React.useImperativeHandle(
    ref,
    () => ({
      open: handleOpenDialog,
      close: handleCloseDialog,
    }),
    []
  );

  const handleOpenDialog = (data: IDialogProps) => {
    if (data) {
      setDataDialog({
        title: data.title,
        content: data.content,
        buttons: data.buttons,
        flex: data.flex ? data.flex : "row",
        closeByBackdropClick: data.closeByBackdropClick ? true : false,
      });
    }
    setOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseDialog = () => {
    setDataDialog({});
    setOpen(false);
    document.body.style.overflow = "";
  };
  return (
    <div className={cn("fixed inset-0 z-[99999] flex justify-center items-center select-none", {
      "opacity-100 visible": open,
      "opacity-0 invisible": !open
    })}>
      <div className='absolute inset-0 -z-[1] bg-black/10'></div>
      <div className={cn("p-4 rounded-lg bg-white max-w-[85vw] w-full relative", {
        "opacity-100 visible": open,
        "opacity-0 invisible": !open
      })}
        style={{
          transformOrigin: 'center',
          transform: open ? 'scaleY(1)' : 'scaleY(0)',
          transition: 'transform 0.5s ease',
          transitionDuration: '.3s',
          transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
        }}>
        <div className="font-bold text-base text-black">
          {dataDialog.title ? dataDialog.title : "Thông báo"}
        </div>
        <div className="text-sm mt-3 mb-4 text-black/80">
          {dataDialog.content}
        </div>
        {dataDialog.buttons?.length ? (
          <div
            className={cn("flex items-center gap-3 mt-4 ", {
              "flex-col": dataDialog.flex == "col",
              "flex-row justify-end": dataDialog.flex == "row",
              "justify-center items-center": dataDialog.buttons.length == 1,
            })}
          >
            {dataDialog.buttons?.map((item, index) => (
              <Button
                key={index}
                onClick={() => {
                  if (item.isClose || !item.onClick) {
                    if (item.onClick) {
                      item.onClick && item.onClick();
                      handleCloseDialog();
                    } else {
                      handleCloseDialog();
                    }
                  } else {
                    item.onClick && item.onClick();
                  }
                }}
                className={cn("text-sm font-semibold", {
                  "bg-transparent text-gray-600": index == 1,
                  "w-full": dataDialog.flex == "col",
                  "text-primary bg-transparent":
                    dataDialog.buttons?.length == 1,
                  "border border-primary":
                    item.isBorder || (item.isClose && item.onClick),
                })}
                style={item.style}
              >
                {item.text}
              </Button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
});
export default Dialog