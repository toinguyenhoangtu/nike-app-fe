import Link from 'next/link';
import React from 'react'
import IoIosArrowForward from 'react-icons'
// Proxy Component --> Meaning reuseable Component

type RouteItem = {
    title: string | any;
    slug: string;
}

type BreadscrumbProps = {
    routes: RouteItem[];
}

const homeRoutes = {
    title: 'Home',
    slug: '/'
};

const Breadscrumb = (props: BreadscrumbProps) => {
    const { routes } = props;

    if (routes.length === 0 || !Array.isArray(routes)) return;

    const compoundRoutes = [homeRoutes].concat(routes);

    return (
        <ol className='inline-flex items-center space-x-1 md:space-x-1 font-medium'>
            {
                compoundRoutes.map((route, idx, thisArr) => {
                    const lastRoute = idx === thisArr.length - 1
                    if (lastRoute) {
                        return (
                            <li
                                key={idx}
                                className='inline-flex items-center text-sm font-medium text-gray-400'
                            >
                                <svg aria-hidden="true"
                                    className="w-6 h-6 text-gray-400 text-sm font-medium"
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd">
                                    </path>
                                </svg>
                                {route.title}
                            </li>
                        )
                    }
                    return (
                        <li key={idx}>
                            <Link
                                href={route.slug}
                                className='inline-flex items-center text-sm font-medium text-gray-700'
                            >
                                {route.title}
                            </Link>
                        </li>
                    )
                })
            }
        </ol>
    )
}

export type { BreadscrumbProps, RouteItem };

export default Breadscrumb;