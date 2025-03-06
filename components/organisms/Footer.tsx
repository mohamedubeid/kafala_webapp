import { Image } from "antd";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const { t: translate } = useTranslation("footer");

  return (
    <footer className="relative z-40 overflow-hidden bg-kafalaPrimary py-12">
      <div className="container">
        <div className="footer-content mx-auto max-w-[800px]">
          <div className="footer-title mb-3 text-center text-sm text-white">
            {translate("FOOTER_TITLE")}
          </div>
          <div className="copyright relative z-10 mx-auto text-center text-base text-sm text-white">
            {translate("FOOTER_DESC")}
          </div>
          <div className="footer-social mt-6 flex items-center justify-center gap-3">
            <Link href="/" className="social-icon">
              <Image
                preview={false}
                src="/assets/auth/insta.png"
                alt="social"
              />
            </Link>
            <Link href="/" className="social-icon">
              <Image preview={false} src="/assets/auth/face.png" alt="social" />
            </Link>
            <Link href="/" className="social-icon">
              <Image preview={false} src="/assets/auth/x.png" alt="social" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
