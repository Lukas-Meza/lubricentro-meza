// Limites alineados con el schema del backend (POST /api/quotes)
export const QUOTE_LIMITS = {
  name: { min: 2, max: 80 },
  phone: { min: 8, max: 20 },
  email: { max: 120 },
  vehicleMake: { max: 40 },
  vehicleModel: { max: 40 },
  vehicleYear: {
    min: 1985,
    max: new Date().getFullYear() + 1,
  },
  message: { max: 800 },
} as const;

export type QuoteFormValues = {
  name: string;
  phone: string;
  email: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  message: string;
};

export type QuoteFormErrors = Partial<Record<keyof QuoteFormValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateQuoteForm(values: QuoteFormValues): QuoteFormErrors {
  const errors: QuoteFormErrors = {};
  const name = values.name.trim();
  const phone = values.phone.trim();
  const email = values.email.trim();
  const make = values.vehicleMake.trim();
  const model = values.vehicleModel.trim();
  const yearRaw = values.vehicleYear.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = 'El nombre es obligatorio.';
  } else if (name.length < QUOTE_LIMITS.name.min) {
    errors.name = `El nombre debe tener al menos ${QUOTE_LIMITS.name.min} caracteres.`;
  } else if (name.length > QUOTE_LIMITS.name.max) {
    errors.name = `El nombre no puede superar ${QUOTE_LIMITS.name.max} caracteres.`;
  }

  if (!phone) {
    errors.phone = 'El teléfono es obligatorio.';
  } else if (phone.length < QUOTE_LIMITS.phone.min) {
    errors.phone = `El teléfono debe tener al menos ${QUOTE_LIMITS.phone.min} caracteres.`;
  } else if (phone.length > QUOTE_LIMITS.phone.max) {
    errors.phone = `El teléfono no puede superar ${QUOTE_LIMITS.phone.max} caracteres.`;
  } else if ((phone.match(/\d/g) ?? []).length < 8) {
    errors.phone = 'Ingresa un teléfono válido (al menos 8 dígitos).';
  }

  if (email) {
    if (email.length > QUOTE_LIMITS.email.max) {
      errors.email = `El correo no puede superar ${QUOTE_LIMITS.email.max} caracteres.`;
    } else if (!emailPattern.test(email)) {
      errors.email = 'El correo no tiene un formato válido.';
    }
  }

  if (make.length > QUOTE_LIMITS.vehicleMake.max) {
    errors.vehicleMake = `La marca no puede superar ${QUOTE_LIMITS.vehicleMake.max} caracteres.`;
  }

  if (model.length > QUOTE_LIMITS.vehicleModel.max) {
    errors.vehicleModel = `El modelo no puede superar ${QUOTE_LIMITS.vehicleModel.max} caracteres.`;
  }

  if (yearRaw) {
    if (!/^\d{4}$/.test(yearRaw)) {
      errors.vehicleYear = 'El año debe tener 4 dígitos.';
    } else {
      const year = Number(yearRaw);
      if (
        year < QUOTE_LIMITS.vehicleYear.min ||
        year > QUOTE_LIMITS.vehicleYear.max
      ) {
        errors.vehicleYear = `El año debe estar entre ${QUOTE_LIMITS.vehicleYear.min} y ${QUOTE_LIMITS.vehicleYear.max}.`;
      }
    }
  }

  if (message.length > QUOTE_LIMITS.message.max) {
    errors.message = `El comentario no puede superar ${QUOTE_LIMITS.message.max} caracteres.`;
  }

  return errors;
}
