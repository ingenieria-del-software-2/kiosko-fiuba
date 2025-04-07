export interface ProductImage {
  id: string
  url: string
  alt: string
  isMain: boolean
  order: number
}

export interface ProductVideo {
  id: string
  url: string
  thumbnail: string
  title: string
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
  parentId?: string
}

export interface ProductAttribute {
  id: string
  name: string
  value: string
  displayValue?: string
  isHighlighted: boolean
  groupName?: string // Para agrupar atributos relacionados (ej: "Memoria", "Procesador")
}

// Modificar la interfaz ProductVariant para soportar mejor las combinaciones de atributos
export interface ProductVariant {
  id: string
  sku: string
  name: string
  price: number
  compareAtPrice?: number // Precio anterior/tachado
  attributes: {
    [key: string]: string // Por ejemplo: {"RAM": "8GB", "Almacenamiento": "512GB"} o {"Color": "Negro"}
  }
  stock: number
  isAvailable: boolean
  isSelected?: boolean // Indica si esta variante está seleccionada actualmente
  image?: string // URL de la imagen específica para esta variante
  images?: ProductImage[] // Colección de imágenes específicas para esta variante
}

export interface ProductShipping {
  isFree: boolean
  cost?: number
  estimatedDeliveryTime: {
    min: number
    max: number
    unit: "hour" | "day" | "week"
  }
  availableShippingMethods: Array<{
    id: string
    name: string
    cost: number
    estimatedDeliveryTime: {
      min: number
      max: number
      unit: "hour" | "day" | "week"
    }
  }>
}

export interface ProductSeller {
  id: string
  name: string
  isOfficial: boolean
  reputation: {
    level: "platinum" | "gold" | "silver" | "bronze" | "new"
    score: number // 1-5
    totalSales: number
    completedSales: number
    canceledSales: number
    totalReviews: number
  }
  location: string
  responseTime?: {
    value: number
    unit: "minute" | "hour" | "day"
  }
  sellerSince: Date
}

export interface ProductReview {
  id: string
  userId: string
  userName: string
  rating: number // 1-5
  title?: string
  comment: string
  date: Date
  isVerifiedPurchase: boolean
  likes: number
  images?: string[]
  attributes?: Array<{
    name: string
    rating: number
  }>
}

export interface ProductPaymentOption {
  id: string
  type: "credit_card" | "debit_card" | "cash" | "mercado_credit" | "bank_transfer"
  name: string
  installments: Array<{
    quantity: number
    amount: number
    interestRate: number
    totalAmount: number
  }>
}

export interface ProductWarranty {
  hasWarranty: boolean
  length?: number
  unit?: "day" | "month" | "year"
  type?: "seller" | "manufacturer" | "both"
  description?: string
}

export interface ProductPromotion {
  id: string
  type: "discount" | "bundle" | "gift" | "shipping"
  description: string
  discountPercentage?: number
  discountAmount?: number
  validFrom: Date
  validTo: Date
  minimumPurchase?: number
  maximumUses?: number
  couponCode?: string
}

// Agregar una nueva interfaz para las opciones de configuración
export interface ProductConfigOption {
  id: string
  name: string // Nombre de la opción (ej: "RAM", "Sistema operativo", "Color")
  values: Array<{
    id: string
    value: string // Valor de la opción (ej: "8GB", "Windows 11 Home", "Negro")
    displayValue?: string // Valor para mostrar (opcional)
    isAvailable: boolean // Si esta opción está disponible
    isSelected?: boolean // Si esta opción está seleccionada actualmente
    image?: string // URL de imagen para esta opción (útil para colores)
  }>
}

// Modificar la interfaz Product para incluir las opciones de configuración
export interface Product {
  id: string
  sku: string
  title: string
  slug: string
  description: string
  shortDescription?: string
  brand: {
    id: string
    name: string
    logo?: string
  }
  model: string

  // Precios y stock
  price: number
  compareAtPrice?: number // Precio anterior/tachado
  currency: string
  stock: number
  isAvailable: boolean
  isNew: boolean
  isRefurbished: boolean
  condition: "new" | "used" | "refurbished"

  // Categorización
  categories: ProductCategory[]
  tags: string[]

  // Media
  images: ProductImage[]
  videos?: ProductVideo[]

  // Especificaciones técnicas
  attributes: ProductAttribute[]

  // Variantes (diferentes configuraciones)
  hasVariants: boolean
  variants?: ProductVariant[]

  // Envío
  shipping: ProductShipping

  // Vendedor
  seller: ProductSeller

  // Reseñas
  rating: {
    average: number
    count: number
    distribution: {
      "1": number
      "2": number
      "3": number
      "4": number
      "5": number
    }
  }
  reviews: ProductReview[]

  // Opciones de pago
  paymentOptions: ProductPaymentOption[]

  // Garantía
  warranty: ProductWarranty

  // Promociones
  promotions: ProductPromotion[]

  // Estadísticas
  viewCount: number
  soldCount: number
  wishlistCount: number

  // Fechas
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date

  // SEO
  seo: {
    title?: string
    description?: string
    keywords?: string[]
  }

  // Información adicional
  additionalInformation?: {
    [key: string]: any
  }

  // Productos relacionados
  relatedProducts?: string[] // IDs de productos relacionados

  // Preguntas y respuestas
  questions: Array<{
    id: string
    userId: string
    userName: string
    question: string
    answer?: {
      text: string
      date: Date
    }
    date: Date
  }>

  // Agregar campo para opciones de configuración
  configOptions?: ProductConfigOption[]

  // Método para obtener variantes compatibles con una selección de atributos
  getCompatibleVariants?: (selectedAttributes: Record<string, string>) => ProductVariant[]

  // Método para obtener la variante que coincide exactamente con los atributos seleccionados
  getVariantByAttributes?: (selectedAttributes: Record<string, string>) => ProductVariant | undefined

  // Tipo de producto (para manejar diferentes tipos de productos)
  productType?: "simple" | "configurable" | "bundle" | "virtual"

  // Características destacadas (bullets)
  highlightedFeatures?: string[]
}

// Ejemplo de uso para un producto específico
export interface LaptopProduct extends Product {
  attributes: (ProductAttribute & {
    // Atributos específicos para laptops
    processor?: string
    ram?: string
    storage?: string
    graphicsCard?: string
    screenSize?: string
    screenResolution?: string
    operatingSystem?: string
    batteryLife?: string
    weight?: string
    ports?: string[]
    wirelessConnectivity?: string[]
  })[]
}

// Tipo para productos simples como termos, ropa, etc.
export interface SimpleProduct extends Product {
  // Propiedades específicas para productos simples
  size?: string
  color?: string
  material?: string
  weight?: string
  dimensions?: {
    height: number
    width: number
    depth: number
    unit: "cm" | "mm" | "in"
  }
  capacity?: string
}

// Tipo para filtros de búsqueda de productos
export interface ProductFilters {
  query?: string
  categories?: string[]
  priceRange?: {
    min?: number
    max?: number
  }
  brands?: string[]
  condition?: ("new" | "used" | "refurbished")[]
  freeShipping?: boolean
  inStock?: boolean
  attributes?: {
    [key: string]: string[]
  }
  rating?: number
  sortBy?: "relevance" | "price_asc" | "price_desc" | "newest" | "best_selling" | "best_rated"
  page?: number
  limit?: number
}

// Tipo para resultados de búsqueda paginados
export interface PaginatedProductResults {
  products: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
  filters: ProductFilters
  availableFilters: {
    categories: Array<{ id: string; name: string; count: number }>
    brands: Array<{ id: string; name: string; count: number }>
    priceRanges: Array<{ min: number; max: number; count: number }>
    attributes: {
      [key: string]: Array<{ value: string; count: number }>
    }
  }
}

