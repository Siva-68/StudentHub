import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import "./Layout.css";

function Layout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("studenthub_sidebar_collapsed");
    return saved === "true";
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("studenthub_sidebar_collapsed", isCollapsed);
  }, [isCollapsed]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  return (
    <div className="layout-root">
      <Sidebar 
        isCollapsed={isCollapsed} 
        toggleCollapse={toggleCollapse} 
        isMobileOpen={isMobileOpen}
        closeMobile={closeMobile}
      />
      <div className={`layout-main-wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <Navbar toggleMobileSidebar={toggleMobileSidebar} />
        <main className="layout-content-area">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
