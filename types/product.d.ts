import { CategoryData } from "./categories";

declare namespace NKResponse.CMS {

    interface Product {
        data: ProductData[];
        meta: Meta;
    }

    interface ProductData {
        id: number;
        attributes: Attributes;
    }

    interface Attributes {
        categories: CategoryData
        name: string;
        subtitle?: string;
        price: number;
        description?: string;
        size: {
            data: {
                size: string;
                enabled: boolean;
            }[];
        };
        url: string;
        images: Image;
        original_price?: number;
        slug?: string;
        createdAt?: Date;
        updatedAt?: Date;
        publishedAt?: Date;
        thumbnail: Thumbnail;
    }

    interface Size {
        data: SizeData;
    }

    interface Image {
        data: {
            id: number;
            attributes: {
                name: string;
                alternativeText: null | any; // Kiểu dữ liệu của alternativeText chưa rõ ràng
                caption: null | any; // Kiểu dữ liệu của caption chưa rõ ràng
                width: number;
                height: number;
                formats: {
                    large: {
                        ext: string;
                        url: string;
                        hash: string;
                        mime: string;
                        name: string;
                        path: null | any; // Kiểu dữ liệu của path chưa rõ ràng
                        size: number;
                        width: number;
                        height: number;
                        provider_metadata: {
                            public_id: string;
                            resource_type: string;
                        };
                    };
                    small: {
                        ext: string;
                        url: string;
                        hash: string;
                        mime: string;
                        name: string;
                        path: null | any; // Kiểu dữ liệu của path chưa rõ ràng
                        size: number;
                        width: number;
                        height: number;
                        provider_metadata: {
                            public_id: string;
                            resource_type: string;
                        };
                    };
                    medium: {
                        ext: string;
                        url: string;
                        hash: string;
                        mime: string;
                        name: string;
                        path: null | any; // Kiểu dữ liệu của path chưa rõ ràng
                        size: number;
                        width: number;
                        height: number;
                        provider_metadata: {
                            public_id: string;
                            resource_type: string;
                        };
                    };
                    thumbnail: {
                        ext: string;
                        url: string;
                        hash: string;
                        mime: string;
                        name: string;
                        path: null | any; // Kiểu dữ liệu của path chưa rõ ràng
                        size: number;
                        width: number;
                        height: number;
                        provider_metadata: {
                            public_id: string;
                            resource_type: string;
                        };
                    };
                };
                hash: string;
                ext: string;
                mime: string;
                size: number;
                url: string;
                previewUrl: null | any; // Kiểu dữ liệu của previewUrl chưa rõ ràng
                provider: string;
                provider_metadata: {
                    public_id: string;
                    resource_type: string;
                };
                createdAt: string;
                updatedAt: string;
            };
        }[];

    }

    interface SizeData {
        size?: string;
        enabled?: boolean;
    }

    interface Meta {
        pagination: Pagination;
    }

    interface Pagination {
        page?: number;
        pageSize?: number;
        pageCount?: number;
        total: number;
    }

    interface Thumbnail {
        data: {
            id: number;
            attributes: {
                url: string
            }
        }
    }
}

