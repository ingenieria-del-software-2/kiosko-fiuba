import { ProductService } from "../../services/product-service"
import ProductPageClient from "../../product-page"
import { notFound } from "next/navigation"

interface ProductPageParams {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageParams) {
  const { slug } = params

  try {
    const product = await ProductService.getProductBySlug(slug)

    if (!product) {
      return notFound()
    }

    return <ProductPageClient productId={product.id} />
  } catch (error) {
    console.error("Error loading product:", error)
    return notFound()
  }
}

