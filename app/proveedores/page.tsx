"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/layout/AdminLayout"
import DataTable from "@/components/ui/DataTable"
import ExportButtons from "@/components/ui/ExportButtons"
import { Plus, Search, Edit, Trash2, Building, Phone, Mail, MapPin, Star, Eye, User } from "lucide-react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object({
  nombre: yup.string().required("Nombre es requerido"),
  tipo_servicio: yup.string().required("Tipo de servicio es requerido"),
  contacto_nombre: yup.string().required("Nombre de contacto es requerido"),
  contacto_email: yup.string().email("Email inválido").required("Email es requerido"),
  contacto_telefono: yup.string().required("Teléfono es requerido"),
  direccion: yup.string().required("Dirección es requerida"),
  ciudad: yup.string().required("Ciudad es requerida"),
  pais: yup.string().required("País es requerido"),
  sitio_web: yup.string().url("URL inválida"),
  descripcion: yup.string().required("Descripción es requerida"),
})

type ProveedorForm = yup.InferType<typeof schema>

interface Proveedor {
  id: number
  nombre: string
  tipo_servicio: string
  contacto_nombre: string
  contacto_email: string
  contacto_telefono: string
  direccion: string
  ciudad: string
  pais: string
  sitio_web: string
  descripcion: string
  rating: number
  servicios_activos: number
  activo: boolean
  created_at: string
}

export default function Proveedores() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTipo, setFilterTipo] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingProveedor, setEditingProveedor] = useState<Proveedor | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedProveedor, setSelectedProveedor] = useState<Proveedor | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProveedorForm>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setProveedores([
        {
          id: 1,
          nombre: "Hotel Paradise Resort",
          tipo_servicio: "Hospedaje",
          contacto_nombre: "Ana García",
          contacto_email: "ana@paradiseresort.com",
          contacto_telefono: "+52 998 123 4567",
          direccion: "Zona Hotelera Km 14.5",
          ciudad: "Cancún",
          pais: "México",
          sitio_web: "https://paradiseresort.com",
          descripcion: "Resort todo incluido frente al mar con 500 habitaciones",
          rating: 4.8,
          servicios_activos: 12,
          activo: true,
          created_at: "2024-01-15",
        },
        {
          id: 2,
          nombre: "Aventuras Inca Tours",
          tipo_servicio: "Tours y Excursiones",
          contacto_nombre: "Carlos Mendoza",
          contacto_email: "carlos@incatours.pe",
          contacto_telefono: "+51 84 234 5678",
          direccion: "Av. El Sol 123",
          ciudad: "Cusco",
          pais: "Perú",
          sitio_web: "https://incatours.pe",
          descripcion: "Especialistas en tours a Machu Picchu y Valle Sagrado",
          rating: 4.9,
          servicios_activos: 8,
          activo: true,
          created_at: "2024-01-20",
        },
        {
          id: 3,
          nombre: "TransCorp Shuttle",
          tipo_servicio: "Transporte",
          contacto_nombre: "Miguel Rodríguez",
          contacto_email: "miguel@transcorp.com",
          contacto_telefono: "+1 555 345 6789",
          direccion: "Airport Terminal 2",
          ciudad: "Miami",
          pais: "Estados Unidos",
          sitio_web: "https://transcorp.com",
          descripcion: "Servicios de transporte aeroportuario y traslados",
          rating: 4.5,
          servicios_activos: 15,
          activo: true,
          created_at: "2024-02-01",
        },
        {
          id: 4,
          nombre: "Gourmet Catering Paris",
          tipo_servicio: "Alimentación",
          contacto_nombre: "Sophie Laurent",
          contacto_email: "sophie@gourmetparis.fr",
          contacto_telefono: "+33 1 45 67 89 01",
          direccion: "Rue de Rivoli 45",
          ciudad: "París",
          pais: "Francia",
          sitio_web: "https://gourmetparis.fr",
          descripcion: "Servicios de catering gourmet para eventos especiales",
          rating: 4.7,
          servicios_activos: 6,
          activo: false,
          created_at: "2024-02-10",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const tiposServicio = [
    "Hospedaje",
    "Tours y Excursiones",
    "Transporte",
    "Alimentación",
    "Entretenimiento",
    "Guías Turísticos",
    "Actividades Acuáticas",
    "Spa y Bienestar",
  ]

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "nombre",
      header: "Proveedor",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-indigo-600" />
          </div>
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
      accessorKey: "tipo_servicio",
      header: "Tipo de Servicio",
      cell: ({ row }: any) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {row.original.tipo_servicio}
        </span>
      ),
    },
    {
      accessorKey: "contacto_nombre",
      header: "Contacto",
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium">{row.original.contacto_nombre}</div>
          <div className="text-sm text-gray-500 flex items-center space-x-1">
            <Mail className="w-3 h-3" />
            <span>{row.original.contacto_email}</span>
          </div>
          <div className="text-sm text-gray-500 flex items-center space-x-1">
            <Phone className="w-3 h-3" />
            <span>{row.original.contacto_telefono}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="font-medium">{row.original.rating}</span>
          <span className="text-sm text-gray-500">({row.original.servicios_activos} servicios)</span>
        </div>
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
          <button
            onClick={() => handleViewDetail(row.original)}
            className="text-blue-600 hover:text-blue-900"
            title="Ver detalles"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleEdit(row.original)}
            className="text-indigo-600 hover:text-indigo-900"
            title="Editar"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="text-red-600 hover:text-red-900"
            title="Eliminar"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ]

  const filteredProveedores = proveedores.filter((proveedor) => {
    const matchesSearch =
      proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.contacto_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.ciudad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.pais.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTipo = filterTipo === "" || proveedor.tipo_servicio === filterTipo

    return matchesSearch && matchesTipo
  })

  const exportColumns = [
    { key: "id", header: "ID" },
    { key: "nombre", header: "Nombre" },
    { key: "tipo_servicio", header: "Tipo Servicio" },
    { key: "contacto_nombre", header: "Contacto" },
    { key: "contacto_email", header: "Email" },
    { key: "contacto_telefono", header: "Teléfono" },
    { key: "ciudad", header: "Ciudad" },
    { key: "pais", header: "País" },
    { key: "rating", header: "Rating" },
    { key: "servicios_activos", header: "Servicios Activos" },
    { key: "activo", header: "Estado" },
  ]

  const handleViewDetail = (proveedor: Proveedor) => {
    setSelectedProveedor(proveedor)
    setShowDetailModal(true)
  }

  const handleEdit = (proveedor: Proveedor) => {
    setEditingProveedor(proveedor)
    setValue("nombre", proveedor.nombre)
    setValue("tipo_servicio", proveedor.tipo_servicio)
    setValue("contacto_nombre", proveedor.contacto_nombre)
    setValue("contacto_email", proveedor.contacto_email)
    setValue("contacto_telefono", proveedor.contacto_telefono)
    setValue("direccion", proveedor.direccion)
    setValue("ciudad", proveedor.ciudad)
    setValue("pais", proveedor.pais)
    setValue("sitio_web", proveedor.sitio_web)
    setValue("descripcion", proveedor.descripcion)
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este proveedor?")) {
      setProveedores(proveedores.filter((p) => p.id !== id))
    }
  }

  const onSubmit = (data: ProveedorForm) => {
    if (editingProveedor) {
      setProveedores(
        proveedores.map((p) =>
          p.id === editingProveedor.id
            ? {
                ...p,
                ...data,
              }
            : p,
        ),
      )
    } else {
      const newProveedor: Proveedor = {
        ...data,
        id: proveedores.length + 1,
        rating: 0,
        servicios_activos: 0,
        activo: true,
        created_at: new Date().toISOString().split("T")[0],
      }
      setProveedores([...proveedores, newProveedor])
    }

    setShowModal(false)
    setEditingProveedor(null)
    reset()
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProveedor(null)
    reset()
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Gestión de Proveedores</h1>
            <p className="mt-1 text-sm text-gray-600">Administra los proveedores de servicios turísticos</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Nuevo Proveedor</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Buscar proveedores..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <select
                  value={filterTipo}
                  onChange={(e) => setFilterTipo(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Todos los tipos</option>
                  {tiposServicio.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>

              <ExportButtons data={filteredProveedores} filename="proveedores" columns={exportColumns} />
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <DataTable data={filteredProveedores} columns={columns} />
            )}
          </div>
        </div>
      </div>

      {/* Modal para proveedor */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingProveedor ? "Editar Proveedor" : "Nuevo Proveedor"}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre del Proveedor</label>
                  <input
                    {...register("nombre")}
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo de Servicio</label>
                  <select
                    {...register("tipo_servicio")}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Seleccionar tipo</option>
                    {tiposServicio.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                  {errors.tipo_servicio && <p className="mt-1 text-sm text-red-600">{errors.tipo_servicio.message}</p>}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre de Contacto</label>
                  <input
                    {...register("contacto_nombre")}
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.contacto_nombre && (
                    <p className="mt-1 text-sm text-red-600">{errors.contacto_nombre.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email de Contacto</label>
                  <input
                    {...register("contacto_email")}
                    type="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.contacto_email && (
                    <p className="mt-1 text-sm text-red-600">{errors.contacto_email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono de Contacto</label>
                  <input
                    {...register("contacto_telefono")}
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.contacto_telefono && (
                    <p className="mt-1 text-sm text-red-600">{errors.contacto_telefono.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Sitio Web</label>
                  <input
                    {...register("sitio_web")}
                    type="url"
                    placeholder="https://ejemplo.com"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.sitio_web && <p className="mt-1 text-sm text-red-600">{errors.sitio_web.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Dirección</label>
                <input
                  {...register("direccion")}
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.direccion && <p className="mt-1 text-sm text-red-600">{errors.direccion.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ciudad</label>
                  <input
                    {...register("ciudad")}
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.ciudad && <p className="mt-1 text-sm text-red-600">{errors.ciudad.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">País</label>
                  <input
                    {...register("pais")}
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.pais && <p className="mt-1 text-sm text-red-600">{errors.pais.message}</p>}
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
                  {editingProveedor ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de detalles */}
      {showDetailModal && selectedProveedor && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">Detalles del Proveedor</h3>
              <button onClick={() => setShowDetailModal(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Building className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">{selectedProveedor.nombre}</h4>
                  <p className="text-sm text-gray-600">{selectedProveedor.tipo_servicio}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{selectedProveedor.rating}</span>
                    <span className="text-sm text-gray-500">
                      ({selectedProveedor.servicios_activos} servicios activos)
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-2">Descripción</h5>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{selectedProveedor.descripcion}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Información de Contacto</h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{selectedProveedor.contacto_nombre}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a
                        href={`mailto:${selectedProveedor.contacto_email}`}
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        {selectedProveedor.contacto_email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <a
                        href={`tel:${selectedProveedor.contacto_telefono}`}
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        {selectedProveedor.contacto_telefono}
                      </a>
                    </div>
                    {selectedProveedor.sitio_web && (
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        <a
                          href={selectedProveedor.sitio_web}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-indigo-600 hover:text-indigo-800"
                        >
                          Sitio Web
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Ubicación</h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{selectedProveedor.direccion}</span>
                    </div>
                    <div className="text-sm text-gray-600 ml-6">
                      {selectedProveedor.ciudad}, {selectedProveedor.pais}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <span className="text-sm text-gray-500">Registrado el: </span>
                  <span className="text-sm font-medium">{selectedProveedor.created_at}</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedProveedor.activo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedProveedor.activo ? "Activo" : "Inactivo"}
                </span>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t mt-6">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  setShowDetailModal(false)
                  handleEdit(selectedProveedor)
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
              >
                Editar Proveedor
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
