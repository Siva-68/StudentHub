import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// Public pages
import Login    from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";

// Protected pages
import Dashboard     from "./pages/Dashboard/Dashboard";
import Students      from "./pages/Students/Students";
import AddStudent    from "./pages/AddStudent/AddStudent";
import EditStudent   from "./pages/EditStudent/EditStudent";
import StudentDetails from "./pages/StudentDetails/StudentDetails";
import Profile       from "./pages/Profile/Profile";
import Settings      from "./pages/Settings/Settings";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ── Root redirect ── */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* ── Public routes ── */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ── Protected routes (wrapped in Layout via ProtectedRoute) ── */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard"           element={<Dashboard />} />
            <Route path="/students"            element={<Students />} />
            <Route path="/students/add"        element={<AddStudent />} />
            <Route path="/students/edit/:id"   element={<EditStudent />} />
            <Route path="/students/:id"        element={<StudentDetails />} />
            <Route path="/profile"             element={<Profile />} />
            <Route path="/settings"            element={<Settings />} />
          </Route>

          {/* ── 404 ── */}
          <Route path="*" element={<NotFound />} />

        </Routes>

        {/* Global Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;