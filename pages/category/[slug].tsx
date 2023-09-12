import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import { useRouter } from "next/router";
import { CategoryData, DataCategory } from 'types/categories';
import { Product } from 'types/product';

import { fetchDataPagination, fetchDataQuerySlug, getAllCategories } from '@services/category/category';
import Wrapper from '@components/Wrapper/Wrapper';
import BreardCumb from '@components/BreardCumb/BreardCumb';

const maxResult = 3;
type IProp = {
  category: DataCategory,
  products: Product,
  slug: string
}
export async function getStaticProps({ params: { slug } }: any) {
  try {
    const category = await fetchDataQuerySlug(slug);
    const products = await fetchDataPagination(slug, maxResult);
    return {
      props: {
        category,
        products,
        slug
      },
      revalidate: 60 * 10
    }
  } catch (error) {
    return {
      props: {
        notFound: true,
      }
    }
  }
}

export async function getStaticPaths() {
  try {
    const categories = await getAllCategories(); // A hypothetical function to fetch all categories

    const paths = categories?.data?.map((c) => ({
      params: {
        slug: c.attributes?.slug,
      }
    }));

    return {
      paths,
      fallback: false
    };
  } catch (error) {
    return {
      props: {
        notFound: true,
      }
    }
  }
}


export default function Category({ category, products, slug }: IProp) {
  const [pageIndex, setPageIndex] = useState<number>(1)
  const { query } = useRouter()
  const { data, error, isLoading } = useSWR(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
    getAllCategories
  );

  useEffect(() => {
    setPageIndex(1)
  }, [query])

  return (
    <div className="w-full md:py-10 relative">
      <Wrapper>
        <BreardCumb key={category.id}  />
      </Wrapper>
    </div>
  )
}
