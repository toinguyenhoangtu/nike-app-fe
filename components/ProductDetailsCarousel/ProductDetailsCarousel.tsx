import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Product } from 'types/product'
import Image from "next/image";

type IProp = {
    data: Product;
};
const ProductDetailsCarousel = ({ data }: IProp) => {
    const image = data?.data[0]?.attributes.images;
    if (!image) return null;

    return (
        <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
            <Carousel
                showArrows={true} showThumbs={true}
                infiniteLoop={true}
                showIndicators={false}
                showStatus={false}
                thumbWidth={60}
                className="productCarousel"
            >
                {
                    image?.data?.map((image, index) => (
                        <div key={index}>
                            <img
                                src={image?.attributes?.url || ''}
                                alt={image?.attributes?.name || ''}
                                loading="lazy"
                            />
                        </div>
                    ))
                }
            </Carousel>
        </div>
    );
}

export default ProductDetailsCarousel