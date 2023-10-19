declare namespace NKResponse.SearchService {
  interface CategoryOnProductBasic {
    id: number
    name?: string
    parentName?: any
    level?: number
    slug?: string
    isActive?: boolean
  }

  interface ProductBasic {
    sku: string
    webName: string
    name: string
    image: string
    slug: string
    productRanking: number
    displayCode: number
    price: Price | null
    specification: string
    inventory?: number
    category?: CategoryOnProductBasic[]
    ingredients?: string
  }
  interface CategoryBasic {
    id: number
    name: string
    fullPathSlug: string
    countProduct: number
  }
  interface ProductCategory {
    id: number
    name: string
    parentName: string | null
    level: number
    slug: string
  }
  interface BestSeller extends ProductBasic {}
  interface ListProduct extends ProductBasic {}
  interface ProductByCategorySlug extends ProductBasic {
    category: ProductCategory[]
  }
  interface Aggregation {
    code: string
    values: string[]
  }
  interface ListProductByCategorySlug {
    totalCount?: number | null
    products?: ProductByCategorySlug[] | null
    aggregations?: Aggregation[] | null
  }
  interface ListCategory extends CategoryBasic {}
  interface ProductSearchDetail extends ProductBasic {
    ingredients: string
    dosageForm: any
    displayCode: number
    isActive: boolean
    isPublish: boolean
    searchScoring: string
  }
  interface PriceSystem {
    priceFrom: number
    priceTo: number
  }
  interface Aggregation {
    code: string
    values: string[]
  }
  interface SearchDetail {
    totalCount: number
    products: ProductSearchDetail[]
    aggregations: Aggregation[] | null
  }
  interface FilterObject extends ProductBasic {
    totalCount: number
    items: ProductBasic[]
  }

  interface Price {
    measureUnitCode: number
    measureUnitName: string
    price: number
    discount?: LCResponse.Promotions.DiscountPromotion | null
    currencySymbol: string
  }

  interface SearchSuggest {
    keywords: SearchSuggestKeyword[] | null
    categories: any[] | null
    products: SearchSuggestProduct[] | null
  }

  interface SearchSuggestKeyword {
    keyword: string
  }

  interface SearchSuggestProduct extends ProductBasic {}

  interface Posts {
    totalCount: number
    items: PostItem[]
  }

  interface PostItemCategory {
    name: string
    nameEng: string
    slug: string
  }
  interface PostItem {
    id: number
    name: string
    shortDescription: string
    image?: any
    slug: string
    category: PostItemCategory
    type: string
    isPublish: boolean
    isActive: boolean
  }
}
