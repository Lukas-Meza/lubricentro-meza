import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QuoteProvider } from './context/QuoteContext';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { ServiciosPage } from './pages/ServiciosPage';
import { ServicioDetailPage } from './pages/ServicioDetailPage';
import { ProductosPage } from './pages/ProductosPage';
import { ProductoDetailPage } from './pages/ProductoDetailPage';
import { NosotrosPage } from './pages/NosotrosPage';
import { ContactoPage } from './pages/ContactoPage';
import { CotizarPage } from './pages/CotizarPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <QuoteProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="servicios" element={<ServiciosPage />} />
            <Route path="servicios/:slug" element={<ServicioDetailPage />} />
            <Route path="productos" element={<ProductosPage />} />
            <Route path="productos/:slug" element={<ProductoDetailPage />} />
            <Route path="nosotros" element={<NosotrosPage />} />
            <Route path="contacto" element={<ContactoPage />} />
            <Route path="cotizar" element={<CotizarPage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QuoteProvider>
  );
}
