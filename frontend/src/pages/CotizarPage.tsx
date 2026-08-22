import { useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { EmptyState } from '../components/States';
import { useQuote } from '../hooks/useQuote';
import { useSite } from '../hooks/useSite';
import { submitQuote } from '../services/quotes';
import { formatClp } from '../utils/format';
import { whatsappUrl } from '../utils/whatsapp';

export function CotizarPage() {
  const { items, updateQuantity, remove, clear } = useQuote();
  const { site } = useSite();
  const [status, setStatus] = useState<'idle' | 'saving' | 'ok' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [message, setMessage] = useState('');

  const whatsappText = useMemo(() => {
    const lines = items.map((item) => `• ${item.name} x${item.quantity}`);
    const vehicle = [vehicleMake, vehicleModel, vehicleYear].filter(Boolean).join(' ');
    return [
      `Hola ${site.name}, quiero cotizar:`,
      ...lines,
      vehicle ? `Vehículo: ${vehicle}` : null,
      name ? `Nombre: ${name}` : null,
      phone ? `Teléfono: ${phone}` : null,
      message || null,
    ]
      .filter(Boolean)
      .join('\n');
  }, [items, message, name, phone, site.name, vehicleMake, vehicleModel, vehicleYear]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (items.length === 0) {
      setError('Agrega al menos un servicio o producto.');
      return;
    }
    setStatus('saving');
    setError(null);
    try {
      await submitQuote({
        name,
        phone,
        email: email || undefined,
        vehicleMake: vehicleMake || undefined,
        vehicleModel: vehicleModel || undefined,
        vehicleYear: vehicleYear ? Number(vehicleYear) : undefined,
        message: message || undefined,
        items: items.map((item) => ({
          kind: item.kind,
          quantity: item.quantity,
          serviceId: item.kind === 'SERVICE' ? item.id : undefined,
          productId: item.kind === 'PRODUCT' ? item.id : undefined,
        })),
      });
      setStatus('ok');
      clear();
    } catch {
      setStatus('error');
      setError('No se pudo enviar. Intenta de nuevo o usa WhatsApp.');
    }
  };

  return (
    <>
      <PageHero
        kicker="COTIZAR"
        title="Dinos qué necesita tu auto."
        copy="Selecciona servicios y productos, completa tus datos y te respondemos con precio y hora."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="font-display text-2xl uppercase">Tu selección</h2>
          {items.length === 0 ? (
            <div className="mt-4">
              <EmptyState
                title="Aún no hay ítems"
                copy="Ve a Servicios o Productos y pulsa Cotizar en lo que necesites."
              />
              <div className="mt-4 flex gap-3 text-sm">
                <Link to="/servicios" className="text-amber hover:underline">
                  Ver servicios
                </Link>
                <Link to="/productos" className="text-amber hover:underline">
                  Ver productos
                </Link>
              </div>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-md border border-line bg-steel p-3"
                >
                  <img src={item.imageUrl} alt="" className="h-16 w-20 rounded-sm object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{item.name}</p>
                    <p className="text-sm text-mist">Desde {formatClp(item.priceFrom)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        className="grid h-7 w-7 place-items-center border border-line"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Restar"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        className="grid h-7 w-7 place-items-center border border-line"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Sumar"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    className="text-mist hover:text-amber"
                    aria-label="Quitar"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form onSubmit={onSubmit} className="rounded-md border border-line bg-ink p-6">
          {status === 'ok' ? (
            <div>
              <p className="font-display text-3xl uppercase">Cotización enviada</p>
              <p className="mt-2 text-sm text-mist">
                La recibimos en el taller. Si quieres acelerar, mándanos el mismo detalle por
                WhatsApp.
              </p>
              <a
                href={whatsappUrl(site.whatsapp, `Hola ${site.name}, acabo de enviar una cotización por la web.`)}
                className="mt-6 inline-flex rounded-sm bg-amber px-4 py-2 text-sm font-bold text-carbon"
                target="_blank"
                rel="noreferrer"
              >
                Avisar por WhatsApp
              </a>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl uppercase">Tus datos</h2>
              <div className="mt-4 grid gap-3">
                <label className="text-sm">
                  Nombre
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-sm border border-line bg-steel px-3 py-2 outline-none focus:border-amber"
                  />
                </label>
                <label className="text-sm">
                  Teléfono / WhatsApp
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+56 9 ..."
                    className="mt-1 w-full rounded-sm border border-line bg-steel px-3 py-2 outline-none focus:border-amber"
                  />
                </label>
                <label className="text-sm">
                  Correo (opcional)
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-sm border border-line bg-steel px-3 py-2 outline-none focus:border-amber"
                  />
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <label className="col-span-1 text-sm">
                    Marca
                    <input
                      value={vehicleMake}
                      onChange={(e) => setVehicleMake(e.target.value)}
                      className="mt-1 w-full rounded-sm border border-line bg-steel px-3 py-2 outline-none focus:border-amber"
                    />
                  </label>
                  <label className="col-span-1 text-sm">
                    Modelo
                    <input
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      className="mt-1 w-full rounded-sm border border-line bg-steel px-3 py-2 outline-none focus:border-amber"
                    />
                  </label>
                  <label className="col-span-1 text-sm">
                    Año
                    <input
                      inputMode="numeric"
                      value={vehicleYear}
                      onChange={(e) => setVehicleYear(e.target.value)}
                      className="mt-1 w-full rounded-sm border border-line bg-steel px-3 py-2 outline-none focus:border-amber"
                    />
                  </label>
                </div>
                <label className="text-sm">
                  Comentario
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="mt-1 w-full rounded-sm border border-line bg-steel px-3 py-2 outline-none focus:border-amber"
                    placeholder="Kilometraje, patente o lo que debamos saber."
                  />
                </label>
              </div>
              {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
              <button
                type="submit"
                disabled={status === 'saving'}
                className="mt-5 w-full rounded-sm bg-amber py-3 text-sm font-bold text-carbon disabled:opacity-60"
              >
                {status === 'saving' ? 'Enviando…' : 'Enviar cotización'}
              </button>
              <a
                href={whatsappUrl(site.whatsapp, whatsappText)}
                className="mt-3 block text-center text-sm text-amber hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Enviar la misma selección por WhatsApp
              </a>
            </>
          )}
        </form>
      </section>
    </>
  );
}
