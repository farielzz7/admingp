"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const generalSchema = yup.object({
  sitio_nombre: yup.string().required("Nombre del sitio es requerido"),
  sitio_descripcion: yup.string().required("Descripción es requerida"),
  sitio_url: yup.string().url("URL inválida").required("URL del sitio es requerida"),
  contacto_email: yup.string().email("Email inválido").required("Email de contacto es requerido"),
  contacto_telefono: yup.string().required("Teléfono es requerido"),
  direccion: yup.string().required("Dirección es requerida"),
  moneda_default: yup.string().required("Moneda por defecto es requerida"),
  idioma_default: yup.string().required("Idioma por defecto es requerido"),
})

const emailSchema = yup.object({
  smtp_host: yup.string().required("Host SMTP es requerido"),
  smtp_puerto: yup.number().required("Puerto SMTP es requerido"),
  smtp_usuario: yup.string().required("Usuario SMTP es requerido"),
  smtp_password: yup.string().required("Contraseña SMTP es requerida"),
  email_from: yup.string().email("Email inválido").required("Email remitente es requerido"),
  email_from_name: yup.string().required("Nombre remitente es requerido"),
})

const pagoSchema = yup.object({
  stripe_public_key: yup.string().required("Clave pública de Stripe es requerida"),
  stripe_secret_key: yup.string().required("Clave secreta de Stripe es requerida"),
  paypal_client_id: yup.string().required("Client ID de PayPal es requerido"),
  paypal_secret: yup.string().required("Secret de PayPal es requerido"),
  comision_porcentaje: yup.number().min(0).max(100).required("Porcentaje de comisión es requerido"),
})

type GeneralForm = yup.InferType<typeof generalSchema>
type EmailForm = yup.InferType<typeof emailSchema>
type PagoForm = yup.InferType<typeof pagoSchema>

export default function Configuracion() {
  const [activeTab, setActiveTab] = useState("general")
  const [loading, setLoading] = useState(false)

  const generalForm = useForm<GeneralForm>({
    resolver: yupResolver(generalSchema),
    defaultValues: {
      sitio_nombre: "TurismoApp",
      sitio_descripcion: "Plataforma de gestión turística",
      sitio_url: "https://turismoapp.com",
      contacto_email: "contacto@turismoapp.com",
      contacto_telefono: "+1 555 123 4567",
      direccion: "123 Calle Principal, Ciudad",
      moneda_default: "USD",
      idioma_default: "es",
    },
  })

  const emailForm = useForm<EmailForm>({
    resolver: yupResolver(emailSchema),
    defaultValues: {
      smtp_host: "smtp.gmail.com",
      smtp_puerto: 587,
      smtp_usuario: "noreply@turismoapp.com",
      smtp_password: "",
      email_from: "noreply@turismoapp.com",
      email_from_name: "TurismoApp",
    },
  })

  const pagoForm = useForm<PagoForm>({
