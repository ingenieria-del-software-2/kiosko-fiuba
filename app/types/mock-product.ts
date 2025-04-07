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
} from "./product"

// Imágenes del producto
const productImages: ProductImage[] = [
  {
    id: "img1",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DpbgguUV1vH8YkXMYntRtDcxSDx5yn.png",
    alt: "Dell Inspiron 15 3520 - Vista frontal",
    isMain: true,
    order: 1,
  },
  {
    id: "img2",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GUEvjUnZPMsMUbPbAWOFohlOSV2iZE.png",
    alt: "Dell Inspiron 15 3520 - Vista en ángulo con teclado",
    isMain: false,
    order: 2,
  },
  {
    id: "img3",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OydAoInnWHSLmTn7Xyf4ikcIPUwbcc.png",
    alt: "Dell Inspiron 15 3520 - Vista lateral",
    isMain: false,
    order: 3,
  },
  {
    id: "img4",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ntNRI6gVMYfiY1t6INIiKmpdKcEPtQ.png",
    alt: "Dell Inspiron 15 3520 - Vista superior cerrada",
    isMain: false,
    order: 4,
  },
  {
    id: "img5",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NctTXYhGw0i625k1ZpJ8Jhsp9l8TMs.png",
    alt: "Dell Inspiron 15 3520 - Vista de perfil",
    isMain: false,
    order: 5,
  },
]

// Atributos del producto
const productAttributes: ProductAttribute[] = [
  {
    id: "attr1",
    name: "Procesador",
    value: "Intel Core i3 1215U",
    displayValue: "Intel Core i3 1215U",
    isHighlighted: true,
    groupName: "Procesador",
  },
  {
    id: "attr2",
    name: "Memoria RAM",
    value: "8GB",
    displayValue: "8 GB",
    isHighlighted: true,
    groupName: "Memoria",
  },
  {
    id: "attr3",
    name: "Almacenamiento",
    value: "512GB SSD",
    displayValue: "512 GB SSD",
    isHighlighted: true,
    groupName: "Almacenamiento",
  },
  {
    id: "attr4",
    name: "Sistema operativo",
    value: "Windows 11 Home",
    displayValue: "Windows 11 Home",
    isHighlighted: true,
    groupName: "Software",
  },
  {
    id: "attr5",
    name: "Tamaño de pantalla",
    value: "15.6",
    displayValue: "15.6 pulgadas",
    isHighlighted: true,
    groupName: "Pantalla",
  },
  {
    id: "attr6",
    name: "Resolución de pantalla",
    value: "1920x1080",
    displayValue: "1920 px x 1080 px (Full HD)",
    isHighlighted: true,
    groupName: "Pantalla",
  },
  {
    id: "attr7",
    name: "Placa de video",
    value: "Intel UHD Graphics",
    displayValue: "Intel UHD Graphics",
    isHighlighted: true,
    groupName: "Gráficos",
  },
  {
    id: "attr8",
    name: "Conectividad",
    value: "WiFi, Bluetooth, HDMI, USB 3.0",
    displayValue: "WiFi, Bluetooth, HDMI, USB 3.0",
    isHighlighted: false,
    groupName: "Conectividad",
  },
  {
    id: "attr9",
    name: "Batería",
    value: "3 celdas, 41 Wh",
    displayValue: "3 celdas, 41 Wh",
    isHighlighted: false,
    groupName: "Batería",
  },
  {
    id: "attr10",
    name: "Peso",
    value: "1.9",
    displayValue: "1.9 kg",
    isHighlighted: false,
    groupName: "Dimensiones",
  },
  {
    id: "attr11",
    name: "Color",
    value: "Negro",
    displayValue: "Negro",
    isHighlighted: false,
    groupName: "Apariencia",
  },
  {
    id: "attr12",
    name: "Teclado",
    value: "Español Latinoamérica",
    displayValue: "Español Latinoamérica",
    isHighlighted: false,
    groupName: "Entrada",
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
  name: "FULLSTOREONLINE",
  isOfficial: true,
  reputation: {
    level: "platinum",
    score: 4.8,
    totalSales: 5243,
    completedSales: 5198,
    canceledSales: 45,
    totalReviews: 4876,
  },
  location: "Capital Federal",
  responseTime: {
    value: 2,
    unit: "hour",
  },
  sellerSince: new Date("2018-03-15"),
}

// Reseñas del producto
const productReviews: ProductReview[] = [
  {
    id: "review1",
    userId: "user1",
    userName: "Juan P.",
    rating: 5,
    title: "Excelente notebook para el uso diario",
    comment:
      "Excelente notebook para el uso diario. La compré hace un mes y estoy muy satisfecho con el rendimiento. El procesador i3 es más que suficiente para tareas de oficina, navegación web y streaming. La batería dura aproximadamente 5-6 horas con uso normal, lo cual es bastante aceptable. El SSD de 512GB es rápido y tiene espacio suficiente para mis necesidades. La pantalla es nítida y con buenos ángulos de visión. El teclado es cómodo para escribir durante largos períodos. Windows 11 funciona muy fluido en esta máquina. Lo único que podría mejorar es el touchpad, que a veces no es tan preciso como me gustaría. En general, una excelente relación calidad-precio para quienes buscan una notebook confiable para el trabajo o estudio.",
    date: new Date("2024-06-20"),
    isVerifiedPurchase: true,
    likes: 26,
    attributes: [
      {
        name: "Relación precio-calidad",
        rating: 5,
      },
      {
        name: "Rendimiento",
        rating: 4,
      },
      {
        name: "Calidad de los materiales",
        rating: 4,
      },
    ],
  },
  {
    id: "review2",
    userId: "user2",
    userName: "María L.",
    rating: 4,
    comment:
      "Muy buena notebook para uso diario y tareas de oficina. La batería dura aproximadamente 5 horas con uso normal. El procesador i3 es suficiente para multitarea básica, aunque para edición de video o juegos pesados se queda corta. La pantalla tiene buena definición y el teclado es cómodo. Lo único que no me gustó es que viene con bastante software preinstalado que no se necesita.",
    date: new Date("2024-06-15"),
    isVerifiedPurchase: true,
    likes: 18,
    attributes: [
      {
        name: "Relación precio-calidad",
        rating: 4,
      },
      {
        name: "Rendimiento",
        rating: 3,
      },
      {
        name: "Calidad de los materiales",
        rating: 4,
      },
    ],
  },
  {
    id: "review3",
    userId: "user3",
    userName: "Carlos M.",
    rating: 5,
    comment:
      "Excelente relación precio-calidad. La compré para mi hijo que está en la universidad y cumple perfectamente con lo que necesita. El SSD de 512GB es rápido y tiene espacio suficiente. Windows 11 funciona muy fluido en esta máquina. El envío fue rápido y llegó bien embalada. Recomiendo totalmente esta notebook para estudiantes o trabajo de oficina.",
    date: new Date("2024-06-02"),
    isVerifiedPurchase: true,
    likes: 15,
    attributes: [
      {
        name: "Relación precio-calidad",
        rating: 5,
      },
      {
        name: "Rendimiento",
        rating: 4,
      },
      {
        name: "Calidad de los materiales",
        rating: 5,
      },
    ],
  },
  {
    id: "review4",
    userId: "user4",
    userName: "Laura S.",
    rating: 3,
    comment:
      "La notebook funciona bien para tareas básicas, pero se calienta bastante cuando se exige un poco más. Los altavoces son de calidad media, recomiendo usar auriculares. La cámara web es de baja resolución, apenas suficiente para videollamadas. El trackpad es sensible y funciona bien. En general es una computadora decente para el precio, pero no esperen un rendimiento excepcional.",
    date: new Date("2024-05-28"),
    isVerifiedPurchase: true,
    likes: 8,
    attributes: [
      {
        name: "Relación precio-calidad",
        rating: 3,
      },
      {
        name: "Rendimiento",
        rating: 3,
      },
      {
        name: "Calidad de los materiales",
        rating: 3,
      },
    ],
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
        amount: 959999,
        interestRate: 0,
        totalAmount: 959999,
      },
      {
        quantity: 3,
        amount: 319999.67,
        interestRate: 0,
        totalAmount: 959999,
      },
      {
        quantity: 6,
        amount: 159999.83,
        interestRate: 0,
        totalAmount: 959999,
      },
      {
        quantity: 12,
        amount: 79999.92,
        interestRate: 0,
        totalAmount: 959999,
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
        amount: 959999,
        interestRate: 0,
        totalAmount: 959999,
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
        amount: 959999,
        interestRate: 0,
        totalAmount: 959999,
      },
      {
        quantity: 3,
        amount: 319999.67,
        interestRate: 0,
        totalAmount: 959999,
      },
      {
        quantity: 6,
        amount: 159999.83,
        interestRate: 0,
        totalAmount: 959999,
      },
      {
        quantity: 12,
        amount: 79999.92,
        interestRate: 0,
        totalAmount: 959999,
      },
    ],
  },
  {
    id: "payment4",
    type: "cash",
    name: "Efectivo",
    installments: [
      {
        quantity: 1,
        amount: 959999,
        interestRate: 0,
        totalAmount: 959999,
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
    description: "10% de descuento pagando con Mercado Crédito",
    discountPercentage: 10,
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

// Actualizar las variantes del producto para incluir más combinaciones
const productVariants = [
  {
    id: "var1",
    sku: "DELL-INSP-3520-I3-8GB-512-WIN",
    name: "8 GB RAM | 512 GB SSD",
    price: 959999,
    compareAtPrice: 1099999,
    attributes: {
      Capacidad: "8GB RAM | 512GB SSD",
      "Sistema operativo": "Windows 11 Home",
      Procesador: "Intel Core i3 1215U",
      "Resolución de pantalla": "1920 px x 1080 px",
      "Placa de video": "Intel UHD Graphics",
    },
    stock: 50,
    isAvailable: true,
    isSelected: true,
  },
  {
    id: "var2",
    sku: "DELL-INSP-3520-I3-12GB-256-WIN",
    name: "12 GB RAM | 256 GB SSD",
    price: 979999,
    compareAtPrice: 1119999,
    attributes: {
      Capacidad: "12GB RAM | 256GB SSD",
      "Sistema operativo": "Windows 11 Home",
      Procesador: "Intel Core i3 1215U",
      "Resolución de pantalla": "1920 px x 1080 px",
      "Placa de video": "Intel UHD Graphics",
    },
    stock: 35,
    isAvailable: true,
  },
  {
    id: "var3",
    sku: "DELL-INSP-3520-I5-16GB-512-WIN",
    name: "16 GB RAM | 512 GB SSD",
    price: 1159999,
    compareAtPrice: 1299999,
    attributes: {
      Capacidad: "16GB RAM | 512GB SSD",
      "Sistema operativo": "Windows 11 Home",
      Procesador: "Intel Core i5 1135G7",
      "Resolución de pantalla": "1920 px x 1080 px",
      "Placa de video": "Intel UHD Graphics",
    },
    stock: 20,
    isAvailable: true,
  },
  {
    id: "var4",
    sku: "DELL-INSP-3520-I3-8GB-512-LINUX",
    name: "8 GB RAM | 512 GB SSD | Linux",
    price: 899999,
    compareAtPrice: 999999,
    attributes: {
      Capacidad: "8GB RAM | 512GB SSD",
      "Sistema operativo": "Linux",
      Procesador: "Intel Core i3 1215U",
      "Resolución de pantalla": "1920 px x 1080 px",
      "Placa de video": "Intel UHD Graphics",
    },
    stock: 15,
    isAvailable: true,
  },
  {
    id: "var5",
    sku: "DELL-INSP-3520-I3-8GB-512-WIN-FHD",
    name: "8 GB RAM | 512 GB SSD | FHD",
    price: 959999,
    compareAtPrice: 1099999,
    attributes: {
      Capacidad: "8GB RAM | 512GB SSD",
      "Sistema operativo": "Windows 11 Home",
      Procesador: "Intel Core i3 1215U",
      "Resolución de pantalla": "FHD",
      "Placa de video": "Intel UHD Graphics",
    },
    stock: 25,
    isAvailable: true,
  },
  {
    id: "var6",
    sku: "DELL-INSP-3520-I3-8GB-512-WIN-INTEGRADA",
    name: "8 GB RAM | 512 GB SSD | Gráficos integrados",
    price: 949999,
    compareAtPrice: 1089999,
    attributes: {
      Capacidad: "8GB RAM | 512GB SSD",
      "Sistema operativo": "Windows 11 Home",
      Procesador: "Intel Core i3 1215U",
      "Resolución de pantalla": "1920 px x 1080 px",
      "Placa de video": "Integrada Intel® UHD Graphics",
    },
    stock: 30,
    isAvailable: true,
  },
  {
    id: "var7",
    sku: "DELL-INSP-3520-I3-1115-8GB-512-WIN",
    name: "8 GB RAM | 512 GB SSD | i3 1115",
    price: 929999,
    compareAtPrice: 1059999,
    attributes: {
      Capacidad: "8GB RAM | 512GB SSD",
      "Sistema operativo": "Windows 11 Home",
      Procesador: "Intel Core i3 1115",
      "Resolución de pantalla": "1920 px x 1080 px",
      "Placa de video": "Intel UHD Graphics",
    },
    stock: 18,
    isAvailable: true,
  },
]

// Crear opciones de configuración basadas en las variantes
const configOptions = [
  {
    id: "config-capacity",
    name: "Capacidad",
    values: [
      { id: "8gb-512gb", value: "8GB RAM | 512GB SSD", isAvailable: true, isSelected: true },
      { id: "12gb-256gb", value: "12GB RAM | 256GB SSD", isAvailable: true },
      { id: "16gb-512gb", value: "16GB RAM | 512GB SSD", isAvailable: true },
    ],
  },
  {
    id: "config-os",
    name: "Sistema operativo",
    values: [
      { id: "linux", value: "Linux", isAvailable: true },
      { id: "windows-11", value: "Windows 11 Home", isAvailable: true, isSelected: true },
    ],
  },
  {
    id: "config-processor",
    name: "Procesador",
    values: [
      { id: "intel-i3-1215u", value: "Intel Core i3 1215U", isAvailable: true, isSelected: true },
      { id: "intel-i3-1115", value: "Intel Core i3 1115", isAvailable: true },
      { id: "intel-i5-1135g7", value: "Intel Core i5 1135G7", isAvailable: true },
    ],
  },
  {
    id: "config-resolution",
    name: "Resolución de pantalla",
    values: [
      { id: "1920x1080", value: "1920 px x 1080 px", isAvailable: true, isSelected: true },
      { id: "fhd", value: "FHD", isAvailable: true },
    ],
  },
  {
    id: "config-graphics",
    name: "Placa de video",
    values: [
      { id: "integrated-uhd", value: "Integrada Intel® UHD Graphics", isAvailable: true },
      { id: "intel-uhd", value: "Intel UHD Graphics", isAvailable: true, isSelected: true },
    ],
  },
]

// Producto completo
export const mockLaptopProduct: Product = {
  id: "prod1",
  sku: "DELL-INSP-3520-I3-8GB-512",
  title: "Notebook Dell Inspiron 15 3520 15.6 8gb Ram 512gb Ssd Color Negro",
  slug: "notebook-dell-inspiron-15-3520-8gb-512gb",
  description: `<p>La notebook Dell Inspiron 15 3520 es la compañera ideal para tus tareas diarias, combinando rendimiento confiable y diseño elegante.</p>
  
  <h3>Características principales:</h3>
  <ul>
    <li>Procesador Intel Core i3 1215U de 12ª generación (hasta 4.4 GHz)</li>
    <li>8GB de memoria RAM DDR4 (expandible hasta 16GB)</li>
    <li>Almacenamiento SSD de 512GB para un arranque rápido y amplio espacio</li>
    <li>Pantalla Full HD de 15.6" (1920 x 1080) con tecnología antirreflejo</li>
    <li>Gráficos Intel UHD integrados</li>
    <li>Windows 11 Home preinstalado</li>
    <li>Batería de larga duración (hasta 7 horas de uso normal)</li>
    <li>Conectividad completa: WiFi, Bluetooth, HDMI, USB 3.0</li>
    <li>Teclado numérico integrado</li>
    <li>Cámara HD y micrófono integrados</li>
  </ul>
  
  <h3>Especificaciones técnicas detalladas:</h3>
  <p><strong>Procesador:</strong> Intel Core i3-1215U (12ª generación, 6 núcleos, 8 hilos, 10MB caché, hasta 4.4GHz)</p>
  <p><strong>Memoria:</strong> 8GB DDR4 3200MHz (1 x 8GB, expandible hasta 16GB)</p>
  <p><strong>Almacenamiento:</strong> SSD M.2 PCIe NVMe de 512GB</p>
  <p><strong>Pantalla:</strong> 15.6" FHD (1920 x 1080) antirreflejo, 60Hz, 250 nits</p>
  <p><strong>Gráficos:</strong> Intel UHD Graphics integrados</p>
  <p><strong>Sistema operativo:</strong> Windows 11 Home, 64 bits</p>
  <p><strong>Batería:</strong> 3 celdas, 41 Wh, integrada</p>
  <p><strong>Adaptador de corriente:</strong> 65W</p>
  <p><strong>Conectividad:</strong> WiFi 802.11ac (2x2) + Bluetooth 5.0</p>
  <p><strong>Puertos:</strong></p>
  <ul>
    <li>1 x USB 3.2 Gen 1 Type-C</li>
    <li>2 x USB 3.2 Gen 1 Type-A</li>
    <li>1 x HDMI 1.4</li>
    <li>1 x Lector de tarjetas SD</li>
    <li>1 x Conector de audio universal</li>
    <li>1 x Puerto de alimentación</li>
  </ul>
  <p><strong>Audio:</strong> Altavoces estéreo, Realtek Audio</p>
  <p><strong>Cámara:</strong> HD 720p a 30 fps</p>
  <p><strong>Dimensiones:</strong> 358.5 x 235.5 x 18.9 mm</p>
  <p><strong>Peso:</strong> 1.9 kg</p>
  <p><strong>Color:</strong> Negro</p>
  
  <h3>Contenido de la caja:</h3>
  <ul>
    <li>Notebook Dell Inspiron 15 3520</li>
    <li>Adaptador de corriente</li>
    <li>Documentación</li>
  </ul>
  
  <p>Ideal para estudiantes, profesionales y uso familiar. Perfecta para tareas de productividad, navegación web, streaming de contenido y aplicaciones de oficina.</p>`,
  shortDescription:
    "Notebook Dell Inspiron 15 3520 con procesador Intel Core i3, 8GB RAM, 512GB SSD y pantalla Full HD de 15.6 pulgadas. Ideal para trabajo y estudio.",
  brand: {
    id: "brand1",
    name: "Dell",
    logo: "/brands/dell-logo.png",
  },
  model: "Inspiron 15 3520",

  // Precios y stock
  price: 959999,
  compareAtPrice: 1099999,
  currency: "ARS",
  stock: 50,
  isAvailable: true,
  isNew: true,
  isRefurbished: false,
  condition: "new",

  // Categorización
  categories: [
    {
      id: "cat1",
      name: "Computación",
      slug: "computacion",
    },
    {
      id: "cat2",
      name: "Notebooks y Accesorios",
      slug: "notebooks-y-accesorios",
      parentId: "cat1",
    },
    {
      id: "cat3",
      name: "Notebooks",
      slug: "notebooks",
      parentId: "cat2",
    },
    {
      id: "cat4",
      name: "Notebooks Dell",
      slug: "notebooks-dell",
      parentId: "cat3",
    },
  ],
  tags: ["laptop", "notebook", "dell", "inspiron", "intel", "windows 11", "computadora"],

  // Media
  images: productImages,

  // Especificaciones técnicas
  attributes: productAttributes,

  // Actualizar las variantes
  hasVariants: true,
  variants: productVariants,

  // Agregar opciones de configuración
  configOptions: configOptions,

  // Agregar métodos para trabajar con variantes y atributos
  getCompatibleVariants: function (selectedAttributes: Record<string, string>) {
    // Filtrar variantes que coincidan con los atributos seleccionados
    return (
      this.variants?.filter((variant) => {
        // Verificar cada atributo seleccionado
        for (const [key, value] of Object.entries(selectedAttributes)) {
          // Si el atributo no coincide, esta variante no es compatible
          if (variant.attributes[key] !== value) {
            return false
          }
        }
        return true
      }) || []
    )
  },

  getVariantByAttributes: function (selectedAttributes: Record<string, string>) {
    // Buscar la variante que coincida exactamente con todos los atributos seleccionados
    return this.variants?.find((variant) => {
      // Verificar que todos los atributos seleccionados coincidan
      for (const [key, value] of Object.entries(selectedAttributes)) {
        if (variant.attributes[key] !== value) {
          return false
        }
      }

      // Verificar que la variante no tenga atributos adicionales que no estén en la selección
      const selectedKeys = Object.keys(selectedAttributes)
      const variantKeys = Object.keys(variant.attributes)

      // Si la variante tiene más atributos que los seleccionados, verificar que sean los mismos
      return variantKeys.length === selectedKeys.length
    })
  },

  // Envío
  shipping: productShipping,

  // Vendedor
  seller: productSeller,

  // Reseñas
  rating: {
    average: 4.7,
    count: 2948,
    distribution: {
      "1": 59,
      "2": 88,
      "3": 147,
      "4": 442,
      "5": 2212,
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
  viewCount: 15782,
  soldCount: 1243,
  wishlistCount: 876,

  // Fechas
  createdAt: new Date("2023-12-15"),
  updatedAt: new Date("2024-04-01"),
  publishedAt: new Date("2023-12-20"),

  // SEO
  seo: {
    title: "Notebook Dell Inspiron 15 3520 8GB 512GB SSD Intel Core i3 Windows 11",
    description:
      "Compra la Notebook Dell Inspiron 15 3520 con 8GB RAM, 512GB SSD y procesador Intel Core i3. Envío gratis y garantía oficial. ¡Aprovecha ahora!",
    keywords: ["notebook dell", "laptop dell", "dell inspiron", "notebook intel core i3", "computadora portatil"],
  },

  // Información adicional
  additionalInformation: {
    includesOfficeTrialVersion: true,
    compatibleAccessories: ["mochila dell", "mouse inalámbrico", "hub usb-c"],
    recommendedUses: ["estudio", "trabajo", "uso doméstico", "navegación web", "ofimática"],
  },

  // Productos relacionados
  relatedProducts: ["prod2", "prod3", "prod4", "prod5"],

  // Preguntas y respuestas
  questions: [
    {
      id: "q1",
      userId: "user5",
      userName: "Roberto G.",
      question: "¿La memoria RAM es expandible? ¿Hasta cuánto?",
      answer: {
        text: "Sí, la memoria RAM es expandible hasta 16GB (2 slots de 8GB cada uno).",
        date: new Date("2024-03-10"),
      },
      date: new Date("2024-03-09"),
    },
    {
      id: "q2",
      userId: "user6",
      userName: "Ana M.",
      question: "¿Viene con Office incluido?",
      answer: {
        text: "Viene con una versión de prueba de Microsoft Office por 30 días. Luego deberás adquirir la licencia.",
        date: new Date("2024-02-15"),
      },
      date: new Date("2024-02-14"),
    },
    {
      id: "q3",
      userId: "user7",
      userName: "Pablo R.",
      question: "¿Sirve para juegos?",
      answer: {
        text: "Esta notebook está diseñada principalmente para tareas de productividad y uso general. Puede correr juegos básicos o antiguos, pero no es recomendable para juegos modernos o exigentes debido a su placa gráfica integrada.",
        date: new Date("2024-01-20"),
      },
      date: new Date("2024-01-19"),
    },
    {
      id: "q4",
      userId: "user8",
      userName: "Lucía T.",
      question: "¿Cuánto dura la batería con uso normal?",
      answer: {
        text: "Con uso normal (navegación web, documentos, videos) dura aproximadamente 5-6 horas. Esto puede variar según el brillo de pantalla y las aplicaciones que utilices.",
        date: new Date("2024-03-25"),
      },
      date: new Date("2024-03-24"),
    },
  ],
}

