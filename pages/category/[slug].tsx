import React, { useEffect,useState } from "react";
import { useRouter } from "next/router";
import { CategoryData } from "types/categories";
import { Product } from "types/product";
import { filterCategory, getAllCategories } from "@services/category/category";
import Wrapper from "@components/Wrapper/Wrapper";
import BreardCumb from "@components/BreardCumb/BreardCumb";
import ProductCart from "@components/ProductCart/ProductCart";
import {
  useProductFilter,
  useProductFilterPage,
} from "@services/product/product";

const maxResult = 3;
type IProp = {
  category: CategoryData;
  products: Product;
  slug: string;
};
export async function getStaticProps({ params: { slug } }: any) {
  try {
    const category = await filterCategory(slug);

    const products = await useProductFilterPage(slug, maxResult);
    return {
      props: {
        category,
        products,
        slug,
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

export async function getStaticPaths() {
  try {
    const categories = await getAllCategories(); // A hypothetical function to fetch all categories
    const paths = categories?.data?.map((c) => ({
      params: {
        slug: c.attributes?.slug,
      },
    }));
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    return {
      props: {
        notFound: true,
      },
    };
  }
}
export default function Category({ category, products, slug }: IProp) {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const { query } = useRouter();
  const { response, error, isLoading } = useProductFilter(
    slug,
    pageIndex,
    maxResult,
    products
  );

  useEffect(() => {
    setPageIndex(1);
  }, [query]);

  if (!response || response.data?.length <= 0) return null;
  if (!response || response.meta.pagination == undefined) return null;

  return (
    <div className="w-full md:py-10 relative">
      <Wrapper>
        <BreardCumb cateName={category} />
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {category?.data?.[0]?.attributes?.name}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
            {response?.data.map((p) => (
              <ProductCart key={p.id} {...p} />
            ))}
          </div>
          {response?.meta?.pagination?.total > maxResult && (
            <div className="flex gap-3 items-center justify-center my-16 md:my-0">
              <button
                className="rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500"
                disabled={pageIndex === 1}
                onClick={() => setPageIndex(pageIndex - 1)}
              >
                Previous
              </button>
              <span className="font-bold">
                {`${pageIndex} of ${response && response.meta.pagination.pageCount
                  }`}
              </span>
              <button
                className="rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500"
                disabled={pageIndex === response.meta.pagination.pageCount}
                onClick={() => setPageIndex(pageIndex + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
        {
          isLoading && (
            <div className="logo-custom absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
              <img src="/logo.svg" width={150} />
              <span className="text-2xl font-medium">Loading...</span>
            </div>
          )
        }
      </Wrapper>
    </div>
  );
}
