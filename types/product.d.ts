export type Product = {
    data: ProductData[];
    meta: Meta;
}

export type ProductData = {
    id: number;
    attributes?: Attributes;
}

export type Attributes = {
    name?: string;
    subtitle?: string;
    price?: number;
    description?: string;
    size?: Size;
    original_price?: number;
    slug?: string;
    createdAt?: Date;
    updatedAt?: Date;
    publishedAt?: Date;
    thumbnail: Thumbnail;
}

export type Size = {
    data: SizeData;
}

export type SizeData = {
    size?: string;
    enabled?: boolean;
}

export type Meta = {
    pagination?: Pagination;
}

export type Pagination = {
    page?: number;
    pageSize?: number;
    pageCount?: number;
    total?: number;
}

type Thumbnail = {
    data: {
        id: number;
        attributes: {
            url: string
        }
    }
}