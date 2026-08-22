export function whatsappUrl(phone: string, text: string): string {
  const digits = phone.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function defaultWhatsappMessage(shopName: string): string {
  return `Hola ${shopName}, quiero cotizar un servicio / producto.`;
}
