
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "Eroare 404: Utilizatorul a încercat să acceseze o rută inexistentă:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Ups! Pagina nu a fost găsită</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Înapoi la pagina principală
        </a>
      </div>
    </div>
  );
};

export default NotFound;
