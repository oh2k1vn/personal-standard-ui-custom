import { cn } from "main";

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

// interface AvatarGroupProps {
//   id?: string;
//   className?: string;
//   style?: React.CSSProperties;
//   children?: React.ReactNode;

//   /**
//    * Số lượng avatar tối đa có thể hiển thị trong group.
//    * Nếu như số lượng avatar trong group nhiều hơn `maxCounter`, phần tử cuối cùng trong group sẽ được hiển thị với nội dung `+x` (với `x` là số lượng avatar còn lại).

//   * @default 3
//    */
//   maxCounter?: number;
//   /**
//    * Giả lập số lượng avatar trong group.
//    * Ví dụ: bạn cần hiển thị 3 avatar đầu tiên, sau đó là `+997`, bạn có thể truyền vào `<Group total={1000} />` thay vì thật sự render 1000 `<Avatar>` để tối ưu performance.
//    *
//    * @default children.length
//    */
//   total?: number;
//   /**
//    * Hiển thị các avatar dưới dạng ngang. Mặc định các avatar trong group sẽ được hiển thị dưới dạng lưới, trừ khi số lượng nhiều hơn 4 avatar.
//    *
//    * @default false
//    */
//   horizontal?: boolean;
//   /**
//    * Callback được gọi khi người dùng nhấn chuột vào counter.
//    * __Counter__ là phần tử cuối cùng trong group được hiển thị với nội dung`+x` (với x là số lượng avatar không thể hiển thị hết trong group).
//    */
//   onCounterClick?: React.MouseEventHandler<HTMLElement>;
// }

export const Avatar: React.FC<AvatarProps> = (props) => {
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
