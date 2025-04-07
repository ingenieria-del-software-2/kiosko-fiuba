import useSWR from "swr"
import { apiClient } from "./api-client"
import type { Product, ProductFilters, PaginatedProductResults } from "../types/product"
import { mockLaptopProduct } from "../types/mock-laptop"
import { mockThermosProduct } from "../types/mock-thermos"

// Simulación de una base de datos con productos
const mockProducts: Product[] = [mockLaptopProduct, mockThermosProduct]

// Fetcher function for SWR
const fetcher = (url: string) => apiClient.products.get(url).then((res) => res.data)

export const ProductService = {
  /**
   * Fetch a product by ID
   */
  useProduct: (id: string) => {
    const { data, error, isLoading } = useSWR(id ? `/products/${id}` : null, fetcher)

    return {
      product: data as Product,
      isLoading,
      error: error?.message,
    }
  },

  /**
   * Fetch a product by slug
   */
  useProductBySlug: (slug: string) => {
    const { data, error, isLoading } = useSWR(slug ? `/products/slug/${slug}` : null, fetcher)

    return {
      product: data as Product,
      isLoading,
      error: error?.message,
    }
  },

  /**
   * Search products with filters
   */
  useProductSearch: (filters: ProductFilters = {}) => {
    // Convert filters to query string
    const queryParams = new URLSearchParams()

    if (filters.query) queryParams.append("search", filters.query)
    if (filters.page) queryParams.append("page", filters.page.toString())
    if (filters.limit) queryParams.append("limit", filters.limit.toString())
    if (filters.sortBy) queryParams.append("sort", filters.sortBy)
    if (filters.priceRange?.min) queryParams.append("minPrice", filters.priceRange.min.toString())
    if (filters.priceRange?.max) queryParams.append("maxPrice", filters.priceRange.max.toString())

    // Add category filters
    if (filters.categories && filters.categories.length > 0) {
      filters.categories.forEach((cat) => queryParams.append("category", cat))
    }

    const queryString = queryParams.toString()
    const url = `/products${queryString ? `?${queryString}` : ""}`

    const { data, error, isLoading, mutate } = useSWR(url, fetcher)

    return {
      results: data as PaginatedProductResults,
      isLoading,
      error: error?.message,
      filters,
      updateFilters: (newFilters: Partial<ProductFilters>) => {
        // This will trigger a re-fetch with the new filters
        mutate()
      },
    }
  },

  /**
   * Get related products
   */
  useRelatedProducts: (productId: string, limit = 4) => {
    const { data, error, isLoading } = useSWR(
      productId ? `/products/${productId}/related?limit=${limit}` : null,
      fetcher,
    )

    return {
      relatedProducts: data as Product[],
      isLoading,
      error: error?.message,
    }
  },

  /**
   * Obtiene un producto por su ID
   */
  getProductById: async (id: string): Promise<Product | null> => {
    try {
      // First try to get from API
      const response = await apiClient.products.get(`/products/${id}`)
      return response.data
    } catch (error) {
      console.error("Error fetching product from API:", error)

      // Fallback to mock data if API fails
      const mockProduct = mockProducts.find((product) => product.id === id)
      if (mockProduct) {
        console.log(`Returning mock product for ID: ${id}`)
        return mockProduct
      }

      console.error(`No product found with ID: ${id}`)
      return null
    }
  },

  /**
   * Obtiene un producto por su slug
   */
  getProductBySlug: async (slug: string): Promise<Product | null> => {
    try {
      const response = await apiClient.products.get(`/products/slug/${slug}`)
      return response.data
    } catch (error) {
      console.error("Error fetching product by slug:", error)

      // Fallback to mock data if API fails
      const mockProduct = mockProducts.find((product) => product.slug === slug)
      if (mockProduct) {
        console.log(`Returning mock product for slug: ${slug}`)
        return mockProduct
      }

      return null
    }
  },

  /**
   * Busca productos según los filtros proporcionados
   */
  searchProducts: async (filters: ProductFilters): Promise<PaginatedProductResults> => {
    try {
      const queryParams = new URLSearchParams()

      if (filters.query) queryParams.append("search", filters.query)
      if (filters.page) queryParams.append("page", filters.page.toString())
      if (filters.limit) queryParams.append("limit", filters.limit.toString())
      if (filters.sortBy) queryParams.append("sort", filters.sortBy)
      if (filters.priceRange?.min) queryParams.append("minPrice", filters.priceRange.min.toString())
      if (filters.priceRange?.max) queryParams.append("maxPrice", filters.priceRange.max.toString())

      // Add category filters
      if (filters.categories && filters.categories.length > 0) {
        filters.categories.forEach((cat) => queryParams.append("category", cat))
      }

      const queryString = queryParams.toString()
      const response = await apiClient.products.get(`/products${queryString ? `?${queryString}` : ""}`)
      return response.data
    } catch (error) {
      console.error("Error searching products:", error)
      // Return empty results on error
      return {
        products: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
        filters,
        availableFilters: {
          categories: [],
          brands: [],
          priceRanges: [],
          attributes: {},
        },
      }
    }
  },

  /**
   * Obtiene productos relacionados a un producto específico
   */
  getRelatedProducts: async (productId: string, limit = 4): Promise<Product[]> => {
    try {
      const response = await apiClient.products.get(`/products/${productId}/related?limit=${limit}`)
      return response.data
    } catch (error) {
      console.error("Error fetching related products:", error)
      return []
    }
  },

  getInventory: async (productId: string) => {
    try {
      const response = await apiClient.products.get(`/inventory/${productId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching inventory:", error)
      return null
    }
  },

  getCategories: async () => {
    try {
      const response = await apiClient.products.get("/categories")
      return response.data
    } catch (error) {
      console.error("Error fetching categories:", error)
      return []
    }
  },

  getCategoryTree: async () => {
    try {
      const response = await apiClient.products.get("/categories/tree")
      return response.data
    } catch (error) {
      console.error("Error fetching category tree:", error)
      return []
    }
  },

  /**
   * Obtiene los productos más vendidos
   */
  getBestSellingProducts: async (limit = 10): Promise<Product[]> => {
    return [...mockProducts].sort((a, b) => b.soldCount - a.soldCount).slice(0, limit)
  },

  /**
   * Obtiene los productos mejor valorados
   */
  getBestRatedProducts: async (limit = 10): Promise<Product[]> => {
    return [...mockProducts].sort((a, b) => b.rating.average - a.rating.average).slice(0, limit)
  },

  /**
   * Obtiene los productos más recientes
   */
  getNewestProducts: async (limit = 10): Promise<Product[]> => {
    return [...mockProducts].sort((a, b) => b.publishedAt!.getTime() - a.publishedAt!.getTime()).slice(0, limit)
  },

  /**
   * Obtiene un producto aleatorio (útil para demostraciones)
   */
  getRandomProduct: async (): Promise<Product | null> => {
    if (mockProducts.length === 0) return null
    const randomIndex = Math.floor(Math.random() * mockProducts.length)
    return mockProducts[randomIndex]
  },
}

