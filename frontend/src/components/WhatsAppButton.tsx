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
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-black/40 transition hover:scale-[1.03]"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={18} />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
