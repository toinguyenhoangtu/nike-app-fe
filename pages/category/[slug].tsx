import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CategoryData } from "types/categories";
import { filterCategory, getAllCategories } from "@services/category/category";
import Wrapper from "@components/Wrapper/Wrapper";
import ProductCart from "@components/ProductCart/ProductCart";
import { Pagination } from "antd";
import { ToggleCustom } from "@components/Toggle/ToggleCustom";
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext
} from 'next'
import {
  ProductFilter,
  ProductFilterPage,
} from "@services/product/product";
import LayoutTransition from "@components/LayoutTransition/LayoutTransition";
import { NKResponse } from "types/product";
import Breadscrumb, { RouteItem } from "@components/BreadscrumbV2";
import useToggle from "@hooks/useToggle";

const maxResult = 4;

type IProp = {
  category: CategoryData;
  products: NKResponse.CMS.Product;
  slug: string;
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  try {
    const { params } = context;
    if (!params) {
      throw new Error('Params are undefined');
    }
    const slug = params.slug as string;
    console.log('slug: ' + slug);

    const category = await filterCategory(slug);
    const products = await ProductFilterPage(slug, maxResult);
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
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const categories = await getAllCategories();
    const paths = categories?.data?.map((category) => ({
      params: {
        slug: category.attributes?.slug || "",
      },
    }));

    return {
      paths: paths || [], // Make sure to handle the case when paths is undefined
      fallback: false,
    };
  } catch (error) {
    return {
      paths: [], // Handle error case by returning an empty array
      fallback: false,
    };
  }
};

export default function Category({ category, products, slug }: IProp) {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [classChange, setClassChange] = useState<string>('lg:grid-cols-4')
  const router = useRouter();
  const query = router.query.slug;
  const { response, error, isLoading } = ProductFilter(
    slug,
    pageIndex,
    maxResult,
    products
  );
  const breadScrumbList: RouteItem[] = [
    {
      title: query,
      slug: ''
    }
  ]

  useEffect(() => {
    setPageIndex(1);
  }, [query]);

  useEffect(() => {
    setClassChange;
  }, []);

  if (!response || response.data?.length <= 0) return null;
  const total = response.meta.pagination.total;
  return (
    <div className="w-full md:py-10 relative">
      <Wrapper>
        <Breadscrumb routes={breadScrumbList} />
        <LayoutTransition>
          <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
            <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
              {category?.data?.[0]?.attributes?.name}
            </div>
            <ToggleCustom setClassChange={setClassChange} />
            <div className={`grid grid-cols-1 md:grid-cols-2 ${classChange} gap-5 my-14 px-5 md:px-0`}>
              {response?.data.map((product) => (
                <ProductCart
                  key={product.id}
                  {...product}
                />
              ))}
            </div>
            {total > maxResult && (
              <Pagination
                current={pageIndex}
                total={total || 0}
                pageSize={4}
                onChange={(page) => setPageIndex(page)}
                className="nike-pagination"
              />
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
        </LayoutTransition>
      </Wrapper>

    </div>


  );
}
