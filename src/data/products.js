export const initialProducts = [
  {
    id: "HW-001",
    name: "Servidor Empresarial Dell PowerEdge R750",
    category: "Hardware",
    price: 18500000,
    stock: 5,
    rating: 4.9,
    reviewsCount: 12,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop",
    description: "Servidor de alto rendimiento equipado con procesadores Intel Xeon Scalable, ideal para centros de datos y entornos de virtualización crítica.",
    attributes: {
      type: "Físico",
      brand: "Dell Technologies",
      warrantyMonths: 36,
      serialTracked: true,
      sku: "DELL-R750-2026",
      weightKg: 28.5
    },
    recommendedAddons: [
      { id: "ADD-001", name: "Servicio de Montaje en Rack e Instalación Física", price: 450000, category: "Servicio" },
      { id: "ADD-002", name: "Extensión de Garantía ProSupport 24/7 (1 año extra)", price: 1200000, category: "Servicio" }
    ]
  },
  {
    id: "SW-002",
    name: "Licencia Anual Microsoft 365 Business Premium",
    category: "Software",
    price: 780000,
    stock: 999,
    rating: 4.8,
    reviewsCount: 45,
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=500&auto=format&fit=crop",
    description: "Suite completa de productividad en la nube con seguridad avanzada contra ciberamenazas y gestión de dispositivos móviles.",
    attributes: {
      type: "Digital / Licencia",
      licenseType: "Suscripción Anual Cloud",
      maxUsers: 5,
      deliveryMethod: "Código Digital e-Email (Inmediato)",
      downloadUrl: "https://portal.office.com"
    },
    recommendedAddons: [
      { id: "ADD-003", name: "Servicio de Migración de Correo a Microsoft Exchange", price: 350000, category: "Servicio" }
    ]
  },
  {
    id: "SV-003",
    name: "Mantenimiento Preventivo y Correctivo de Cómputo (In Situ)",
    category: "Servicio",
    price: 180000,
    stock: 50,
    rating: 5.0,
    reviewsCount: 28,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&auto=format&fit=crop",
    description: "Servicio técnico especializado para limpieza física, optimización térmica de procesadores, actualización de controladores y diagnóstico integral.",
    attributes: {
      type: "Asistencia Técnica",
      modality: "Presencial Bogotá / D.C.",
      durationHours: 3,
      certifiedTechs: "Técnicos SENA Certificados",
      includesReport: "Informe técnico de diagnóstico previo y posterior"
    },
    recommendedAddons: []
  },
  {
    id: "HW-004",
    name: "Kit Router Mesh Industrial Wi-Fi 6 CiberShop X1",
    category: "Hardware",
    price: 1250000,
    stock: 15,
    rating: 4.7,
    reviewsCount: 19,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&auto=format&fit=crop",
    description: "Sistema de red empresarial con cobertura de hasta 600m², cifrado WPA3 y soporte de múltiples SSID para optimización de ancho de banda.",
    attributes: {
      type: "Físico",
      brand: "CiberShop Tech",
      warrantyMonths: 24,
      serialTracked: true,
      sku: "CIBER-MESH-W6"
    },
    recommendedAddons: [
      { id: "ADD-004", name: "Configuración de Red VLAN y Políticas de Seguridad", price: 220000, category: "Servicio" }
    ]
  },
  {
    id: "SW-005",
    name: "Antivirus Kaspersky Endpoint Security Cloud (10 Nodos)",
    category: "Software",
    price: 920000,
    stock: 500,
    rating: 4.6,
    reviewsCount: 31,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&auto=format&fit=crop",
    description: "Protección corporativa basada en inteligencia artificial contra ransomware, malware de día cero y ataques de phishing.",
    attributes: {
      type: "Digital / Licencia",
      licenseType: "Suscripción Anual 10 Dispositivos",
      deliveryMethod: "Consola de administración Cloud",
      supportIncluded: true
    },
    recommendedAddons: [
      { id: "ADD-005", name: "Instalación Remota y Despliegue de Agentes Endpoint", price: 150000, category: "Servicio" }
    ]
  },
  {
    id: "SV-006",
    name: "Auditoría de Ciberseguridad y Escaneo de Vulnerabilidades",
    category: "Servicio",
    price: 2500000,
    stock: 10,
    rating: 4.9,
    reviewsCount: 8,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop",
    description: "Análisis exhaustivo de puertos, pruebas de penetración éticas (PenTesting) y plan de mitigación ajustado a la normativa colombiana de protección de datos.",
    attributes: {
      type: "Consultoría Especializada",
      modality: "Remoto / Híbrido",
      durationHours: 20,
      complianceStandard: "ISO 27001 / OWASP Top 10"
    },
    recommendedAddons: []
  }
];

export const initialReviews = [
  {
    id: 1,
    productId: "HW-001",
    author: "Ing. Fernando Gómez",
    rating: 5,
    date: "2026-05-18",
    verifiedBuyer: true,
    comment: "Excelente servidor para nuestra infraestructura. La entrega con Ciber Shop Colombia fue puntual y el servicio de montaje opcional facilitó el despliegue."
  },
  {
    id: 2,
    productId: "SW-002",
    author: "María Paula Torres",
    rating: 5,
    date: "2026-05-20",
    verifiedBuyer: true,
    comment: "Las licencias llegaron al correo en menos de 10 minutos. Todo 100% legal y activado correctamente en la plataforma de Microsoft."
  },
  {
    id: 3,
    productId: "SV-003",
    author: "Carlos E. Ramírez",
    rating: 5,
    date: "2026-05-22",
    verifiedBuyer: true,
    comment: "El técnico del SENA llegó con todas las herramientas necesarias y dejó los equipos del laboratorio impecables. Muy recomendado."
  }
];
