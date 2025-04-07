"use client"

import { useState, useEffect } from "react"
import { ProductService } from "../services/product-service"
import type { Product, ProductFilters } from "../types/product"

export function useProduct(productId?: string, productSlug?: string) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        setError(null)

        let fetchedProduct: Product | null = null

        if (productId) {
          fetchedProduct = await ProductService.getProductById(productId)
        } else if (productSlug) {
          fetchedProduct = await ProductService.getProductBySlug(productSlug)
        }

        if (!fetchedProduct) {
          setError("Producto no encontrado")
        } else {
          setProduct(fetchedProduct)
        }
      } catch (err) {
        setError("Error al cargar el producto")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    if (productId || productSlug) {
      fetchProduct()
    }
  }, [productId, productSlug])

  return { product, isLoading, error }
}

export function useProductSearch(initialFilters: ProductFilters = {}) {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters)
  const { results, isLoading, error } = ProductService.useProductSearch(filters)

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      // If we change any filter other than pagination, go back to page 1
      page: newFilters.page || (Object.keys(newFilters).some((key) => key !== "page") ? 1 : prev.page),
    }))
  }

  return {
    results,
    isLoading,
    error,
    filters,
    updateFilters,
  }
}

export function useRelatedProducts(productId: string, limit = 4) {
  const { relatedProducts, isLoading, error } = ProductService.useRelatedProducts(productId, limit)

  return { relatedProducts, isLoading, error }
}

