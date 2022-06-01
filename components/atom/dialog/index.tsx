import { useRef, useEffect, HTMLAttributes } from "react";
import cx from "classnames";

interface DialogProps {
  children: JSX.Element | JSX.Element[] | string;
  open: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  onClose?: () => void;
}

export default function Dialog(props: DialogProps) {
  const { children, open, size, onClose } = props;

  const dialogref = useRef<HTMLDivElement>(null);

  const containerclass = cx("modal-dialog modal-dialog-centered modal-dialog-scrollable", {
    "modal-sm": size === "sm",
    "modal-lg": size === "lg",
    "modal-xl": size === "xl",
    "modal-md": size === "md",
  });

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (dialogref.current && !dialogref.current.contains(e.target)) {
        onClose && onClose();
      }
    };

    if (open) {
      document.addEventListener("mouseup", handleClickOutside);
      // document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    }

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      // document.body.style.overflow = "visible";
      document.body.classList.remove("modal-open");
    };
  }, [dialogref, open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1} role="dialog">
        <div
          ref={dialogref}
          className={containerclass}
          role="document"
          // style={{
          //   maxHeight: "calc(100% - 200px)",
          // }}
        >
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>
  );
}

Dialog.defaultProps = {
  size: undefined,
  onClose: undefined,
};
