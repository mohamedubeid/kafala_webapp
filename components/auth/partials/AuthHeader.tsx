import { Image } from "antd";
import { useRouter } from "next/router";
import React from "react";

type AuthHeaderProps = {
  title: string;
  description?: string;
  className?: string;
  warpperClassName?: string;
};
const AuthHeader = ({
  title,
  description,
  className = "",
  warpperClassName = "",
}: AuthHeaderProps) => {
  const router = useRouter();
  return (
    <div className={`mb-2 mt-8 flex flex-col gap-6 ${warpperClassName}`}>
      <div
        className={`auth-title text-3xl font-semibold text-gray lg:text-[2.5rem] ${className}`}
      >
        {title}
      </div>
      {description && (
        <div className="description text-lg 2xl:text-xl">{description}</div>
      )}
    </div>
  );
};
export default AuthHeader;
