import { Fragment, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Wrapper from "@components/Wrapper/Wrapper";
import { getAllCategories } from "@services/category/category";
import { BsChevronDown } from "react-icons/bs";
import { DataCategory } from "types/categories";
import { VscChromeClose } from "react-icons/vsc";
import { RxAvatar } from 'react-icons/rx'
import { BiMenuAltRight } from "react-icons/bi";
const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Categories", subMenu: true },
  { id: 4, name: "Contact", url: "/contact" },
];
const Header = () => {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [cateItemMb, setCateItemMb] = useState<boolean>(false);
  const [show, setShow] = useState<string>("translate-y-0");
  const [userName, setUserName] = useState<any>('');
  const [showCatMenu, setShowCatMenu] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [category, setCategory] = useState<DataCategory[]>([]);

  const controlNavBar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      }
      setShow("shadow-sm");
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavBar);
    return () => {
      window.removeEventListener("scroll", controlNavBar);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCategories();
        setCategory(response.data);
      } catch (error) {

      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fillDataUser = () => {
  //     if (typeof window !== "undefined") {
  //       const userName = localStorage.getItem('NikeUser');
  //       return userName
  //     }
  //   }
  //   const data = fillDataUser();
  //   setUserName(data)
  // }, []);

  /** Render MenuCate */
  const renderMenu = () => {

    if (!Array.isArray(data) || data.length === 0) return null;

    return data.map(item => {
      if (item.subMenu) {
        return (
          <li
            key={item.id}
            className="cursor-pointer flex items-center gap-2 relative"
            onMouseEnter={() => setShowCatMenu(true)}
            onMouseLeave={() => setShowCatMenu(false)}
          >
            {item.name}
            <BsChevronDown size={14} />
            {showCatMenu && (
              <ul className="bg-white absolute top-6 min-w-[250px] px-1 text-black shadow-lg transition-transform">
                {category?.map((el) => {
                  return (
                    <Link
                      key={el.id}
                      href={`/category/${el.attributes.slug}`}
                    >
                      <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.3] transition hover:duration-75">
                        {el.attributes.name}
                        <span className="opacity-50 text-s">
                          {el.attributes.products?.data?.length}
                        </span>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            )}
          </li>
        )
      }

      return <Link key={item.id} href={item.url || '#'}>{item.name}</Link>

    })
  }

  const renderMenuMobile = () => {
    if (!Array.isArray(data) || data.length === 0) return null;
    return data.map((items) => {
      return (
        <Fragment key={items.id}>
          {!!items.subMenu ? (
            <li
              className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
              onClick={() => setCateItemMb(!cateItemMb)}
            >
              <div className="flex justify-between items-center">
                {items.name}
                <BsChevronDown size={14} />
              </div>
              {cateItemMb && (
                <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
                  {category.map((cate) => {
                    const key = `${cate.attributes.name}-${cate.attributes.products?.data?.length}`; // Create a unique key using a combination of values
                    return (
                      <Link
                        key={key}
                        href={`/category/${cate.attributes.slug}`}
                        onClick={() => {
                          setShowCatMenu(true)
                          setMobileMenu(false)
                        }}
                      >
                        <li className="py-4 px-8 border-t flex justify-between">
                          {cate.attributes.name}
                          <span className="opacity-50 text-sm">{cate.attributes.products?.data?.length}</span>
                        </li>
                      </Link>
                    )
                  })
                  }
                </ul>
              )
              }
            </li>
          ) : (
            <li className="py-4 px-5 border-b">
              <Link href={`${items.url}`} onClick={() => setMobileMenu(false)}>
                {items.name}
              </Link>
            </li>
          )}
        </Fragment>
      );
    })
  }
  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
        <Link href="/">
          <img
            className="w-[40px] md:w-[60px]"
            src="/logo.svg"
            alt="logo-nike"
          />
        </Link>
        <ul className="hidden md:flex items-center gap-8 font-medium text-black">
          {renderMenu()}
        </ul>


        {/* Mobile menu */}
        {mobileMenu && (
          <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
            {renderMenuMobile()}
          </ul>
        )}
        <div className="flex items-center gap-2 text-black">
          {/* Icon start */}
          <ul>
            {
              // userName ? (
              //   <div>
              //     <div id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-black focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-blue-800">{userName}<svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              //       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
              //     </svg>
              //     </div>
              //     {/* Dropdown menu */}
              //     <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              //       <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              //         <li>
              //           <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
              //         </li>
              //         <li>
              //           <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
              //         </li>
              //         <li>
              //           <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
              //         </li>
              //         <li>
              //           <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
              //         </li>
              //       </ul>
              //     </div>
              //   </div>


              // ) : (
              //   <li>
              //     <Link
              //       href={'/user/login'}
              //       className="w-[40px] md:w-[60px] h-8 md:h-12 rounded-md flex justify-center items-center hover:bg-black/[0.05] transition-all "
              //     >
              //       <div className="w-8 md:w-12 h-8 md:h-12 flex justify-center items-center">
              //         <RxAvatar className="text-[19px] md:text-[24px]" />
              //       </div>
              //       {/* <div className="w-8 md:w-12 h-8 md:h-12 text-[14px]  flex justify-center items-center md:text-[14px]">Tú</div> */}
              //     </Link>
              //   </li>
              // )
            }
            <Link
              href={'/user/login'}
              className="w-[40px] md:w-[60px] h-8 md:h-12 rounded-md flex justify-center items-center hover:bg-black/[0.05] transition-all "
            >
              <div className="w-8 md:w-12 h-8 md:h-12 flex justify-center items-center">
                <RxAvatar className="text-[19px] md:text-[24px]" />
              </div>
              {/* <div className="w-8 md:w-12 h-8 md:h-12 text-[14px]  flex justify-center items-center md:text-[14px]">Tú</div> */}
            </Link>
          </ul>
          {/* Icon end */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => {
                  setMobileMenu(false)
                }}
              />
            ) : (
              <BiMenuAltRight
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )
            }
          </div>
        </div>
      </Wrapper>
    </header>
  );
};
export default Header;
