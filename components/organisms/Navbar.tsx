import React, { useEffect, useState } from "react";
import Logo from "@/components/organisms/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { Button, Dropdown, MenuProps } from "antd";
import { useTranslation } from "next-i18next";
import { UserOutlined, CaretDownOutlined } from "@ant-design/icons";

type NavbarProps = {
  navbarShadow?: boolean;
  navbarStatic?: boolean;
  activePage?: string;
  redirectNavbar?: boolean;
};

const SPACE = 40;

const Navbar = ({
  navbarShadow,
  navbarStatic,
  activePage,
  redirectNavbar,
}: NavbarProps) => {
  const { t: translate } = useTranslation("common");
  const { user, logout } = useAuth();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [toggleNav, setToggleNav] = useState<boolean>(false);

  const toggleNavbar = () => {
    setToggleNav(!toggleNav);
  };
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (route: string) => {
    router.push(route);
    setActiveLink(route);
  };

  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setToggleNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const navbar = document.querySelector(".kafala-navbar");
    const body = document.querySelector("body");
    const pagePath = router?.pathname;

    if (navbar && body && !navbarStatic && pagePath == "/") {
      const navbarRect = navbar.getBoundingClientRect();
      body.style.paddingTop = `${navbarRect.height}px`;
    }
    if (body && navbarStatic && pagePath != "/") {
      body.style.paddingTop = "0px";
    }
  }, [windowWidth, router]);

  const closeNavbar = () => {
    setToggleNav(false);
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: translate("NAV_PROFILE"),
      onClick: () => router.push("/profile"),
    },
    {
      key: "logout",
      label: translate("NAV_LOGOUT"),
      onClick: logout,
    },
  ];

  return (
    <>
      <nav
        className={`kafala-navbar bg-transparent py-2 ${
          navbarStatic && "!static"
        } ${navbarShadow && "shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)]"}`}
      >
        <div className="container relative">
          <div className="mx-auto flex w-[100%] items-center justify-between">
            <div className="navbar-item-wrapper flex w-[20%] items-center justify-between">
              <Logo />
            </div>

            <button
              onClick={() => toggleNavbar()}
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-transparent xl:hidden dark:text-white dark:hover:bg-transparent dark:focus:ring-transparent"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only"></span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            {/* Actions */}
            <div
              className={`absolute top-[70px] z-50 mt-3 max-h-[0px] w-[100%] items-center overflow-hidden rounded-md bg-transparent xl:static xl:mt-0 xl:max-h-[100%] xl:rounded-none ${
                toggleNav
                  ? "navbarToggled m-auto !max-h-[999px] w-[100%] overflow-auto bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04),4px_0px_4px_0px_rgba(0,0,0,0.04)] transition-[max-height] duration-500 ease-in-out"
                  : ""
              }`}
            >
              <div
                className="grow items-center justify-between gap-3 xl:flex"
                id="navbar-default"
              >
                <div className="block w-full items-center justify-between p-4 xl:flex xl:p-0 xl:pr-2">
                  {user && (
                    <div className="flex flex-1 justify-center">
                      <ul
                        className={`${
                          toggleNav ? "smallScreenUi block" : "navMenu xl:flex"
                        }`}
                      >
                        <li className="cursor-not-allowed">
                          <a
                            className={
                              activeLink === "/kafeel/home"
                                ? "activeLink"
                                : ""
                            }
                            onClick={() => handleLinkClick("/kafeel/home")}
                          >
                            {translate("HOME")}
                          </a>
                        </li>
                        <li>
                          <a
                            className={
                              activeLink === "/children/classification"
                                ? "activeLink"
                                : ""
                            }
                            onClick={() =>
                              handleLinkClick("/children/classification")
                            }
                          >
                            {translate("CHILDRENS")}
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                  <div className="ms-auto flex items-center gap-4">
                    <div className="actions m-auto mb-3 mt-3 flex items-center gap-4 text-center">
                      {user ? (
                        <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                          <Button
                          type="text"
                            icon={<UserOutlined style={{ fontSize: '18px' }}/>}
                            className="btn-login h-[40px] min-w-[100px] !border-none !text-white !outline-none duration-300 !bg-transparent !shadow-none !outline-none flex items-center gap-2"
                          >
                            {translate("ACCOUNT")}
                            <CaretDownOutlined />
                          </Button>
                        </Dropdown>
                      ) : (
                        <>
                          <Button
                            onClick={() => router.push("/login")}
                            className="btn-login h-[40px] min-w-[100px] border border-solid !border-white bg-transparent !text-white !outline-none duration-300 hover:bg-white hover:!text-kafalaPrimary"
                          >
                            {translate("NAV_LOGIN")}
                          </Button>
                          <Button
                            onClick={() => router.push("/signup")}
                            className="btn-login h-[40px] min-w-[100px] border border-solid !border-white bg-white !text-kafalaPrimary !outline-none duration-300 hover:!bg-transparent hover:!text-white"
                          >
                            {translate("NAV_SIGNUP")}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;