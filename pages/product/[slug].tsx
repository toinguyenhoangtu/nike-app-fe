import { fetchProductEqual, fetchProductNotEqual, getAllProduct } from "@services/product/product";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from "@components/Wrapper/Wrapper";
import ProductDetailsCarousel from "@components/ProductDetailsCarousel/ProductDetailsCarousel";
import { getDiscountedPricePercentage } from "@helpers/promotion";
import RelativedProduct from "@components/RelativedProduct/RelativedProduct";
import LayoutTransition from "@components/LayoutTransition/LayoutTransition";
import Breadscrumb, { RouteItem } from "@components/BreadscrumbV2";
import { useDispatch } from "react-redux";
import { NKResponse } from "types/product";
import { addToCart } from "@redux/cart";
type IProp = {
    product: NKResponse.CMS.Product;
    products: NKResponse.CMS.Product;
    slug: string;
};
const initalState: NKResponseCart.CartItem = {
    id: 0,
    attributes: {
        name: '',
        price: 0,
        createdAt: '',
        updatedAt: '',
    },
    quantity: 0,
    oneQuantityPrice: 0
};
export async function getStaticPaths() {
    try {
        const products = await getAllProduct();
        const paths = products?.data?.map((product) => ({
            params: {
                slug: product.attributes?.slug,
            },
        }));

        return {
            paths,
            fallback: false,
        }

    } catch (error) {
        return {
            props: {
                notFound: true,
            },
        };
    }
}
export async function getStaticProps({ params: { slug } }: any) {
    try {
        const [product, products] = await Promise.all([
            fetchProductEqual(slug),
            fetchProductNotEqual(slug)
        ]);

        return {
            props: {
                product,
                products,
            },
            revalidate: 60 * 10,
        };
    } catch (error) {
        return {
            props: {
                notFound: true,
            },
        };
    }
}
export default function ProductDetail({ product, products }: IProp) {
    const router = useRouter();
    const query = router.query.slug;
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [showError, setShowError] = useState<boolean>(false);
    const [dataSubmit, setDataSubmit] = useState(initalState);
    const attr = product?.data?.[0]?.attributes?.categories;
    const data = product?.data?.[0]?.attributes;
    const getIDProduct = product?.data?.[0].id

    if (!data && attr) return null;
    const breadScrumbList: RouteItem[] = [
        {
            title: query,
            slug: ''
        }
    ];
    const dispatch = useDispatch();
    const handlerDispatch = async (event: React.MouseEvent) => {
        event.preventDefault()
        if (!selectedSize) {
            setShowError(true);
            document.getElementById("scrollTo")?.scrollIntoView({
                block: 'center',
                behavior: 'smooth'
            });
        }
        const addDataCart = await dispatch(
            addToCart(
                {
                    ...dataSubmit,
                    id: getIDProduct,
                    selectedSize,
                    oneQuantityPrice: data.price,
                }
            ))

    }

    useEffect(() => {
        setSelectedSize('')
        return () => setSelectedSize('');
    }, [router])
    return (
        <div className="w-full md:py-10">
            <ToastContainer />
            <Wrapper>
                <Breadscrumb routes={breadScrumbList} />
                <LayoutTransition>
                    <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                        <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                            <ProductDetailsCarousel data={product} />
                        </div>
                        <form className="flex-[1] py-3">
                            <div className="text-[28px] font-semibold mb-2 leading-tight">
                                {data.name}
                            </div>

                            <div className="text-lg font-semibold mb-5">
                                {data.price}
                            </div>

                            <div className="text-lg font-semibold mb-5">
                                {data.subtitle}
                            </div>
                            <div className="flex items-center">
                                <p className="mr-2 text-lg font-semibold">
                                    MRP : &#8377;{data.price}
                                </p>
                                {data.original_price ? (
                                    <>
                                        <p className="text-base  font-medium line-through">
                                            &#8377; {data.price}
                                        </p>
                                        <p className="ml-auto text-base font-medium text-green-500">
                                            {getDiscountedPricePercentage(
                                                data.original_price,
                                                data.price
                                            )}
                                            % off
                                        </p>
                                    </>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="text-md font-medium text-black/[0.5]">
                                incl. of taxes
                            </div>
                            <div className="text-md font-medium text-black/[0.5] mb-20">
                                {`(Also includes all applicable duties)`}
                            </div>
                            {/* PRODUCT SIZE RANGE START */}
                            <div className="mb-10">
                                {/* HEADING START */}
                                <div className="flex justify-between mb-2">
                                    <div className="text-md font-semibold">
                                        Select Size
                                    </div>
                                    <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                                        Select Guide
                                    </div>
                                </div>
                                {/* HEADING END */}

                                {/* SIZE START */}
                                <div id="scrollTo" className="grid grid-cols-3 gap-2">
                                    {
                                        data.size?.data.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`border rounded-md text-center py-3 font-medium transition ease-out 
                                            ${item.enabled
                                                        ? "hover:border-black cursor-pointer"
                                                        : "cursor-not-allowed bg-black/[0.1] opacity-50 border-none"}
                                            ${selectedSize === item.size
                                                        ? "border-black"
                                                        : ""
                                                    }`}
                                                onClick={() => {
                                                    setSelectedSize(prevSize => {
                                                        return prevSize === item.size ? '' : item.size;
                                                    });
                                                    setShowError(false);
                                                }}
                                            >
                                                {item.size}
                                            </div>
                                        ))
                                    }
                                </div>
                                {/* SIZE END */}

                                {/* SHOW ERROR START */}
                                {
                                    showError && (
                                        <div className="text-red-600 mt-1">
                                            Size selection is required
                                        </div>
                                    )
                                }
                                {/* PRODUCT SIZE RANGE END */}

                                {/* ADD TO CART BUTTON START */}
                                <button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium  transition active:scale-95 mb-3 mt-3 hover:opacity-75 ease-out"
                                    onClick={(event) => handlerDispatch(event)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* Slider Relative product */}
                    <RelativedProduct products={products} />
                </LayoutTransition>
            </Wrapper>
        </div>
    )
}