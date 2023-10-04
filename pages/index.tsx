import { Banner } from "@components/Banner/Banner";
import ProductCart from "@components/ProductCart/ProductCart";
import Wrapper from "@components/Wrapper/Wrapper";
import { getAllProduct } from "@services/product/product";
import { GetStaticProps } from "next";
import { NKResponse } from "types/product";

type THomePageProps = {
  products: NKResponse.CMS.Product
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const products = await getAllProduct();
    return {
      props: {
        products
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

export default function Home({ products }: THomePageProps) {
  return (

    <main>
      <Banner />
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Cushioning for Your Miles
          </div>
          <div className="text-md md:text-xl">
            A lightweight Nike ZoomX midsole is combined with
            increased stack heights to help provide cushioning
            during extended stretches of running.
          </div>
        </div>
        {/* heading and paragaph end */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products?.data?.map(product => (
            <ProductCart key={product.id} {...product} />
          ))}
        </div>
      </Wrapper>

    </main>

  )
}

