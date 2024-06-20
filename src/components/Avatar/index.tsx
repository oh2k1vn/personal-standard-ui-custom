import { cn } from "../../main";

interface AvatarProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Hiển thị trạng thái online của Avatar
   *
   * @default false
   */
  online?: boolean;
  /**
   * Nhận các giá trị: `default`, `seen`
   *
   * @type string
   */
  story?: "seen" | "default";
  /** Kích thước avatar */
  size?: number;
  /** `src` cho thẻ `img` của avatar */
  src?: string;

  /**
   * Callback được gọi khi người dùng nhấn chuột vào avatar.
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={cn(
        "relative rounded-full inline-block align-middle text-center from-primary to-white bg-gradient-to-tr"
      )}
      style={{
        width: props.size ? props.size + "px" : "3rem",
        height: props.size ? props.size + "px" : "3rem",
      }}
    >
      {props.src ? (
        <img
          {...props}
          className="size-full object-cover rounded-full overflow-hidden absolute top-0 left-0"
        />
      ) : (
        <div className="size-full rounded-full overflow-hidden absolute top-0 left-0 inline-flex items-center justify-center bg-inherit "></div>
      )}

      {props.online && (
        <span
          className="size-[10px] bg-[#34b764] absolute rounded-full border-2 border-white box-content"
          style={{
            bottom: props.size
              ? `calc(${props.size}px * 0.1464 - 10px * 0.75)`
              : "1px",
            right: props.size
              ? `calc(${props.size}px * 0.1464 - 10px * 0.75)`
              : "1px",
          }}
        ></span>
      )}
    </div>
  );
};

export default Avatar;
