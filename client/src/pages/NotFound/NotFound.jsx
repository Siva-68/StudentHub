import { Link, useNavigate } from "react-router-dom";
import { FaGraduationCap, FaHome, FaArrowLeft } from "react-icons/fa";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <div className="notfound-icon">
          <FaGraduationCap />
        </div>
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Page Not Found</h2>
        <p className="notfound-message">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="notfound-actions">
          <button className="notfound-btn primary" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Go Back
          </button>
          <Link to="/dashboard" className="notfound-btn secondary">
            <FaHome /> Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;