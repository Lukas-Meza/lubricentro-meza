import { formatClp } from './format';
import type { QuoteSelection } from '../types';

export function whatsappUrl(phone: string, text: string): string {
  const digits = phone.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function defaultWhatsappMessage(shopName: string): string {
  return `Hola ${shopName}, quiero cotizar un servicio / producto.`;
}

export function buildQuoteWhatsappMessage(input: {
  shopName: string;
  items: QuoteSelection[];
  name?: string;
  phone?: string;
  email?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  message?: string;
}): string {
  const { shopName, items } = input;
  const lines: string[] = [
    `Hola ${shopName}, quiero cotizar lo siguiente:`,
    '',
  ];

  let total = 0;
  let hasPricedItems = false;

  for (const item of items) {
    const unit = item.priceFrom;
    const qty = item.quantity;
    const kind = item.kind === 'SERVICE' ? 'Servicio' : 'Producto';

    if (unit != null) {
      const lineTotal = unit * qty;
      total += lineTotal;
      hasPricedItems = true;
      lines.push(
        `• [${kind}] ${item.name}`,
        `  Cantidad: ${qty}`,
        `  Precio desde: ${formatClp(unit)} c/u`,
        `  Subtotal: ${formatClp(lineTotal)}`,
        '',
      );
    } else {
      lines.push(
        `• [${kind}] ${item.name}`,
        `  Cantidad: ${qty}`,
        `  Precio: a cotizar`,
        '',
      );
    }
  }

  if (hasPricedItems) {
    lines.push(`Total referencial: ${formatClp(total)}`);
    lines.push('(Precio final según vehículo y stock del día)');
    lines.push('');
  }

  const vehicle = [input.vehicleMake, input.vehicleModel, input.vehicleYear]
    .filter(Boolean)
    .join(' ');

  if (vehicle) lines.push(`Vehículo: ${vehicle}`);
  if (input.name?.trim()) lines.push(`Nombre: ${input.name.trim()}`);
  if (input.phone?.trim()) lines.push(`Teléfono: ${input.phone.trim()}`);
  if (input.email?.trim()) lines.push(`Correo: ${input.email.trim()}`);
  if (input.message?.trim()) {
    lines.push('');
    lines.push(`Comentario: ${input.message.trim()}`);
  }

  return lines.join('\n').trim();
}
