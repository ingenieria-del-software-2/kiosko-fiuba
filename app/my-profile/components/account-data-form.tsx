"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "../../context/user-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, AlertCircle } from "lucide-react"

export default function AccountDataForm() {
  const { user, updateUserInfo } = useUser()
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [isAddingPhone, setIsAddingPhone] = useState(false)
  const [formData, setFormData] = useState({
    email: user?.email || "",
    username: user?.username || "",
    phoneNumber: user?.phoneNumber || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveEmail = async () => {
    await updateUserInfo({ email: formData.email })
    setIsEditingEmail(false)
  }

  const handleSaveUsername = async () => {
    await updateUserInfo({ username: formData.username })
    setIsEditingUsername(false)
  }

  const handleSavePhone = async () => {
    await updateUserInfo({ phoneNumber: formData.phoneNumber })
    setIsAddingPhone(false)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Datos de tu cuenta</h2>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-green-600 font-medium">Validado</span>
          </div>
        </div>

        <div className="p-6">
          {!isEditingEmail ? (
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">E-mail</p>
              <p className="font-medium mb-4">{user?.email}</p>
              <Button
                variant="outline"
                className="text-blue-500 bg-blue-50 hover:bg-blue-100 border-blue-100"
                onClick={() => setIsEditingEmail(true)}
              >
                Modificar
              </Button>
            </div>
          ) : (
            <div className="mb-6">
              <label className="block text-sm text-gray-500 mb-1">E-mail</label>
              <Input name="email" value={formData.email} onChange={handleChange} className="w-full mb-4" />
              <div className="flex gap-2">
                <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleSaveEmail}>
                  Guardar
                </Button>
                <Button variant="outline" onClick={() => setIsEditingEmail(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          <div className="border-t pt-6 mb-6">
            {user?.phoneNumber ? (
              <div className="p-4 border rounded-lg bg-green-50 mb-4">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-green-600 font-medium">Completo</span>
                </div>
              </div>
            ) : (
              <div className="p-4 border rounded-lg bg-gray-50 mb-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
                  <span className="text-orange-600 font-medium">Incompleto</span>
                </div>
              </div>
            )}

            {!isAddingPhone ? (
              <div>
                <p className="text-sm text-gray-500 mb-1">Teléfono</p>
                {user?.phoneNumber ? (
                  <p className="font-medium mb-4">{user.phoneNumber}</p>
                ) : (
                  <p className="text-gray-500 mb-4">Agrega un número de teléfono para tu cuenta.</p>
                )}
                <Button
                  variant={user?.phoneNumber ? "outline" : "default"}
                  className={
                    user?.phoneNumber
                      ? "text-blue-500 bg-blue-50 hover:bg-blue-100 border-blue-100"
                      : "bg-blue-500 hover:bg-blue-600"
                  }
                  onClick={() => setIsAddingPhone(true)}
                >
                  {user?.phoneNumber ? "Modificar" : "Agregar"}
                </Button>
              </div>
            ) : (
              <div>
                <label className="block text-sm text-gray-500 mb-1">Teléfono</label>
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+54 9 11 1234-5678"
                  className="w-full mb-4"
                />
                <div className="flex gap-2">
                  <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleSavePhone}>
                    Guardar
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingPhone(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            {!isEditingUsername ? (
              <div>
                <p className="text-sm text-gray-500 mb-1">Nombre de usuario</p>
                <p className="font-medium mb-4">{user?.username?.toUpperCase()}</p>
                <Button
                  variant="outline"
                  className="text-blue-500 bg-blue-50 hover:bg-blue-100 border-blue-100"
                  onClick={() => setIsEditingUsername(true)}
                >
                  Modificar
                </Button>
              </div>
            ) : (
              <div>
                <label className="block text-sm text-gray-500 mb-1">Nombre de usuario</label>
                <Input name="username" value={formData.username} onChange={handleChange} className="w-full mb-4" />
                <div className="flex gap-2">
                  <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleSaveUsername}>
                    Guardar
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditingUsername(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

