import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import Registro from "./views/Registro";
import Login from "./components/Login";
import { Checkout } from "./views/Checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";


// Componentes para el dashboard

import GuestRoute from "./routes/GuestRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import { MiMaterial } from "./views/MiMaterial";
import { MisExamenes } from "./views/MisExamenes";
import { MisCursos } from "./views/MisCursos";
import { Dashboard } from "./views/Dashboard";
import { Profile } from "./views/Profile";
import { CursoDetail } from "./views/CursoDetail";
import PrivacyPolicy from "./views/PrivacyPolicy";

const App = () => {
  const STRIPE_KEY_PUBLIC = import.meta.env.VITE_STRIPE_KEY_PUBLIC;
  const stripePromise = loadStripe(STRIPE_KEY_PUBLIC);

  const { verifyToken, isAuthenticated } = useAuthStore();

  useEffect(() => {
    verifyToken(); // Verificar el token al cargar la página
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/privacy" element={<PrivacyPolicy/>} />

          {/* Rutas que no puede acceder si está logueado */}
          <Route
            path="/register"
            element={
              <GuestRoute>
                <Registro />
              </GuestRoute>
            }
          />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />

          {/* Rutas protegidas */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil/user/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/curso/detail/:id"
            element={
              // <ProtectedRoute>
                <CursoDetail />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/mis-cursos"
            element={
              <ProtectedRoute>
                <MisCursos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/mis-examenes"
            element={
              <ProtectedRoute>
                <MisExamenes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/mi-material"
            element={
              <ProtectedRoute>
                <MiMaterial />
              </ProtectedRoute>
            }
          />

          {/* Rutas públicas adicionales */}
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </Elements>
  );
};

export default App;
