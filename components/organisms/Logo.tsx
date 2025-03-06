import React from "react";
import { Image } from "antd";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex max-w-[230px] flex-col items-center justify-center !border-none !shadow-none !outline-none"
    >
      <Image
        preview={false}
        src="/assets/auth/logo.svg"
        className="h-auto w-full object-scale-down"
        alt="Logo"
      />
    </Link>
  );
};
export default Logo;
