"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/layout/AdminLayout"
import DataTable from "@/components/ui/DataTable"
import ExportButtons from "@/components/ui/ExportButtons"
import { Plus, Search, Edit, Trash2, Package, Star, Calendar, DollarSign } from "lucide-react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object({
  nombre: yup.string().required("Nombre es requerido"),
  descripcion: yup.string().required("Descripción es requerida"),
  tipo_paquete_id: yup.number().required("Tipo de paquete es requerido"),
  destino_id: yup.number().required("Destino es requerido"),
  precio: yup.number().min(0, "Precio debe ser mayor a 0").required("Precio es requerido"),
  duracion_dias: yup.number().min(1, "Duración mínima 1 día").required("Duración es requerida"),
  max_personas: yup.number().min(1, "Mínimo 1 persona").required("Máximo de personas es requerido"),
  incluye: yup.string().required("Incluye es requerido"),
  no_incluye: yup.string().required("No incluye es requerido"),
  imagen_url: yup.string().url("URL inválida").required("Imagen es requerida"),
})

type PaqueteForm = yup.InferType<typeof schema>

interface Paquete {
  id: number
  nombre: string
  descripcion: string
  tipo_paquete_id: number
  tipo_nombre: string
  destino_id: number
  destino_nombre: string
  precio: number
  duracion_dias: number
  max_personas: number
  incluye: string
  no_incluye: string
  imagen_url: string
  activo: boolean
  rating: number
  reservas_count: number
  created_at: string
}

interface TipoPaquete {
  id: number
  nombre: string
}

interface Destino {
  id: number
  nombre: string
  ciudad: string
  pais: string
}

export default function Paquetes() {
  const [paquetes, setPaquetes] = useState<Paquete[]>([])
  const [tiposPaquete, setTiposPaquete] = useState<TipoPaquete[]>([])
  const [destinos, setDestinos] = useState<Destino[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingPaquete, setEditingPaquete] = useState<Paquete | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<PaqueteForm>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setTiposPaquete([
        { id: 1, nombre: "Todo Incluido" },
        { id: 2, nombre: "Aventura" },
        { id: 3, nombre: "Cultural" },
        { id: 4, nombre: "Romántico" },
        { id: 5, nombre: "Familiar" },
      ])

      setDestinos([
        { id: 1, nombre: "Cancún", ciudad: "Cancún", pais: "México" },
        { id: 2, nombre: "Machu Picchu", ciudad: "Cusco", pais: "Perú" },
        { id: 3, nombre: "París", ciudad: "París", pais: "Francia" },
        { id: 4, nombre: "Tokio", ciudad: "Tokio", pais: "Japón" },
      ])

      setPaquetes([
        {
          id: 1,
          nombre: "Cancún Paradise",
          descripcion: "Disfruta de las mejores playas del Caribe mexicano",
          tipo_paquete_id: 1,
          tipo_nombre: "Todo Incluido",
          destino_id: 1,
          destino_nombre: "Cancún",
          precio: 1500,
          duracion_dias: 7,
          max_personas: 4,
          incluye: "Hotel 5 estrellas, Comidas, Bebidas, Actividades acuáticas",
          no_incluye: "Vuelos, Seguro de viaje, Propinas",
          imagen_url: "/placeholder.svg?height=200&width=300",
          activo: true,
          rating: 4.8,
          reservas_count: 45,
          created_at: "2024-01-15",
        },
        {
          id: 2,
          nombre: "Aventura Inca",
          descripcion: "Explora la majestuosa ciudadela de Machu Picchu",
          tipo_paquete_id: 2,
          tipo_nombre: "Aventura",
          destino_id: 2,
          destino_nombre: "Machu Picchu",
          precio: 2200,
          duracion_dias: 5,
          max_personas: 8,
          incluye: "Guía especializado, Transporte, Hospedaje, Desayunos",
          no_incluye: "Vuelos, Almuerzo, Cena, Equipo de trekking",
          imagen_url: "/placeholder.svg?height=200&width=300",
          activo: true,
          rating: 4.9,
          reservas_count: 32,
          created_at: "2024-01-20",
        },
        {
          id: 3,
          nombre: "París Romántico",
          descripcion: "La ciudad del amor te espera",
          tipo_paquete_id: 4,
          tipo_nombre: "Romántico",
          destino_id: 3,
          destino_nombre: "París",
          precio: 3500,
          duracion_dias: 6,
          max_personas: 2,
          incluye: "Hotel boutique, Cena romántica, Tour por la ciudad",
          no_incluye: "Vuelos, Comidas adicionales, Entradas a museos",
          imagen_url: "/placeholder.svg?height=200&width=300",
          activo: true,
          rating: 4.7,
          reservas_count: 28,
          created_at: "2024-02-01",
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
      header: "Paquete",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-3">
          <img
            src={row.original.imagen_url || "/placeholder.svg"}
            alt={row.original.nombre}
            className="w-16 h-12 rounded-lg object-cover"
          />
          <div>
            <div className="font-medium">{row.original.nombre}</div>
            <div className="text-sm text-gray-500">{row.original.destino_nombre}</div>
            <div className="flex items-center space-x-1 mt-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs text-gray-600">{row.original.rating}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "tipo_nombre",
      header: "Tipo",
      cell: ({ row }: any) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          <Package className="w-3 h-3 mr-1" />
          {row.original.tipo_nombre}
        </span>
      ),
    },
    {
      accessorKey: "precio",
      header: "Precio",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-1">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span className="font-medium">${row.original.precio.toLocaleString()}</span>
        </div>
      ),
    },
    {
      accessorKey: "duracion_dias",
      header: "Duración",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>{row.original.duracion_dias} días</span>
        </div>
      ),
    },
    {
      accessorKey: "reservas_count",
      header: "Reservas",
      cell: ({ row }: any) => (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {row.original.reservas_count}
        </span>
      ),
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

  const filteredPaquetes = paquetes.filter(
    (paquete) =>
      paquete.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paquete.destino_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paquete.tipo_nombre.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const exportColumns = [
    { key: "id", header: "ID" },
    { key: "nombre", header: "Nombre" },
    { key: "tipo_nombre", header: "Tipo" },
    { key: "destino_nombre", header: "Destino" },
    { key: "precio", header: "Precio" },
    { key: "duracion_dias", header: "Duración (días)" },
    { key: "max_personas", header: "Máx. Personas" },
    { key: "rating", header: "Rating" },
    { key: "reservas_count", header: "Reservas" },
    { key: "activo", header: "Estado" },
  ]

  const handleEdit = (paquete: Paquete) => {
    setEditingPaquete(paquete)
    setValue("nombre", paquete.nombre)
    setValue("descripcion", paquete.descripcion)
    setValue("tipo_paquete_id", paquete.tipo_paquete_id)
    setValue("destino_id", paquete.destino_id)
    setValue("precio", paquete.precio)
    setValue("duracion_dias", paquete.duracion_dias)
    setValue("max_personas", paquete.max_personas)
    setValue("incluye", paquete.incluye)
    setValue("no_incluye", paquete.no_incluye)
    setValue("imagen_url", paquete.imagen_url)
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este paquete?")) {
      setPaquetes(paquetes.filter((p) => p.id !== id))
    }
  }

  const onSubmit = (data: PaqueteForm) => {
    const tipo = tiposPaquete.find((t) => t.id === data.tipo_paquete_id)
    const destino = destinos.find((d) => d.id === data.destino_id)

    if (editingPaquete) {
      setPaquetes(
        paquetes.map((p) =>
          p.id === editingPaquete.id
            ? {
                ...p,
                ...data,
                tipo_nombre: tipo?.nombre || "",
                destino_nombre: destino?.nombre || "",
              }
            : p,
        ),
      )
    } else {
      const newPaquete: Paquete = {
        ...data,
        id: paquetes.length + 1,
        tipo_nombre: tipo?.nombre || "",
        destino_nombre: destino?.nombre || "",
        activo: true,
        rating: 0,
        reservas_count: 0,
        created_at: new Date().toISOString().split("T")[0],
      }
      setPaquetes([...paquetes, newPaquete])
    }

    setShowModal(false)
    setEditingPaquete(null)
    reset()
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingPaquete(null)
    reset()
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Gestión de Paquetes</h1>
            <p className="mt-1 text-sm text-gray-600">Administra los paquetes turísticos disponibles</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Nuevo Paquete</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar paquetes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <ExportButtons data={filteredPaquetes} filename="paquetes" columns={exportColumns} />
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <DataTable data={filteredPaquetes} columns={columns} />
            )}
          </div>
        </div>
      </div>

      {/* Modal para paquete */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingPaquete ? "Editar Paquete" : "Nuevo Paquete"}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre del Paquete</label>
                  <input
                    {...register("nombre")}
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo de Paquete</label>
                  <select
                    {...register("tipo_paquete_id", { valueAsNumber: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Seleccionar tipo</option>
                    {tiposPaquete.map((tipo) => (
                      <option key={tipo.id} value={tipo.id}>
                        {tipo.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.tipo_paquete_id && (
                    <p className="mt-1 text-sm text-red-600">{errors.tipo_paquete_id.message}</p>
                  )}
                </div>
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Destino</label>
                  <select
                    {...register("destino_id", { valueAsNumber: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Seleccionar destino</option>
                    {destinos.map((destino) => (
                      <option key={destino.id} value={destino.id}>
                        {destino.nombre} - {destino.ciudad}, {destino.pais}
                      </option>
                    ))}
                  </select>
                  {errors.destino_id && <p className="mt-1 text-sm text-red-600">{errors.destino_id.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Precio ($)</label>
                  <input
                    {...register("precio", { valueAsNumber: true })}
                    type="number"
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.precio && <p className="mt-1 text-sm text-red-600">{errors.precio.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Duración (días)</label>
                  <input
                    {...register("duracion_dias", { valueAsNumber: true })}
                    type="number"
                    min="1"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.duracion_dias && <p className="mt-1 text-sm text-red-600">{errors.duracion_dias.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Máximo de Personas</label>
                  <input
                    {...register("max_personas", { valueAsNumber: true })}
                    type="number"
                    min="1"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.max_personas && <p className="mt-1 text-sm text-red-600">{errors.max_personas.message}</p>}
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Incluye</label>
                  <textarea
                    {...register("incluye")}
                    rows={4}
                    placeholder="Servicios incluidos en el paquete..."
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.incluye && <p className="mt-1 text-sm text-red-600">{errors.incluye.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">No Incluye</label>
                  <textarea
                    {...register("no_incluye")}
                    rows={4}
                    placeholder="Servicios no incluidos..."
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.no_incluye && <p className="mt-1 text-sm text-red-600">{errors.no_incluye.message}</p>}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
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
                  {editingPaquete ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
