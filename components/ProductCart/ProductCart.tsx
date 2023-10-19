import { getDiscountedPricePercentage } from '@helpers/promotion'
import Link from 'next/link'
import React from 'react'
import { NKResponse } from 'types/product'
const ProductCart = (props: NKResponse.CMS.ProductData) => {
    const { attributes } = props;
    if (!attributes) return null;
    return (
        <div className='relative h-full p-2 bg-white border-spacing-3 transition-all rounded-xl '>
            <Link
                className='transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer shadow-md rounded-lg'
                href={`/product/${attributes?.slug}`}
            >
                <img
                    className='w-full'
                    src={attributes?.thumbnail?.data?.attributes?.url || ''}
                    width={500}
                    height={500}
                    loading='lazy'
                    alt={attributes?.name || ''}
                />
                <div className='p-2 text-black/[0.9]'>
                    <h2 className='text-base font-bold'>{attributes.name}</h2>
                    <div className='flex flex-wrap justify-between items-center text-black/[0.5]'>
                        <p className="mr-2 text-lg font-semibold">
                            &#8377;{attributes?.price}
                        </p>

                        {(attributes?.original_price && attributes?.price) ? (
                            <>
                                <p className="text-base  font-medium line-through">
                                    &#8377;{attributes.original_price}
                                </p>
                                <p className="ml-auto text-base font-medium text-green-500">
                                    {getDiscountedPricePercentage(
                                        attributes?.original_price,
                                        attributes?.price
                                    )}
                                    % off
                                </p>
                            </>
                        ) : null}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProductCart;
