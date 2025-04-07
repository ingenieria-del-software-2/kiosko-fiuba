import type { Product, ProductFilters, PaginatedProductResults } from "../types/product"
import { mockLaptopProduct } from "../types/mock-product"
import { mockThermosProduct } from "../types/mock-thermos"

// Simulación de una base de datos con productos
const mockProducts: Product[] = [mockLaptopProduct, mockThermosProduct]

export const ProductService = {
  /**
   * Obtiene un producto por su ID
   */
  getProductById: async (id: string): Promise<Product | null> => {
    const product = mockProducts.find((p) => p.id === id)
    return product || null
  },

  /**
   * Obtiene un producto por su slug
   */
  getProductBySlug: async (slug: string): Promise<Product | null> => {
    const product = mockProducts.find((p) => p.slug === slug)
    return product || null
  },

  /**
   * Busca productos según los filtros proporcionados
   */
  searchProducts: async (filters: ProductFilters): Promise<PaginatedProductResults> => {
    let filteredProducts = [...mockProducts]

    // Aplicar filtros
    if (filters.query) {
      const query = filters.query.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.brand.name.toLowerCase().includes(query),
      )
    }

    if (filters.categories && filters.categories.length > 0) {
      filteredProducts = filteredProducts.filter((p) => p.categories.some((c) => filters.categories?.includes(c.id)))
    }

    if (filters.brands && filters.brands.length > 0) {
      filteredProducts = filteredProducts.filter((p) => filters.brands?.includes(p.brand.id))
    }

    if (filters.priceRange) {
      if (filters.priceRange.min !== undefined) {
        filteredProducts = filteredProducts.filter((p) => p.price >= (filters.priceRange?.min || 0))
      }
      if (filters.priceRange.max !== undefined) {
        filteredProducts = filteredProducts.filter(
          (p) => p.price <= (filters.priceRange?.max || Number.POSITIVE_INFINITY),
        )
      }
    }

    if (filters.condition && filters.condition.length > 0) {
      filteredProducts = filteredProducts.filter((p) => filters.condition?.includes(p.condition))
    }

    if (filters.freeShipping) {
      filteredProducts = filteredProducts.filter((p) => p.shipping.isFree)
    }

    if (filters.inStock) {
      filteredProducts = filteredProducts.filter((p) => p.stock > 0 && p.isAvailable)
    }

    // Ordenar resultados
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price_asc":
          filteredProducts.sort((a, b) => a.price - b.price)
          break
        case "price_desc":
          filteredProducts.sort((a, b) => b.price - a.price)
          break
        case "newest":
          filteredProducts.sort((a, b) => b.publishedAt!.getTime() - a.publishedAt!.getTime())
          break
        case "best_selling":
          filteredProducts.sort((a, b) => b.soldCount - a.soldCount)
          break
        case "best_rated":
          filteredProducts.sort((a, b) => b.rating.average - a.rating.average)
          break
        // Por defecto, ordenar por relevancia (no hacemos nada)
      }
    }

    // Paginación
    const page = filters.page || 1
    const limit = filters.limit || 20
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

    // Generar filtros disponibles para la interfaz
    const availableFilters = {
      categories: [] as Array<{ id: string; name: string; count: number }>,
      brands: [] as Array<{ id: string; name: string; count: number }>,
      priceRanges: [] as Array<{ min: number; max: number; count: number }>,
      attributes: {} as { [key: string]: Array<{ value: string; count: number }> },
    }

    // En una implementación real, aquí calcularíamos los filtros disponibles
    // basados en los productos filtrados

    return {
      products: paginatedProducts,
      total: filteredProducts.length,
      page,
      limit,
      totalPages: Math.ceil(filteredProducts.length / limit),
      filters,
      availableFilters,
    }
  },

  /**
   * Obtiene productos relacionados a un producto específico
   */
  getRelatedProducts: async (productId: string, limit = 4): Promise<Product[]> => {
    const product = await ProductService.getProductById(productId)
    if (!product) return []

    // En una implementación real, buscaríamos productos de categorías similares
    // o con atributos parecidos
    return mockProducts.filter((p) => p.id !== productId).slice(0, limit)
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

