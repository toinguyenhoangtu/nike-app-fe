export type Product = {
    data: ProductData[];
    meta?: Meta;
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
    originalPrice?: number | null;
    slug?: string;
    createdAt?: Date;
    updatedAt?: Date;
    publishedAt?: Date;
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
