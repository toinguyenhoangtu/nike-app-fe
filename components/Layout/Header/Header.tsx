import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Wrapper from "@components/Wrapper/Wrapper";
import { getAllCategories } from "@services/category/category";
import { BsChevronDown } from "react-icons/bs";
import { DataCategory } from "types/categories";
import { VscChromeClose } from "react-icons/vsc";
import { IoMdHeartEmpty } from "react-icons/io";
import { BiMenuAltRight } from "react-icons/bi";


const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Categories", subMenu: true },
  { id: 4, name: "Contact", url: "/contact" },
];

const Header = (): JSX.Element => {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [cateItemMb,setCateItemMb] = useState<boolean>(false);
  const [show, setShow] = useState<string>("translate-y-0");
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
        console.log(error);
      }
    };
    fetchData();
  }, []);


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
          {data.map((items) => {
            return (
              <Fragment key={items.id}>
                {!!items.subMenu ? (
                  <li
                    className="cursor-pointer flex items-center gap-2 relative"
                    onMouseEnter={() => setShowCatMenu(true)}
                    onMouseLeave={() => setShowCatMenu(false)}
                  >
                    {items.name}
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
                ) : (
                  <li className="cursor-pointer">
                    {items.url === "/" ? (
                      <Link href="/">{items.name}</Link>
                    ) : (
                      <Link href={`${items.url}`}>{items.name}</Link>
                    )}
                  </li>
                )}
              </Fragment>
            );
          })}
        </ul>
        {mobileMenu && (
          <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
            {data.map((items) => {
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
                          {category.map((el) => {
                            const key = `${el.attributes.name}-${el.attributes.products?.data?.length}`; // Create a unique key using a combination of values
                            return (
                              <Link
                                key={key}
                                href={`/category/${el.attributes.slug}`}
                                onClick={() => {
                                  setShowCatMenu(true)
                                  setMobileMenu(false)
                                }}
                              >
                                <li className="py-4 px-8 border-t flex justify-between">
                                  {el.attributes.name}
                                  <span className="opacity-50 text-sm">{el.attributes.products?.data?.length}</span>
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
            })}
          </ul>
        )}
        <div className="flex items-center gap-2 text-black">
          {/* Icon start */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] transition-all cursor-pointer relative">
            <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
              51
            </div>
          </div>
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
