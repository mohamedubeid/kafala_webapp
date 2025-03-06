import React, { ReactNode } from "react";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";

type Props = {
  children: ReactNode;
  navbarShadow?: boolean;
  navbarStatic?: boolean;
  activePage?: string;
  redirectNavbar?: boolean;
};

const HomeLayout = ({
  children,
  navbarShadow,
  navbarStatic,
  activePage,
  redirectNavbar,
}: Props) => {
  return (
    <div>
      <Navbar
        navbarShadow={navbarShadow || false}
        navbarStatic={navbarStatic || false}
        activePage={activePage || "/"}
        redirectNavbar={redirectNavbar || false}
      />
      {children}
      <Footer />
    </div>
  );
};
export default HomeLayout;
