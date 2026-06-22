import { useState, useEffect } from "react";
import { FaGraduationCap, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button/Button";
import { loginAdmin } from "../../services/auth.services";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login, token } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  // Check if session has expired or other url queries
  useEffect(() => {
    if (searchParams.get("expired") === "true") {
      toast.warn("Your session has expired. Please sign in again.");
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validations
    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await loginAdmin(formData);
      
      if (response.success) {
        // Expected payload structure: { success: true, message, data: { token, admin: { id, name, email } } }
        const { token: jwtToken, admin } = response.data;
        login(jwtToken, admin);
        toast.success(response.message || "Successfully logged in!");
        navigate("/dashboard");
      } else {
        toast.error(response.message || "Failed to log in.");
      }
    } catch (error) {
      console.error("Login request error", error);
      const errorMsg = error.response?.data?.message || "Invalid credentials. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <FaGraduationCap />
        </div>

        <h1>StudentHub</h1>
        <p className="login-subtitle">Student Management Platform</p>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label>Email Address</label>
            <div className="input-box">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="admin@studenthub.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-wrapper">
            <label>Password</label>
            <div className="input-box">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="login-options">
            <label className="remember">
              <input type="checkbox" />
              Remember Me
            </label>
            <Link to="/register" className="register-link">Create Account</Link>
          </div>

          <Button
            text="Sign In"
            type="submit"
            loading={loading}
          />
        </form>
      </div>
    </div>
  );
}

export default Login;