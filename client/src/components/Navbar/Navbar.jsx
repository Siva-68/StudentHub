import { useState, useRef, useEffect } from "react";
import { FaBars, FaUser, FaCog, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar({ toggleMobileSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Determine page title based on current pathname
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "Dashboard Overview";
    if (path === "/students") return "Students Directory";
    if (path === "/students/add") return "Add New Student";
    if (path.startsWith("/students/edit")) return "Edit Student Details";
    if (path.includes("/students/") && !path.includes("edit")) return "Student Profile Details";
    if (path === "/profile") return "My Profile";
    if (path === "/settings") return "System Settings";
    return "StudentHub";
  };

  const handleDropdownItemClick = (route) => {
    setDropdownOpen(false);
    navigate(route);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-left">
        <button className="navbar-mobile-toggle" onClick={toggleMobileSidebar}>
          <FaBars />
        </button>
        <h2 className="navbar-page-title">{getPageTitle()}</h2>
      </div>

      <div className="navbar-right">
        <div className="navbar-user-section" ref={dropdownRef}>
          <button 
            className="navbar-user-trigger" 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
          >
            <div className="navbar-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
            </div>
            <span className="navbar-username">{user?.name || "Admin"}</span>
            <FaChevronDown className={`navbar-arrow ${dropdownOpen ? "open" : ""}`} />
          </button>

          {dropdownOpen && (
            <div className="navbar-dropdown">
              <div className="navbar-dropdown-header">
                <p className="dropdown-user-name">{user?.name || "Admin"}</p>
                <p className="dropdown-user-role">Administrator</p>
              </div>
              <hr className="dropdown-divider" />
              <button className="navbar-dropdown-item" onClick={() => handleDropdownItemClick("/profile")}>
                <FaUser className="dropdown-item-icon" />
                <span>My Profile</span>
              </button>
              <button className="navbar-dropdown-item" onClick={() => handleDropdownItemClick("/settings")}>
                <FaCog className="dropdown-item-icon" />
                <span>Settings</span>
              </button>
              <hr className="dropdown-divider" />
              <button 
                className="navbar-dropdown-item logout" 
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                }}
              >
                <FaSignOutAlt className="dropdown-item-icon" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
