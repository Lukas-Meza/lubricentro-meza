import { useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { EmptyState } from '../components/States';
import { useQuote } from '../hooks/useQuote';
import { useSite } from '../hooks/useSite';
import { formatClp } from '../utils/format';
import { buildQuoteWhatsappMessage, whatsappUrl } from '../utils/whatsapp';

export function CotizarPage() {
  const { items, updateQuantity, remove, clear } = useQuote();
  const { site } = useSite();
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [message, setMessage] = useState('');

  const estimatedTotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        if (item.priceFrom == null) return sum;
        return sum + item.priceFrom * item.quantity;
      }, 0),
    [items],
  );

  const whatsappText = useMemo(
    () =>
      buildQuoteWhatsappMessage({
        shopName: site.name,
        items,
        name,
        phone,
        email,
        vehicleMake,
        vehicleModel,
        vehicleYear,
        message,
      }),
    [
      items,
      message,
      name,
      phone,
      email,
      site.name,
      vehicleMake,
      vehicleModel,
      vehicleYear,
    ],
  );

  const openWhatsappQuote = () => {
    if (items.length === 0) {
      setError('Agrega al menos un servicio o producto.');
      return;
    }
    if (!name.trim() || !phone.trim()) {
      setError('Completa tu nombre y teléfono para enviar la cotización.');
      return;
    }
    setError(null);
    const url = whatsappUrl(site.whatsapp, whatsappText);
    window.open(url, '_blank', 'noopener,noreferrer');
    clear();
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    openWhatsappQuote();
  };

  return (
    <>
      <PageHero
        kicker="COTIZAR"
        title="Dinos qué necesita tu auto."
        copy="Selecciona servicios y productos. Al enviar, se abre WhatsApp con el detalle listo para mandar al taller."
      />
      <section className="container-page grid gap-8 section-y-sm lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div>
          <h2 className="heading-card">Tu selección</h2>
          {items.length === 0 ? (
            <div className="mt-4">
              <EmptyState
                title="Aún no hay ítems"
                copy="Ve a Servicios o Productos y pulsa Cotizar en lo que necesites."
              />
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <Link to="/servicios" className="link-amber">
                  Ver servicios
                </Link>
                <Link to="/productos" className="link-amber">
                  Ver productos
                </Link>
              </div>
            </div>
          ) : (
            <>
              <ul className="mt-4 space-y-3">
                {items.map((item) => (
                  <li key={item.id} className="panel flex gap-3 !p-3">
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="h-16 w-16 shrink-0 rounded-sm object-cover sm:w-20"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{item.name}</p>
                      <p className="text-sm text-mist">
                        Desde {formatClp(item.priceFrom)}
                        {item.quantity > 1 && item.priceFrom != null
                          ? ` · Subtotal ${formatClp(item.priceFrom * item.quantity)}`
                          : null}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          className="grid h-8 w-8 place-items-center border border-line"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Restar"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          className="grid h-8 w-8 place-items-center border border-line"
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
                      className="self-start text-mist hover:text-amber"
                      aria-label="Quitar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
              {estimatedTotal > 0 ? (
                <p className="mt-4 text-sm font-semibold text-bone">
                  Total referencial: {formatClp(estimatedTotal)}
                </p>
              ) : null}
            </>
          )}
        </div>

        <form onSubmit={onSubmit} className="panel bg-ink">
          <h2 className="heading-card">Tus datos</h2>
          <p className="copy-muted mt-2 text-sm">
            Al enviar se abre WhatsApp con el listado de productos/servicios y precios para
            escribirle al taller.
          </p>
          <div className="mt-4 grid gap-3">
            <label className="field">
              Nombre
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="field-input"
              />
            </label>
            <label className="field">
              Teléfono / WhatsApp
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+56 9 ..."
                className="field-input"
              />
            </label>
            <label className="field">
              Correo (opcional)
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field-input"
              />
            </label>
            <div className="form-vehicle">
              <label className="field">
                Marca
                <input
                  value={vehicleMake}
                  onChange={(e) => setVehicleMake(e.target.value)}
                  className="field-input"
                />
              </label>
              <label className="field">
                Modelo
                <input
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="field-input"
                />
              </label>
              <label className="field">
                Año
                <input
                  inputMode="numeric"
                  value={vehicleYear}
                  onChange={(e) => setVehicleYear(e.target.value)}
                  className="field-input"
                />
              </label>
            </div>
            <label className="field">
              Comentario
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="field-input"
                placeholder="Kilometraje, patente o lo que debamos saber."
              />
            </label>
          </div>
          {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
          <button type="submit" className="btn btn-primary btn-block mt-5">
            Enviar cotización por WhatsApp
          </button>
          <button
            type="button"
            onClick={openWhatsappQuote}
            className="link-amber mt-3 block w-full text-center"
          >
            Abrir WhatsApp con el mensaje
          </button>
        </form>
      </section>
    </>
  );
}
