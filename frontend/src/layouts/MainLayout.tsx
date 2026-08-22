import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';

// Layout base: header + contenido de la ruta + footer + flotante de WhatsApp
export function MainLayout() {
  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-main">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
