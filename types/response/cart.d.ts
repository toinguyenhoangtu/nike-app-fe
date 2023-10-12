declare namespace NKResponseCart {
    interface CartItem {
        id: number;
        attributes: {
            name: string;
            subtitle?: string;
            price: number;
            description?: string;
            size?: {
                data: {
                    size: string;
                    enabled: boolean;
                }[];
            };
            original_price?: null | any; // Kiểu dữ liệu của original_price chưa rõ ràng
            slug?: string;
            createdAt?: string;
            updatedAt?: string;
            publishedAt?: string;
            images?: {
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
            };
            thumbnail?: {
                data: {
                    id: number;
                    attributes: {
                        name: string;
                        alternativeText: null | any; // Kiểu dữ liệu của alternativeText chưa rõ ràng
                        caption: null | any; // Kiểu dữ liệu của caption chưa rõ ràng
                        width: number;
                        height: number;
                        formats: {
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
                };
            };
            categories?: {
                data: {
                    id: number;
                    attributes: {
                        name: string;
                        slug: string;
                        createdAt: string;
                        updatedAt: string;
                        publishedAt: string;
                    };
                }[];
            };
        };
        selectedSize?: string;
        oneQuantityPrice: number;
        quantity: number;
    }
    interface CartErrors {
        customerInfo: CustomerInfoErrors
        deliveryMethod?: string
        region?: {
            home: RegionError
            store: RegionError
        }
        payment?: string
        commitTime?: string
        shop?: string
        shipment?: string
    }
}
