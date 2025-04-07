import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Página no encontrada</h1>
        <p className="mb-6">Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Volver a la página principal
        </Link>
      </div>
    </div>
  )
}

