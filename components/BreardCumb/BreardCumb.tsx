import { Product } from "types/product";
import Link from 'next/link';
import { CategoryData } from "types/categories";

type IProp = {
    props?: Product;
    cateName?: CategoryData;
};
const BreardCumb = ({ props, cateName }: IProp) => {
    return (
        <div className="md:pb-5">
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700">
                            <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                            Home
                        </a>
                    </li>
                    {
                        cateName && cateName?.data?.map(cateName => (
                            <li key={cateName.id} aria-current="page">
                                <div className="flex items-center">
                                    <svg aria-hidden="true"
                                        className="w-6 h-6 text-gray-400 text-sm font-medium"
                                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                    <Link href={`/category/${cateName.attributes.slug}`}>
                                        {cateName.attributes.name}
                                    </Link>
                                </div>
                            </li>
                        ))
                    }

                    {
                        props?.data?.map((cate, index, array) => (
                            <li key={index} aria-current="page">
                                {
                                    index + 1 === array.length && (
                                        <div className="flex items-center">
                                            <svg aria-hidden="true"
                                                className="w-6 h-6 text-gray-400 text-sm font-medium"
                                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                                                {cate?.attributes?.name}
                                            </span>
                                        </div>
                                    )
                                }
                            </li>
                        ))}
                </ol>
            </nav>
        </div >
    )
}
export default BreardCumb