import type {
  Product,
  ProductImage,
  ProductAttribute,
  ProductShipping,
  ProductSeller,
  ProductReview,
  ProductPaymentOption,
  ProductWarranty,
  ProductPromotion,
  ProductConfigOption,
  ProductVariant,
} from "./product"

// Modificar las imágenes para cada variante de color
const blackImages: ProductImage[] = [
  {
    id: "img-black-1",
    url: "/images/stanley-black.png",
    alt: "Termo Stanley Clásico 1.4lts Negro - Vista principal",
    isMain: true,
    order: 1,
  },
  {
    id: "img-black-2",
    url: "/images/stanley-black-specs.png",
    alt: "Termo Stanley Clásico 1.4lts Negro - Especificaciones",
    isMain: false,
    order: 2,
  },
  {
    id: "img-black-3",
    url: "/images/stanley-black-open.png",
    alt: "Termo Stanley Clásico 1.4lts Negro - Con tapa abierta",
    isMain: false,
    order: 3,
  },
]

const greenImages: ProductImage[] = [
  {
    id: "img-green-1",
    url: "/images/stanley-green.png",
    alt: "Termo Stanley Clásico 1.4lts Verde - Vista principal",
    isMain: true,
    order: 1,
  },
  {
    id: "img-green-2",
    url: "/images/stanley-green-specs.png",
    alt: "Termo Stanley Clásico 1.4lts Verde - Especificaciones",
    isMain: false,
    order: 2,
  },
  {
    id: "img-green-3",
    url: "/images/stanley-green-close.png",
    alt: "Termo Stanley Clásico 1.4lts Verde - Vista detalle",
    isMain: false,
    order: 3,
  },
]

const pinkImages: ProductImage[] = [
  {
    id: "img-pink-1",
    url: "/images/stanley-pink.png",
    alt: "Termo Stanley Clásico 1.4lts Rosa - Vista principal",
    isMain: true,
    order: 1,
  },
  {
    id: "img-pink-2",
    url: "/images/stanley-pink-specs.png",
    alt: "Termo Stanley Clásico 1.4lts Rosa - Especificaciones",
    isMain: false,
    order: 2,
  },
  {
    id: "img-pink-3",
    url: "/images/stanley-pink-open.png",
    alt: "Termo Stanley Clásico 1.4lts Rosa - Vista detalle",
    isMain: false,
    order: 3,
  },
]

// Atributos del producto
const productAttributes: ProductAttribute[] = [
  {
    id: "attr1",
    name: "Capacidad",
    value: "1.4 L",
    displayValue: "1.4 Litros",
    isHighlighted: true,
    groupName: "Características",
  },
  {
    id: "attr2",
    name: "Material",
    value: "Acero inoxidable",
    displayValue: "Acero inoxidable",
    isHighlighted: true,
    groupName: "Características",
  },
  {
    id: "attr3",
    name: "Conservación de temperatura",
    value: "40 horas",
    displayValue: "40 horas",
    isHighlighted: true,
    groupName: "Rendimiento",
  },
  {
    id: "attr4",
    name: "Incluye",
    value: "Manija",
    displayValue: "Manija",
    isHighlighted: false,
    groupName: "Contenido",
  },
  {
    id: "attr5",
    name: "Sistema",
    value: "Antigoteo",
    displayValue: "Antigoteo",
    isHighlighted: true,
    groupName: "Características",
  },
]

// Información de envío
const productShipping: ProductShipping = {
  isFree: true,
  estimatedDeliveryTime: {
    min: 2,
    max: 3,
    unit: "day",
  },
  availableShippingMethods: [
    {
      id: "shipping1",
      name: "Envío estándar",
      cost: 0,
      estimatedDeliveryTime: {
        min: 2,
        max: 3,
        unit: "day",
      },
    },
    {
      id: "shipping2",
      name: "Envío express",
      cost: 1500,
      estimatedDeliveryTime: {
        min: 24,
        max: 48,
        unit: "hour",
      },
    },
  ],
}

// Información del vendedor
const productSeller: ProductSeller = {
  id: "seller1",
  name: "TECNOSHARK",
  isOfficial: false,
  reputation: {
    level: "platinum",
    score: 4.9,
    totalSales: 1243,
    completedSales: 1230,
    canceledSales: 13,
    totalReviews: 987,
  },
  location: "Capital Federal",
  responseTime: {
    value: 1,
    unit: "hour",
  },
  sellerSince: new Date("2020-05-15"),
}

// Reseñas del producto
const productReviews: ProductReview[] = [
  {
    id: "review1",
    userId: "user1",
    userName: "María L.",
    rating: 5,
    title: "Excelente calidad",
    comment:
      "Excelente termo, mantiene el agua caliente por más de 24 horas. La calidad es impresionante y el diseño muy práctico. Lo recomiendo totalmente.",
    date: new Date("2024-03-15"),
    isVerifiedPurchase: true,
    likes: 42,
    attributes: [
      {
        name: "Calidad",
        rating: 5,
      },
      {
        name: "Relación precio-calidad",
        rating: 4,
      },
    ],
  },
  {
    id: "review2",
    userId: "user2",
    userName: "Carlos R.",
    rating: 5,
    comment:
      "Increíble termo, cumple perfectamente con lo que promete. Mantiene el agua caliente por muchísimas horas y es muy resistente. La manija es muy cómoda para transportarlo.",
    date: new Date("2024-02-28"),
    isVerifiedPurchase: true,
    likes: 35,
  },
  {
    id: "review3",
    userId: "user3",
    userName: "Laura M.",
    rating: 4,
    comment:
      "Muy buen producto, mantiene la temperatura como indica. El único detalle es que es un poco pesado, pero vale la pena por su rendimiento.",
    date: new Date("2024-02-10"),
    isVerifiedPurchase: true,
    likes: 18,
  },
]

// Opciones de pago
const productPaymentOptions: ProductPaymentOption[] = [
  {
    id: "payment1",
    type: "credit_card",
    name: "Tarjeta de crédito",
    installments: [
      {
        quantity: 1,
        amount: 108774.05,
        interestRate: 0,
        totalAmount: 108774.05,
      },
      {
        quantity: 12,
        amount: 9064.5,
        interestRate: 0,
        totalAmount: 108774.05,
      },
    ],
  },
  {
    id: "payment2",
    type: "debit_card",
    name: "Tarjeta de débito",
    installments: [
      {
        quantity: 1,
        amount: 108774.05,
        interestRate: 0,
        totalAmount: 108774.05,
      },
    ],
  },
  {
    id: "payment3",
    type: "mercado_credit",
    name: "Mercado Crédito",
    installments: [
      {
        quantity: 1,
        amount: 108774.05,
        interestRate: 0,
        totalAmount: 108774.05,
      },
      {
        quantity: 12,
        amount: 9064.5,
        interestRate: 0,
        totalAmount: 108774.05,
      },
    ],
  },
]

// Garantía
const productWarranty: ProductWarranty = {
  hasWarranty: true,
  length: 12,
  unit: "month",
  type: "manufacturer",
  description: "Garantía de fábrica: 12 meses",
}

// Promociones
const productPromotions: ProductPromotion[] = [
  {
    id: "promo1",
    type: "discount",
    description: "5% OFF",
    discountPercentage: 5,
    validFrom: new Date("2024-01-01"),
    validTo: new Date("2024-12-31"),
  },
  {
    id: "promo2",
    type: "shipping",
    description: "Envío gratis a todo el país",
    validFrom: new Date("2024-01-01"),
    validTo: new Date("2024-12-31"),
  },
]

// Opciones de configuración (colores)
const configOptions: ProductConfigOption[] = [
  {
    id: "color",
    name: "Color",
    values: [
      {
        id: "verde",
        value: "Verde",
        isAvailable: true,
        image: "/images/stanley-green.png",
      },
      {
        id: "negro",
        value: "Negro",
        isAvailable: true,
        isSelected: true,
        image: "/images/stanley-black.png",
      },
      {
        id: "rosa",
        value: "Rosa",
        isAvailable: true,
        image: "/images/stanley-pink.png",
      },
    ],
  },
]

// Variantes del producto (diferentes colores)
const productVariants: ProductVariant[] = [
  {
    id: "var1",
    sku: "STANLEY-TERMO-1.4L-NEGRO",
    name: "Negro",
    price: 108774.05,
    compareAtPrice: 114499,
    attributes: {
      Color: "Negro",
    },
    stock: 4,
    isAvailable: true,
    isSelected: true,
    image: "/images/stanley-black.png",
    images: blackImages,
  },
  {
    id: "var2",
    sku: "STANLEY-TERMO-1.4L-VERDE",
    name: "Verde",
    price: 112999.99,
    compareAtPrice: 119999,
    attributes: {
      Color: "Verde",
    },
    stock: 10,
    isAvailable: true,
    image: "/images/stanley-green.png",
    images: greenImages,
  },
  {
    id: "var3",
    sku: "STANLEY-TERMO-1.4L-ROSA",
    name: "Rosa",
    price: 115999.99,
    compareAtPrice: 124999,
    attributes: {
      Color: "Rosa",
    },
    stock: 7,
    isAvailable: true,
    image: "/images/stanley-pink.png",
    images: pinkImages,
  },
]

// Producto completo
export const mockThermosProduct: Product = {
  id: "prod2",
  sku: "STANLEY-TERMO-1.4L",
  title: "Termo Stanley Clásico 1.4lts Negro",
  slug: "termo-stanley-clasico-1-4lts-negro",
  description: `<p>El Termo Stanley Clásico es el compañero perfecto para tus aventuras al aire libre o para tu día a día, manteniendo tus bebidas calientes o frías por horas.</p>

<h3>Características principales:</h3>
<ul>
<li>Capacidad: 1.4 litros</li>
<li>Mantiene el agua caliente garantizada hasta por 40 horas</li>
<li>Exterior e interior de acero inoxidable de alta calidad</li>
<li>Incluye manija para fácil transporte</li>
<li>Sistema antigoteo que evita pérdidas</li>
<li>No contiene BPA</li>
<li>Tapa que sirve como vaso</li>
</ul>

<h3>Especificaciones técnicas:</h3>
<p><strong>Material:</strong> Acero inoxidable 18/8</p>
<p><strong>Dimensiones:</strong> 31.5 cm de alto x 9.5 cm de diámetro</p>
<p><strong>Peso:</strong> 907 gramos</p>
<p><strong>Conservación:</strong> Bebidas calientes hasta 40 horas, bebidas frías hasta 35 horas</p>

<h3>Contenido de la caja:</h3>
<ul>
<li>1 Termo Stanley Clásico 1.4 litros</li>
<li>Manual de instrucciones</li>
</ul>

<p>Ideal para camping, excursiones, trabajo, viajes y uso diario. La legendaria durabilidad Stanley te acompañará por años.</p>`,
  shortDescription:
    "Termo Stanley Clásico de 1.4 litros con sistema antigoteo y conservación de temperatura por hasta 40 horas. Fabricado en acero inoxidable de alta calidad.",
  brand: {
    id: "brand-stanley",
    name: "Stanley",
    logo: "/brands/stanley-logo.png",
  },
  model: "Clásico 1.4L",

  // Precios y stock
  price: 108774.05,
  compareAtPrice: 114499,
  currency: "ARS",
  stock: 4,
  isAvailable: true,
  isNew: false,
  isRefurbished: false,
  condition: "new",

  // Categorización
  categories: [
    {
      id: "cat1",
      name: "Camping, Caza y Pesca",
      slug: "camping-caza-y-pesca",
    },
    {
      id: "cat2",
      name: "Accesorios de Camping",
      slug: "accesorios-de-camping",
      parentId: "cat1",
    },
    {
      id: "cat3",
      name: "Recipientes Térmicos",
      slug: "recipientes-termicos",
      parentId: "cat2",
    },
    {
      id: "cat4",
      name: "Termos",
      slug: "termos",
      parentId: "cat3",
    },
  ],
  tags: ["termo", "stanley", "camping", "outdoor", "acero inoxidable", "térmico"],

  // Media
  images: blackImages,

  // Especificaciones técnicas
  attributes: productAttributes,

  // Variantes (diferentes colores)
  hasVariants: true,
  variants: productVariants,

  // Opciones de configuración
  configOptions: configOptions,

  // Métodos para trabajar con variantes y atributos
  getCompatibleVariants: function (selectedAttributes: Record<string, string>) {
    return (
      this.variants?.filter((variant) => {
        for (const [key, value] of Object.entries(selectedAttributes)) {
          if (variant.attributes[key] !== value) {
            return false
          }
        }
        return true
      }) || []
    )
  },

  getVariantByAttributes: function (selectedAttributes: Record<string, string>) {
    return this.variants?.find((variant) => {
      for (const [key, value] of Object.entries(selectedAttributes)) {
        if (variant.attributes[key] !== value) {
          return false
        }
      }
      return true
    })
  },

  // Envío
  shipping: productShipping,

  // Vendedor
  seller: productSeller,

  // Reseñas
  rating: {
    average: 4.8,
    count: 3512,
    distribution: {
      "1": 35,
      "2": 70,
      "3": 140,
      "4": 702,
      "5": 2565,
    },
  },
  reviews: productReviews,

  // Opciones de pago
  paymentOptions: productPaymentOptions,

  // Garantía
  warranty: productWarranty,

  // Promociones
  promotions: productPromotions,

  // Estadísticas
  viewCount: 25430,
  soldCount: 10410,
  wishlistCount: 3245,

  // Fechas
  createdAt: new Date("2023-01-15"),
  updatedAt: new Date("2024-03-01"),
  publishedAt: new Date("2023-01-20"),

  // SEO
  seo: {
    title: "Termo Stanley Clásico 1.4lts Negro | MercadoLibre",
    description:
      "Compra el Termo Stanley Clásico 1.4lts Negro. Mantiene bebidas calientes por 40 horas. Envío gratis y garantía oficial. ¡Aprovecha ahora!",
    keywords: ["termo stanley", "termo", "stanley", "termo 1.4 litros", "termo acero inoxidable"],
  },

  // Información adicional
  additionalInformation: {
    isImported: true,
    origin: "China",
    warranty: "12 meses de garantía oficial",
    recommendedUses: ["camping", "excursiones", "trabajo", "viajes", "uso diario"],
  },

  // Productos relacionados
  relatedProducts: ["prod3", "prod4", "prod5", "prod6"],

  // Preguntas y respuestas
  questions: [
    {
      id: "q1",
      userId: "user5",
      userName: "Pablo G.",
      question: "¿Mantiene realmente el agua caliente por 40 horas?",
      answer: {
        text: "Sí, mantiene el agua caliente por 40 horas aproximadamente, siempre que se cierre correctamente y no se abra durante ese tiempo.",
        date: new Date("2024-03-10"),
      },
      date: new Date("2024-03-09"),
    },
    {
      id: "q2",
      userId: "user6",
      userName: "Ana L.",
      question: "¿La tapa sirve como vaso?",
      answer: {
        text: "Sí, la tapa se puede usar como vaso.",
        date: new Date("2024-02-15"),
      },
      date: new Date("2024-02-14"),
    },
    {
      id: "q3",
      userId: "user7",
      userName: "Martín R.",
      question: "¿Viene en caja original?",
      answer: {
        text: "Sí, viene en su caja original con manual de instrucciones.",
        date: new Date("2024-01-20"),
      },
      date: new Date("2024-01-19"),
    },
  ],

  // Tipo de producto
  productType: "simple",

  // Características destacadas
  highlightedFeatures: [
    "Capacidad del termo: 1.4 L",
    "Agua caliente garantizada hasta por 40 horas",
    "Exterior de acero inoxidable e interior de acero inoxidable",
    "Incluye manija",
    "Con sistema antigoteo que evita pérdidas",
    "No contiene BPA",
  ],
}

