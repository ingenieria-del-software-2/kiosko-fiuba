/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para priorizar rutas específicas sobre rutas dinámicas
  async rewrites() {
    return [
      {
        source: '/my-profile',
        destination: '/my-profile',
      },
      {
        source: '/profile',
        destination: '/my-profile',
      },
      {
        source: '/cart',
        destination: '/cart',
      },
      {
        source: '/checkout',
        destination: '/checkout',
      },
    ]
  }
}

export default nextConfig

