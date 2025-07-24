"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/layout/AdminLayout"
import DataTable from "@/components/ui/DataTable"
import ExportButtons from "@/components/ui/ExportButtons"
import { Search, Star, User, Package, Calendar, Eye, Trash2, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react"

interface Comentario {
  id: number
  turista_id: number
  turista_nombre: string
  turista_email: string
  paquete_id: number
  paquete_nombre: string
  calificacion: number
  titulo: string
  comentario: string
  estado: "Pendiente" | "Aprobado" | "Rechazado"
  fecha_viaje: string
  util_positivo: number
  util_negativo: number
  respuesta_admin: string
  created_at: string
}

export default function Comentarios() {
  const [comentarios, setComentarios] = useState<Comentario[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEstado, setFilterEstado] = useState("")
  const [filterCalificacion, setFilterCalificacion] = useState("")
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedComentario, setSelectedComentario] = useState<Comentario | null>(null)
  const [respuestaAdmin, setRespuestaAdmin] = useState("")

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setComentarios([
        {
          id: 1,
          turista_id: 1,
          turista_nombre: "Ana Martínez",
          turista_email: "ana@ejemplo.com",
          paquete_id: 1,
          paquete_nombre: "Cancún Paradise",
          calificacion: 5,
          titulo: "Experiencia increíble",
          comentario:
            "El hotel fue espectacular, la comida deliciosa y el personal muy amable. Las actividades acuáticas fueron lo mejor del viaje. Definitivamente regresaría.",
          estado: "Aprobado",
          fecha_viaje: "2024-01-15",
          util_positivo: 12,
          util_negativo: 1,
          respuesta_admin: "¡Gracias por tu comentario! Nos alegra saber que disfrutaste tu estadía.",
          created_at: "2024-01-20",
        },
        {
          id: 2,
          turista_id: 2,
          turista_nombre: "John Smith",
          turista_email: "john@example.com",
          paquete_id: 2,
          paquete_nombre: "Aventura Inca",
          calificacion: 4,
          titulo: "Muy buena experiencia",
          comentario:
            "El tour a Machu Picchu fue increíble, aunque el clima no ayudó mucho. El guía era muy conocedor de la historia. Recomendado para aventureros.",
          estado: "Aprobado",
          fecha_viaje: "2024-02-01",
          util_positivo: 8,
          util_negativo: 0,
          respuesta_admin: "",
          created_at: "2024-02-05",
        },
        {
          id: 3,
          turista_id: 3,
          turista_nombre: "María García",
          turista_email: "maria@ejemplo.com",
          paquete_id: 3,
          paquete_nombre: "París Romántico",
          calificacion: 3,
          titulo: "Podría mejorar",
          comentario:
            "El hotel estaba bien ubicado pero las habitaciones necesitan renovación. La cena romántica fue decepcionante. El tour por la ciudad estuvo bien.",
          estado: "Pendiente",
          fecha_viaje: "2024-02-10",
          util_positivo: 3,
          util_negativo: 5,
          respuesta_admin: "",
          created_at: "2024-02-15",
        },
        {
          id: 4,
          turista_id: 4,
          turista_nombre: "Carlos López",
          turista_email: "carlos@ejemplo.com",
          paquete_id: 1,
          paquete_nombre: "Cancún Paradise",
          calificacion: 2,
          titulo: "No cumplió expectativas",
          comentario:
            "El servicio fue muy lento, la comida no era fresca y las instalaciones estaban sucias. No recomiendo este lugar para familias.",
          estado: "Rechazado",
          fecha_viaje: "2024-01-25",
          util_positivo: 1,
          util_negativo: 8,
          respuesta_admin: "Lamentamos tu experiencia. Hemos tomado medidas para mejorar nuestros servicios.",
          created_at: "2024-01-30",
        },
        {
          id: 5,
          turista_id: 5,
          turista_nombre: "Laura Rodríguez",
          turista_email: "laura@ejemplo.com",
          paquete_id: 2,
          paquete_nombre: "Aventura Inca",
          calificacion: 5,
          titulo: "¡Espectacular!",
          comentario:
            "Una experiencia única en la vida. El amanecer en Machu Picchu fue mágico. Todo el equipo fue profesional y atento. Vale cada peso invertido.",
          estado: "Pendiente",
          fecha_viaje: "2024-02-20",
          util_positivo: 15,
          util_negativo: 0,
          respuesta_admin: "",
          created_at: "2024-02-25",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Aprobado":
        return "bg-green-100 text-green-800"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "Rechazado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "turista_nombre",
      header: "Cliente",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-600" />
          <div>
            <div className="font-medium">{row.original.turista_nombre}</div>
            <div className="text-sm text-gray-500">{row.original.turista_email}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "paquete_nombre",
      header: "Paquete",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-2">
          <Package className="w-4 h-4 text-purple-600" />
          <span className="font-medium">{row.original.paquete_nombre}</span>
        </div>
      ),
    },
    {
      accessorKey: "calificacion",
      header: "Calificación",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">{renderStars(row.original.calificacion)}</div>
          <span className="text-sm font-medium">({row.original.calificacion}/5)</span>
        </div>
      ),
    },
    {
      accessorKey: "titulo",
      header: "Comentario",
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium text-sm">{row.original.titulo}</div>
          <div className="text-xs text-gray-500 truncate max-w-xs">{row.original.comentario.substring(0, 80)}...</div>
        </div>
      ),
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(row.original.estado)}`}>
          {row.original.estado}
        </span>
      ),
    },
    {
      accessorKey: "util_positivo",
      header: "Utilidad",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <ThumbsUp className="w-3 h-3 text-green-600" />
            <span className="text-xs">{row.original.util_positivo}</span>
          </div>
          <div className="flex items-center space-x-1">
            <ThumbsDown className="w-3 h-3 text-red-600" />
            <span className="text-xs">{row.original.util_negativo}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Fecha",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span className="text-sm">{row.original.created_at}</span>
        </div>
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

  const filteredComentarios = comentarios.filter((comentario) => {
    const matchesSearch =
      comentario.turista_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comentario.paquete_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comentario.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comentario.comentario.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesEstado = filterEstado === "" || comentario.estado === filterEstado
    const matchesCalificacion = filterCalificacion === "" || comentario.calificacion.toString() === filterCalificacion

    return matchesSearch && matchesEstado && matchesCalificacion
  })

  const exportColumns = [
    { key: "id", header: "ID" },
    { key: "turista_nombre", header: "Cliente" },
    { key: "turista_email", header: "Email" },
    { key: "paquete_nombre", header: "Paquete" },
    { key: "calificacion", header: "Calificación" },
    { key: "titulo", header: "Título" },
    { key: "comentario", header: "Comentario" },
    { key: "estado", header: "Estado" },
    { key: "fecha_viaje", header: "Fecha Viaje" },
    { key: "created_at", header: "Fecha Comentario" },
  ]

  const handleViewDetail = (comentario: Comentario) => {
    setSelectedComentario(comentario)
    setRespuestaAdmin(comentario.respuesta_admin || "")
    setShowDetailModal(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este comentario?")) {
      setComentarios(comentarios.filter((c) => c.id !== id))
    }
  }

  const handleUpdateEstado = (id: number, nuevoEstado: string) => {
    setComentarios(comentarios.map((c) => (c.id === id ? { ...c, estado: nuevoEstado as any } : c)))
  }

  const handleSaveRespuesta = () => {
    if (selectedComentario) {
      setComentarios(
        comentarios.map((c) => (c.id === selectedComentario.id ? { ...c, respuesta_admin: respuestaAdmin } : c)),
      )
      setShowDetailModal(false)
    }
  }

  // Calcular estadísticas
  const stats = {
    total: comentarios.length,
    pendientes: comentarios.filter((c) => c.estado === "Pendiente").length,
    aprobados: comentarios.filter((c) => c.estado === "Aprobado").length,
    rechazados: comentarios.filter((c) => c.estado === "Rechazado").length,
    promedioCalificacion:
      comentarios.length > 0
        ? (comentarios.reduce((sum, c) => sum + c.calificacion, 0) / comentarios.length).toFixed(1)
        : "0",
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Gestión de Comentarios</h1>
            <p className="mt-1 text-sm text-gray-600">Administra los comentarios y calificaciones de los clientes</p>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-lg font-semibold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-lg font-semibold text-gray-900">{stats.pendientes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Aprobados</p>
                <p className="text-lg font-semibold text-gray-900">{stats.aprobados}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Rechazados</p>
                <p className="text-lg font-semibold text-gray-900">{stats.rechazados}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Promedio</p>
                <p className="text-lg font-semibold text-gray-900">{stats.promedioCalificacion}/5</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Buscar comentarios..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <select
                  value={filterEstado}
                  onChange={(e) => setFilterEstado(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Todos los estados</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Aprobado">Aprobado</option>
                  <option value="Rechazado">Rechazado</option>
                </select>

                <select
                  value={filterCalificacion}
                  onChange={(e) => setFilterCalificacion(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Todas las calificaciones</option>
                  <option value="5">5 estrellas</option>
                  <option value="4">4 estrellas</option>
                  <option value="3">3 estrellas</option>
                  <option value="2">2 estrellas</option>
                  <option value="1">1 estrella</option>
                </select>
              </div>

              <ExportButtons data={filteredComentarios} filename="comentarios" columns={exportColumns} />
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <DataTable data={filteredComentarios} columns={columns} />
            )}
          </div>
        </div>
      </div>

      {/* Modal de detalles */}
      {showDetailModal && selectedComentario && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">Detalles del Comentario</h3>
              <button onClick={() => setShowDetailModal(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cliente</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedComentario.turista_nombre}</p>
                  <p className="text-xs text-gray-500">{selectedComentario.turista_email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Paquete</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedComentario.paquete_nombre}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Calificación</label>
                  <div className="mt-1 flex items-center space-x-2">
                    <div className="flex space-x-1">{renderStars(selectedComentario.calificacion)}</div>
                    <span className="text-sm font-medium">({selectedComentario.calificacion}/5)</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado</label>
                  <div className="mt-1">
                    <select
                      value={selectedComentario.estado}
                      onChange={(e) => handleUpdateEstado(selectedComentario.id, e.target.value)}
                      className="text-sm border border-gray-300 rounded px-3 py-1"
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Aprobado">Aprobado</option>
                      <option value="Rechazado">Rechazado</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha del Viaje</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedComentario.fecha_viaje}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Título</label>
                <p className="mt-1 text-sm text-gray-900 font-medium">{selectedComentario.titulo}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Comentario</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-4 rounded-md">{selectedComentario.comentario}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Utilidad</label>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{selectedComentario.util_positivo} útiles</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ThumbsDown className="w-4 h-4 text-red-600" />
                      <span className="text-sm">{selectedComentario.util_negativo} no útiles</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha del Comentario</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedComentario.created_at}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Respuesta del Administrador</label>
                <textarea
                  value={respuestaAdmin}
                  onChange={(e) => setRespuestaAdmin(e.target.value)}
                  rows={4}
                  placeholder="Escribe una respuesta al comentario..."
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t mt-6">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveRespuesta}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
              >
                Guardar Respuesta
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
