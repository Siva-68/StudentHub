import { NavLink } from "react-router-dom";
import { 
  FaThLarge, 
  FaUserGraduate, 
  FaUserPlus, 
  FaUser, 
  FaCog, 
  FaSignOutAlt, 
  FaChevronLeft, 
  FaChevronRight, 
  FaGraduationCap 
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

function Sidebar({ isCollapsed, toggleCollapse, isMobileOpen, closeMobile }) {
  const { logout, user } = useAuth();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaThLarge /> },
    { path: "/students", label: "Students List", icon: <FaUserGraduate /> },
    { path: "/students/add", label: "Add Student", icon: <FaUserPlus /> },
    { path: "/profile", label: "Admin Profile", icon: <FaUser /> },
    { path: "/settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobileOpen && (
        <div className="sidebar-backdrop" onClick={closeMobile}></div>
      )}

      <aside className={`sidebar-container ${isCollapsed ? "collapsed" : ""} ${isMobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo-area">
            <div className="sidebar-logo-icon">
              <FaGraduationCap />
            </div>
            {!isCollapsed && <span className="sidebar-logo-text">StudentHub</span>}
          </div>
          <button className="sidebar-toggle-btn" onClick={toggleCollapse}>
            {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
              onClick={closeMobile}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {!isCollapsed && <span className="sidebar-label">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user-info">
            <div className="sidebar-user-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
            </div>
            {!isCollapsed && (
              <div className="sidebar-user-meta">
                <span className="sidebar-user-name">{user?.name || "Admin"}</span>
                <span className="sidebar-user-email">{user?.email || "admin@studenthub.com"}</span>
              </div>
            )}
          </div>
          <button className="sidebar-logout-btn" onClick={logout}>
            <span className="sidebar-icon"><FaSignOutAlt /></span>
            {!isCollapsed && <span className="sidebar-label">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
