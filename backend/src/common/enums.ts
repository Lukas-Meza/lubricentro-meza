export enum ServiceCategory {
  LUBRICACION = 'LUBRICACION',
  MANTENIMIENTO = 'MANTENIMIENTO',
  NEUMATICOS = 'NEUMATICOS',
  DIAGNOSTICO = 'DIAGNOSTICO',
}

// Categorias para filtrar el catalogo en el front
export enum ProductCategory {
  LUBRICANTE = 'LUBRICANTE',
  FILTRO = 'FILTRO',
  NEUMATICO = 'NEUMATICO',
  REPUESTO = 'REPUESTO',
  BATERIA = 'BATERIA',
}

// Por si mas adelante quiero un panel interno de cotizaciones
export enum QuoteStatus {
  PENDING = 'PENDING',
  CONTACTED = 'CONTACTED',
  CLOSED = 'CLOSED',
}

export enum QuoteItemKind {
  SERVICE = 'SERVICE',
  PRODUCT = 'PRODUCT',
}
