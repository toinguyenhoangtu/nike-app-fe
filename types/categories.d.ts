export interface Category {
    data: DataCategory[]
  }
  
  export interface DataCategory {
    id: number
    attributes: Attributes
  }
  
  export interface Attributes {
    name: string
    slug?: string
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
  }
  