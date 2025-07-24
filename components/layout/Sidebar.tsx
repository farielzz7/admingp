"use client"

import Link from "next/link"
import {
  BarChart3,
  Users,
  MapPin,
  Hotel,
  Package,
  CreditCard,
  MessageSquare,
  Settings,
  UserCheck,
  Plane,
  Building,
  FileText,
  X,
} from "lucide-react"

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  currentPath: string
}

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Usuarios", href: "/usuarios", icon: Users },
  { name: "Turistas", href: "/turistas", icon: Plane },
  { name: "Roles y Permisos", href: "/roles", icon: UserCheck },
  { name: "Destinos", href: "/destinos", icon: MapPin },
  { name: "Hoteles", href: "/hoteles", icon: Hotel },
  { name: "Paquetes", href: "/paquetes", icon: Package },
  { name: "Reservas", href: "/reservas", icon: FileText },
  { name: "Pagos", href: "/pagos", icon: CreditCard },
  { name: "Proveedores", href: "/proveedores", icon: Building },
  { name: "Comentarios", href: "/comentarios", icon: MessageSquare },
  { name: "Configuración", href: "/configuracion", icon: Settings },
]

export default function Sidebar({ sidebarOpen, setSidebarOpen, currentPath }: SidebarProps) {
  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-indigo-600">
          <h1 className="text-white text-lg font-semibold">Admin Panel</h1>
          <button onClick={() => setSidebarOpen(false)} className="text-white lg:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPath === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors
                    ${isActive ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </>
  )
}
