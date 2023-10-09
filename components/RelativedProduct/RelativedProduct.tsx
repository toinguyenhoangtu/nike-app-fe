import React from 'react'
import { NKResponse } from 'types/product'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCart from '@components/ProductCart/ProductCart';

type Iprop = {
    products: NKResponse.CMS.Product
}

const RelativedProduct = ({ products }: Iprop) => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <div className="mt-[50px] md:mt-[100px] mb-[100px] md:mb-0">
            <div className="text-2xl font-bold mb-5">You Might Also Like</div>
                <Carousel
                responsive={responsive}
                containerClass="-mx-[10px]"
                itemClass="px-[10px]">
                {
                    products?.data?.map((product) =>(
                        <ProductCart key={product.id} {...product}/>
                    ))
                }
                </Carousel>
        </div>
    )
}

export default RelativedProduct