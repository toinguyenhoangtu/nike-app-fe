import { fetchProductEqual, fetchProductNotEqual, getAllProduct } from "@services/product/product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Product } from "types/product";
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from "@components/Wrapper/Wrapper";
import BreardCumb from "@components/BreardCumb/BreardCumb";
import ProductDetailsCarousel from "@components/ProductDetailsCarousel/ProductDetailsCarousel";
import { getDiscountedPricePercentage } from "@helpers/promotion";
import RelativedProduct from "@components/RelativedProduct/RelativedProduct";

type IProp = {
    product: Product;
    products: Product;
    slug: string;
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
    const { query } = useRouter();
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [showError, setShowError] = useState<boolean>(false);
    const attr = product?.data?.[0]?.attributes?.categories;
    const data = product?.data?.[0]?.attributes;
    if (!data) return null;
    useEffect(()=>{
        setSelectedSize('')
        return () => setSelectedSize('');
    },[query])
    return (
        <div className="w-full md:py-10">
            <ToastContainer />
            <Wrapper>
                <BreardCumb props={product} cateName={attr} />
                <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                    <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                        {
                            <ProductDetailsCarousel data={product} />
                        }
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
                        </div>
                    </form>
                </div>
                {/* Slider Relative product */}
                <RelativedProduct products={products} />
            </Wrapper>
        </div>
    )
}