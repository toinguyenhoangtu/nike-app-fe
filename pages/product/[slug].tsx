import { fetchProductEqual, fetchProductNotEqual, getAllProduct } from "@services/product/product";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Product } from "types/product";
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from "@components/Wrapper/Wrapper";
import BreardCumb from "@components/BreardCumb/BreardCumb";

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
    const [selectedSize, setSelectedSize] = useState<number>();
    const [showError, setShowError] = useState<boolean>(false);

    const cateName = product?.data?.[0]?.attributes?.categories;

    return (
        <div className="w-full md:py-10">
            <ToastContainer />
            <Wrapper>
                <BreardCumb props={product} cateName={cateName}  />
            </Wrapper>
        </div>
    )
}