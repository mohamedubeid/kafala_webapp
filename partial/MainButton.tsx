import { Button } from "antd";
import React, { ReactNode } from "react";

type MainButtonProps = {
  text?: string | ReactNode;
  icon?: ReactNode;
  color?: "primary" | "primary-outline";
  classNameList?: string;
  type?: "link" | "text" | "default" | "primary" | "dashed";
  onClick?: () => void;
  hrefLink?: string;
  textClass?: string;
  target?: string;
  href?: string;
};

export const MainButton = ({
  text,
  icon,
  classNameList,
  type,
  color,
  onClick,
  textClass = "",
  href,
  target,
}: MainButtonProps) => {
  let colorStyle = "btn-kafala-primary";

  if (color && color === "primary") {
    colorStyle = "btn-kafala-primary";
  }

  if (color && color === "primary-outline") {
    colorStyle = "btn-kafala-primary-outline";
  }

  return (
    <Button
      type={!!type ? type : "default"}
      onClick={() => !!onClick && onClick()}
      className={`main-kafala-btn ${colorStyle} ${
        !!classNameList ? classNameList : ""
      }`}
      href={type == "link" && href ? href : undefined}
      target={(href && target) || undefined}
    >
      <div className={`flex w-full items-center justify-center gap-2`}>
        {!!icon && (
          <span className="main-btn-icon !flex items-center justify-center">
            {icon}
          </span>
        )}
        {!!text && <div className={`main-btn-text ${textClass}`}>{text}</div>}
      </div>
    </Button>
  );
};
