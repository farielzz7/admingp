"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/layout/AdminLayout"
import DataTable from "@/components/ui/DataTable"
import { Plus, Search, Edit, Trash2, Tag } from "lucide-react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object({
  nombre: yup.string().required("Nombre es requerido"),
  descripcion: yup.string().required("Descripción es requerida"),
  pais: yup.string().required("País es requerido"),
  ciudad: yup.string().required("Ciudad es requerida"),
  categoria_id: yup.number().required("Categoría es requerida"),
  precio_base: yup.number().min(0, "Precio debe ser mayor a 0").required("Precio es requerido"),
  imagen_url: yup.string().url("URL inválida").required("Imagen es requerida"),
})

type DestinoForm = yup.InferType<typeof schema>

interface Destino {
  id: number
  nombre: string
  descripcion: string
  pais: string
  ciudad: string
  categoria_id: number
  categoria_nombre: string
  precio_base: number
  imagen_url: string
  activo: boolean
  created_at: string
}

interface Categoria {
  id: number
  nombre: string
}

export default function Destinos() {
  const [destinos, setDestinos] = useState<Destino[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingDestino, setEditingDestino] = useState<Destino | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<DestinoForm>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setCategorias([
        { id: 1, nombre: "Playa" },
        { id: 2, nombre: "Montaña" },
        { id: 3, nombre: "Ciudad" },
        { id: 4, nombre: "Aventura" },
      ])

      setDestinos([
        {
          id: 1,
          nombre: "Cancún",
          descripcion: "Hermosas playas del Caribe mexicano",
          pais: "México",
          ciudad: "Cancún",
          categoria_id: 1,
          categoria_nombre: "Playa",
          precio_base: 1500,
          imagen_url: "/placeholder.svg?height=200&width=300",
          activo: true,
          created_at: "2024-01-15",
        },
        {
          id: 2,
          nombre: "Machu Picchu",
          descripcion: "Antigua ciudadela inca en los Andes",
          pais: "Perú",
          ciudad: "Cusco",
          categoria_id: 2,
          categoria_nombre: "Montaña",
          precio_base: 2000,
          imagen_url: "/placeholder.svg?height=200&width=300",
          activo: true,
          created_at: "2024-01-20",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "nombre",
      header: "Destino",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-3">
          <img
            src={row.original.imagen_url || "/placeholder.svg"}
            alt={row.original.nombre}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <div className="font-medium">{row.original.nombre}</div>
            <div className="text-sm text-gray-500">
              {row.original.ciudad}, {row.original.pais}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "categoria_nombre",
      header: "Categoría",
      cell: ({ row }: any) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Tag className="w-3 h-3 mr-1" />
          {row.original.categoria_nombre}
        </span>
      ),
    },
    {
      accessorKey: "precio_base",
      header: "Precio Base",
      cell: ({ row }: any) => <span className="font-medium">${row.original.precio_base.toLocaleString()}</span>,
    },
    {
      accessorKey: "activo",
      header: "Estado",
      cell: ({ row }: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.activo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {row.original.activo ? "Activo" : "Inactivo"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }: any) => (
        <div className="flex space-x-2">
          <button onClick={() => handleEdit(row.original)} className="text-indigo-600 hover:text-indigo-900">
            <Edit className="h-4 w-4" />
          </button>
          <button onClick={() => handleDelete(row.original.id)} className="text-red-600 hover:text-red-900">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ]

  const filteredDestinos = destinos.filter(
    (destino) =>
      destino.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destino.pais.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destino.ciudad.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (destino: Destino) => {
    setEditingDestino(destino)
    setValue("nombre", destino.nombre)
    setValue("descripcion", destino.descripcion)
    setValue("pais", destino.pais)
    setValue("ciudad", destino.ciudad)
    setValue("categoria_id", destino.categoria_id)
    setValue("precio_base", destino.precio_base)
    setValue("imagen_url", destino.imagen_url)
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este destino?")) {
      setDestinos(destinos.filter((d) => d.id !== id))
    }
  }

  const onSubmit = (data: DestinoForm) => {
    const categoria = categorias.find((c) => c.id === data.categoria_id)

    if (editingDestino) {
      setDestinos(
        destinos.map((d) =>
          d.id === editingDestino.id
            ? {
                ...d,
                ...data,
                categoria_nombre: categoria?.nombre || "",
              }
            : d,
        ),
      )
    } else {
      const newDestino: Destino = {
        ...data,
        id: destinos.length + 1,
        categoria_nombre: categoria?.nombre || "",
        activo: true,
        created_at: new Date().toISOString().split("T")[0],
      }
      setDestinos([...destinos, newDestino])
    }

    setShowModal(false)
    setEditingDestino(null)
    reset()
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingDestino(null)
    reset()
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Gestión de Destinos</h1>
            <p className="mt-1 text-sm text-gray-600">Administra los destinos turísticos disponibles</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Nuevo Destino</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar destinos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 w-full max-w-sm"
              />
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <DataTable data={filteredDestinos} columns={columns} />
            )}
          </div>
        </div>
      </div>

      {/* Modal para destino */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingDestino ? "Editar Destino" : "Nuevo Destino"}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre del Destino</label>
                <input
                  {...register("nombre")}
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  {...register("descripcion")}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.descripcion && <p className="mt-1 text-sm text-red-600">{errors.descripcion.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">País</label>
                  <input
                    {...register("pais")}
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.pais && <p className="mt-1 text-sm text-red-600">{errors.pais.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Ciudad</label>
                  <input
                    {...register("ciudad")}
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.ciudad && <p className="mt-1 text-sm text-red-600">{errors.ciudad.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Categoría</label>
                  <select
                    {...register("categoria_id", { valueAsNumber: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Seleccionar categoría</option>
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.categoria_id && <p className="mt-1 text-sm text-red-600">{errors.categoria_id.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Precio Base ($)</label>
                  <input
                    {...register("precio_base", { valueAsNumber: true })}
                    type="number"
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.precio_base && <p className="mt-1 text-sm text-red-600">{errors.precio_base.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">URL de Imagen</label>
                <input
                  {...register("imagen_url")}
                  type="url"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.imagen_url && <p className="mt-1 text-sm text-red-600">{errors.imagen_url.message}</p>}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                >
                  {editingDestino ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
