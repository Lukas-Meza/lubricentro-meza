import { MessageCircle } from 'lucide-react';
import { useSite } from '../hooks/useSite';
import { defaultWhatsappMessage, whatsappUrl } from '../utils/whatsapp';

export function WhatsAppButton() {
  const { site } = useSite();

  return (
    <a
      href={whatsappUrl(site.whatsapp, defaultWhatsappMessage(site.name))}
      target="_blank"
      rel="noreferrer"
      className="wa-fab"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={18} />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
