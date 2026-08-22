import { DataSource } from 'typeorm';
import { ProductCategory, ServiceCategory } from '../common/enums';
import { Product } from '../entities/product.entity';
import { Service } from '../entities/service.entity';

const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const serviceRows = (): Partial<Service>[] => [
      {
        slug: 'cambio-aceite-filtro',
        name: 'Cambio de aceite y filtro',
        shortDescription:
          'Lubricación con aceite de grado correcto y filtro nuevo, según ficha del fabricante.',
        description:
          'Vaciamos el cárter, reemplazamos el filtro de aceite y cargamos lubricante de la viscosidad indicada para tu motor. Incluye inspección visual de fugas, nivel de refrigerante y testigo de presión.',
        durationMin: 45,
        priceFrom: 42990,
        category: ServiceCategory.LUBRICACION,
        featured: true,
        imageUrl: img('photo-1486262715619-67b85e0b08d3'),
        includes: [
          'Aceite según especificación del vehículo',
          'Filtro de aceite nuevo',
          'Revisión de niveles',
          'Registro de kilometraje',
        ],
      },
      {
        slug: 'mantenimiento-nivel-2',
        name: 'Mantenimiento de nivel 2',
        shortDescription:
          'Paquete completo: lubricación, filtros, fluidos y revisión de 20 puntos.',
        description:
          'El servicio insignia del taller. Cubrimos aceite, filtros, revisión de frenos, suspensión, correas, batería y fluidos. Entregamos un informe claro de lo que está bien y lo que conviene adelantar.',
        durationMin: 120,
        priceFrom: 89990,
        category: ServiceCategory.MANTENIMIENTO,
        featured: true,
        imageUrl: img('photo-1625047509168-a7026f36de04'),
        includes: [
          'Cambio de aceite y filtro',
          'Filtro de aire y de polen',
          'Revisión de 20 puntos',
          'Informe escrito del vehículo',
        ],
      },
      {
        slug: 'revision-20-puntos',
        name: 'Revisión de 20 puntos',
        shortDescription:
          'Chequeo técnico de seguridad: frenos, suspensión, luces y fluidos.',
        description:
          'Inspección ordenada antes de un viaje o un mantenimiento mayor. Sales con un diagnóstico priorizado.',
        durationMin: 40,
        priceFrom: 19990,
        category: ServiceCategory.DIAGNOSTICO,
        featured: false,
        imageUrl: img('photo-1619642751034-765dfdf7c58e'),
        includes: [
          'Frenos y suspensión',
          'Luces y batería',
          'Fluidos y correas',
          'Informe de prioridades',
        ],
      },
      {
        slug: 'pack-filtros',
        name: 'Pack de filtros',
        shortDescription:
          'Aire, combustible y cabina. Motor más limpio y cabina sin olores.',
        description:
          'Cambiamos los filtros que el mantenimiento de nivel 2 suele dejar para después. Usamos equivalentes de calidad original.',
        durationMin: 50,
        priceFrom: 34990,
        category: ServiceCategory.MANTENIMIENTO,
        featured: false,
        imageUrl: img('photo-1625047509168-a7026f36de04', 1200),
        includes: [
          'Filtro de aire',
          'Filtro de cabina / polen',
          'Filtro de combustible (si aplica)',
        ],
      },
      {
        slug: 'servicio-refrigerante',
        name: 'Servicio de refrigerante',
        shortDescription:
          'Flush y recarga del sistema de refrigeración con líquido de la especificación correcta.',
        description:
          'Vaciamos, enjuagamos si corresponde y recargamos con el tipo indicado. Evita mezclar colores incompatibles.',
        durationMin: 60,
        priceFrom: 39990,
        category: ServiceCategory.MANTENIMIENTO,
        featured: false,
        imageUrl: img('photo-1486262715619-67b85e0b08d3', 1200),
        includes: [
          'Drenaje del sistema',
          'Recarga con refrigerante especificado',
          'Revisión de mangueras y fugas',
        ],
      },
      {
        slug: 'frenos-inspeccion',
        name: 'Inspección y servicio de frenos',
        shortDescription:
          'Medición de pastillas y discos. Cambio e informe si corresponde.',
        description:
          'Medimos desgaste, revisamos flexibles y líquido de frenos. Cotizamos con marcas reconocidas antes de intervenir.',
        durationMin: 70,
        priceFrom: 24990,
        category: ServiceCategory.MANTENIMIENTO,
        featured: true,
        imageUrl: img('photo-1486262715619-67b85e0b08d3', 1600),
        includes: [
          'Medición de pastillas y discos',
          'Revisión de líquido de frenos',
          'Cotización de recambio si aplica',
        ],
      },
      {
        slug: 'montaje-balanceo',
        name: 'Montaje y balanceo',
        shortDescription:
          'Desmonte, montaje, válvulas y balanceo computadorizado.',
        description:
          'Montamos el neumático con máquina, cambiamos válvula si es necesario y balanceamos cada rueda.',
        durationMin: 50,
        priceFrom: 28000,
        category: ServiceCategory.NEUMATICOS,
        featured: true,
        imageUrl: img('photo-1558618666-fcd25c85cd64'),
        includes: [
          'Montaje por rueda',
          'Válvula nueva (si se requiere)',
          'Balanceo computadorizado',
          'Torque de tuercas',
        ],
      },
      {
        slug: 'alineacion',
        name: 'Alineación computarizada',
        shortDescription:
          'Geometría de dirección para que el auto no se coma las gomas ni tire a un lado.',
        description:
          'Medimos convergencia, caída y avance. Ajustamos según ficha técnica.',
        durationMin: 55,
        priceFrom: 39990,
        category: ServiceCategory.NEUMATICOS,
        featured: false,
        imageUrl: img('photo-1558618666-fcd25c85cd64', 1600),
        includes: [
          'Medición computarizada',
          'Ajuste de geometría',
          'Informe de ángulos',
        ],
      },
      {
        slug: 'diagnostico-obd',
        name: 'Diagnóstico computarizado',
        shortDescription:
          'Lectura OBD, borrado de testigos y orientación del fallo.',
        description:
          'Conectamos el escáner, leemos códigos y te explicamos qué significa el testigo.',
        durationMin: 35,
        priceFrom: 18990,
        category: ServiceCategory.DIAGNOSTICO,
        featured: false,
        imageUrl: img('photo-1619642751034-765dfdf7c58e', 1200),
        includes: [
          'Lectura de códigos OBD',
          'Interpretación del fallo',
          'Cotización de reparación si aplica',
        ],
      },
      {
        slug: 'cambio-bateria',
        name: 'Diagnóstico y cambio de batería',
        shortDescription:
          'Test de carga y reemplazo con amperaje correcto para tu vehículo.',
        description:
          'Probamos la batería y el sistema de carga. Si hay que cambiarla, cotizamos CCA y tamaño exactos.',
        durationMin: 30,
        priceFrom: 14990,
        category: ServiceCategory.MANTENIMIENTO,
        featured: false,
        imageUrl: img('photo-1619642751034-765dfdf7c58e', 1400),
        includes: [
          'Test de batería y alternador',
          'Instalación',
          'Reciclaje de la batería usada',
        ],
      },
    ];

const productRows = (): Partial<Product>[] => [
      {
        slug: 'mobil-1-5w30',
        name: 'Mobil 1 5W-30 sintético 4L',
        brand: 'Mobil',
        sku: 'MOB-5W30-4L',
        shortDescription: 'Sintético de alto rendimiento para motores modernos.',
        description:
          'Aceite 100% sintético 5W-30. Protege en arranque en frío y a alta temperatura.',
        category: ProductCategory.LUBRICANTE,
        priceFrom: 42990,
        featured: true,
        inStock: true,
        imageUrl: img('photo-1625047509168-a7026f36de04', 900),
        specs: { viscosidad: '5W-30', presentacion: '4 L', tipo: 'Sintético' },
      },
      {
        slug: 'shell-helix-ultra-5w40',
        name: 'Shell Helix Ultra 5W-40 4L',
        brand: 'Shell',
        sku: 'SHU-5W40-4L',
        shortDescription:
          'Sintético PurePlus. Limpieza interna y protección prolongada.',
        description:
          'Helix Ultra 5W-40 para motores que requieren esa viscosidad.',
        category: ProductCategory.LUBRICANTE,
        priceFrom: 39990,
        featured: true,
        inStock: true,
        imageUrl: img('photo-1486262715619-67b85e0b08d3', 900),
        specs: { viscosidad: '5W-40', presentacion: '4 L', tipo: 'Sintético' },
      },
      {
        slug: 'castrol-edge-5w30',
        name: 'Castrol EDGE 5W-30 4L',
        brand: 'Castrol',
        sku: 'CE-5W30-4L',
        shortDescription:
          'Película resistente bajo carga. Ideal para motores turbo.',
        description:
          'Tecnología Fluid Titanium. Recomendado para motores turbo nafteros que exigen 5W-30.',
        category: ProductCategory.LUBRICANTE,
        priceFrom: 44990,
        featured: false,
        inStock: true,
        imageUrl: img('photo-1625047509168-a7026f36de04', 900),
        specs: { viscosidad: '5W-30', presentacion: '4 L', tipo: 'Sintético' },
      },
      {
        slug: 'valvoline-synpower-0w20',
        name: 'Valvoline SynPower 0W-20 4L',
        brand: 'Valvoline',
        sku: 'VAL-0W20-4L',
        shortDescription: 'Baja viscosidad para motores de última generación.',
        description:
          '0W-20 sintético para fichas que piden ahorro de combustible y arranque inmediato.',
        category: ProductCategory.LUBRICANTE,
        priceFrom: 41990,
        featured: false,
        inStock: true,
        imageUrl: img('photo-1486262715619-67b85e0b08d3', 800),
        specs: { viscosidad: '0W-20', presentacion: '4 L', tipo: 'Sintético' },
      },
      {
        slug: 'filtro-aceite-mann',
        name: 'Filtro de aceite Mann Filter',
        brand: 'Mann Filter',
        sku: 'MANN-OIL-GEN',
        shortDescription:
          'Equivalente de calidad original. Cotizamos según patente.',
        description:
          'Filtros de aceite Mann. Indica marca, modelo y año para cotizar el código exacto.',
        category: ProductCategory.FILTRO,
        priceFrom: 8990,
        featured: true,
        inStock: true,
        imageUrl: img('photo-1619642751034-765dfdf7c58e', 900),
        specs: { tipo: 'Aceite', origen: 'Equivalente OE' },
      },
      {
        slug: 'filtro-aire-bosch',
        name: 'Filtro de aire Bosch',
        brand: 'Bosch',
        sku: 'BOSCH-AIR-GEN',
        shortDescription:
          'Aire limpio al motor. Menos esfuerzo y mejor combustión.',
        description: 'Filtro de aire Bosch según ficha del vehículo.',
        category: ProductCategory.FILTRO,
        priceFrom: 12990,
        featured: false,
        inStock: true,
        imageUrl: img('photo-1625047509168-a7026f36de04', 800),
        specs: { tipo: 'Aire' },
      },
      {
        slug: 'filtro-cabina-bosch',
        name: 'Filtro de cabina / polen Bosch',
        brand: 'Bosch',
        sku: 'BOSCH-CAB-GEN',
        shortDescription:
          'Aire más limpio en el habitáculo. Menos olor a humedad.',
        description:
          'El filtro de cabina se olvida y es el que más se nota al cambiarlo.',
        category: ProductCategory.FILTRO,
        priceFrom: 14990,
        featured: false,
        inStock: true,
        imageUrl: img('photo-1619642751034-765dfdf7c58e', 800),
        specs: { tipo: 'Cabina' },
      },
      {
        slug: 'michelin-primacy-4-205-55-r16',
        name: 'Michelin Primacy 4 205/55 R16',
        brand: 'Michelin',
        sku: 'MICH-P4-20555R16',
        shortDescription:
          'Frenado mojado y kilometraje alto. Medida urbana más pedida.',
        description:
          'Primacy 4 en 205/55 R16. Precio referencial por unidad; el set de 4 incluye cotización de montaje.',
        category: ProductCategory.NEUMATICO,
        priceFrom: 119990,
        featured: true,
        inStock: true,
        imageUrl: img('photo-1558618666-fcd25c85cd64', 1000),
        specs: { medida: '205/55 R16', indice: '91V', uso: 'Touring' },
      },
      {
        slug: 'bridgestone-turanza-215-55-r17',
        name: 'Bridgestone Turanza T005 215/55 R17',
        brand: 'Bridgestone',
        sku: 'BRI-T005-21555R17',
        shortDescription:
          'Confort de marcha y buen comportamiento en carretera.',
        description:
          'Turanza T005, una de las medidas más usadas en sedanes y crossovers.',
        category: ProductCategory.NEUMATICO,
        priceFrom: 139990,
        featured: true,
        inStock: true,
        imageUrl: img('photo-1552519507-da3b142c6e3d', 1000),
        specs: { medida: '215/55 R17', uso: 'Touring' },
      },
      {
        slug: 'continental-ultracontact-225-45-r17',
        name: 'Continental UltraContact 225/45 R17',
        brand: 'Continental',
        sku: 'CONT-UC-22545R17',
        shortDescription:
          'Agarre firme. Medida habitual en compactos deportivos.',
        description: 'UltraContact 225/45 R17. Precio desde, por unidad.',
        category: ProductCategory.NEUMATICO,
        priceFrom: 149990,
        featured: false,
        inStock: true,
        imageUrl: img('photo-1558618666-fcd25c85cd64', 1100),
        specs: { medida: '225/45 R17', uso: 'Performance' },
      },
      {
        slug: 'pirelli-cinturato-185-65-r15',
        name: 'Pirelli Cinturato P1 185/65 R15',
        brand: 'Pirelli',
        sku: 'PIR-P1-18565R15',
        shortDescription:
          'Medida clásica de citycar. Buen rendimiento por kilómetro.',
        description: 'Cinturato P1 en 185/65 R15, común en hatchbacks.',
        category: ProductCategory.NEUMATICO,
        priceFrom: 79990,
        featured: false,
        inStock: true,
        imageUrl: img('photo-1552519507-da3b142c6e3d', 900),
        specs: { medida: '185/65 R15', uso: 'Urbano' },
      },
      {
        slug: 'goodyear-efficientgrip-195-65-r15',
        name: 'Goodyear EfficientGrip 195/65 R15',
        brand: 'Goodyear',
        sku: 'GY-EG-19565R15',
        shortDescription: 'Bajo consumo y frenado estable en ciudad.',
        description: 'EfficientGrip Performance en 195/65 R15.',
        category: ProductCategory.NEUMATICO,
        priceFrom: 84990,
        featured: false,
        inStock: true,
        imageUrl: img('photo-1558618666-fcd25c85cd64', 900),
        specs: { medida: '195/65 R15', uso: 'Touring' },
      },
      {
        slug: 'pastillas-brembo-delanteras',
        name: 'Pastillas de freno Brembo delanteras',
        brand: 'Brembo',
        sku: 'BREM-PAD-F',
        shortDescription:
          'Compuesto cerámico / semi-metálico según modelo.',
        description: 'Pastillas Brembo cotizadas por patente.',
        category: ProductCategory.REPUESTO,
        priceFrom: 45990,
        featured: true,
        inStock: true,
        imageUrl: img('photo-1486262715619-67b85e0b08d3', 1000),
        specs: { eje: 'Delantero', tipo: 'Pastillas' },
      },
      {
        slug: 'bateria-bosch-s4',
        name: 'Batería Bosch S4 12V',
        brand: 'Bosch',
        sku: 'BOSCH-S4',
        shortDescription: 'CCA según ficha. Instalación y retiro de la usada.',
        description:
          'Línea S4 de Bosch. Cotizamos amperaje y bornes. Garantía de fábrica.',
        category: ProductCategory.BATERIA,
        priceFrom: 89990,
        featured: true,
        inStock: true,
        imageUrl: img('photo-1619642751034-765dfdf7c58e', 1000),
        specs: { voltaje: '12V', linea: 'S4' },
      },
      {
        slug: 'bujias-ngk-laser',
        name: 'Juego de bujías NGK Laser Iridium',
        brand: 'NGK',
        sku: 'NGK-LIR',
        shortDescription: 'Iridio de larga duración. Grado térmico correcto.',
        description: 'Bujías NGK según código del motor. Cotizamos el set completo.',
        category: ProductCategory.REPUESTO,
        priceFrom: 32990,
        featured: false,
        inStock: true,
        imageUrl: img('photo-1625047509168-a7026f36de04', 900),
        specs: { tipo: 'Iridium', unidad: 'Juego' },
      },
      {
        slug: 'amortiguadores-monroe-par',
        name: 'Amortiguadores Monroe (par)',
        brand: 'Monroe',
        sku: 'MON-SHK-PAIR',
        shortDescription:
          'Par delantero o trasero. Recomendamos cambiar de a dos.',
        description: 'Amortiguadores Monroe cotizados por eje.',
        category: ProductCategory.REPUESTO,
        priceFrom: 129990,
        featured: false,
        inStock: true,
        imageUrl: img('photo-1625047509168-a7026f36de04', 1000),
        specs: { unidad: 'Par', marca: 'Monroe' },
      },
      {
        slug: 'kit-distribucion-gates',
        name: 'Kit de distribución Gates',
        brand: 'Gates',
        sku: 'GATES-TB-KIT',
        shortDescription:
          'Correa, tensores y bomba de agua cuando el kit lo trae.',
        description: 'Kit Gates según motor. Mano de obra aparte.',
        category: ProductCategory.REPUESTO,
        priceFrom: 159990,
        featured: false,
        inStock: true,
        imageUrl: img('photo-1486262715619-67b85e0b08d3', 1000),
        specs: { tipo: 'Kit distribución' },
      },
      {
        slug: 'wiper-bosch-aerotwin',
        name: 'Limpiaparabrisas Bosch Aerotwin (par)',
        brand: 'Bosch',
        sku: 'BOSCH-AERO',
        shortDescription:
          'Escobillas planas. Medidas exactas según tu parabrisas.',
        description: 'Par de escobillas Aerotwin. Cotiza con patente.',
        category: ProductCategory.REPUESTO,
        priceFrom: 24990,
        featured: false,
        inStock: true,
        imageUrl: img('photo-1619642751034-765dfdf7c58e', 800),
        specs: { unidad: 'Par', tipo: 'Plano' },
      },
    ];

export async function seedIfEmpty(dataSource: DataSource): Promise<void> {
  const services = dataSource.getRepository(Service);
  const products = dataSource.getRepository(Product);
  const count = await services.count();
  if (count > 0) {
    console.log('Base local ya tiene datos; se omite el seed.');
    return;
  }
  console.log('Sembrando catálogo local (SQLite)…');
  await services.save(serviceRows());
  await products.save(productRows());
  console.log('Seed listo.');
}
