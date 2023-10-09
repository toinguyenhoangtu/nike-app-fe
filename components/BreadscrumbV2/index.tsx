import Link from 'next/link';
import React from 'react'

// Proxy Component --> Meaning reuseable Component

type RouteItem = {
    title: string;
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
        <ol>
            {
                compoundRoutes.map((route, idx, thisArr) => {
                    const lastRoute = idx === thisArr.length - 1
                    if (lastRoute) {
                        return (
                            <li key={idx}>
                                {route.title}
                            </li>
                        )
                    }
                    return (
                        <li key={idx}>
                            <Link href={route.slug}>
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