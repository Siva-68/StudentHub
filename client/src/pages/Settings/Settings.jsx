import { useState } from "react";
import { FaBell, FaLock, FaPalette, FaDatabase, FaSignOutAlt, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { toast } from "react-toastify";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { useAuth } from "../../context/AuthContext";
import "./Settings.css";

function Settings() {
  const { logout } = useAuth();

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    deleteConfirmations: true,
    compactSidebar: false,
    autoLogout: true,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const togglePref = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success("Preference updated.");
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters."); return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match."); return;
    }
    // TODO: Wire to PATCH /auth/change-password endpoint
    toast.success("Password changed successfully! (Backend endpoint needed)");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleExportData = () => {
    toast.info("Data export initiated — feature coming soon.");
  };

  const handleClearCache = () => {
    localStorage.removeItem("studenthub_sidebar_collapsed");
    toast.success("Local cache cleared successfully.");
  };

  return (
    <div className="settings-container">
      <div className="settings-page-header">
        <h1>System Settings</h1>
        <p>Manage your preferences, security, and data options.</p>
      </div>

      <div className="settings-grid">
        {/* ── Preferences Card ── */}
        <Card className="settings-card" title="Preferences" subtitle="Control how the application behaves">
          <div className="settings-toggle-list">
            <div className="settings-toggle-item">
              <div className="settings-toggle-info">
                <div className="settings-toggle-icon" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
                  <FaBell />
                </div>
                <div>
                  <p className="settings-toggle-title">Email Notifications</p>
                  <p className="settings-toggle-desc">Receive updates and alerts via email</p>
                </div>
              </div>
              <button
                className={`toggle-switch ${preferences.emailNotifications ? "on" : ""}`}
                onClick={() => togglePref("emailNotifications")}
                aria-label="Toggle email notifications"
              >
                {preferences.emailNotifications ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>

            <div className="settings-toggle-item">
              <div className="settings-toggle-info">
                <div className="settings-toggle-icon" style={{ background: "var(--danger-light)", color: "var(--danger)" }}>
                  🛡️
                </div>
                <div>
                  <p className="settings-toggle-title">Deletion Confirmations</p>
                  <p className="settings-toggle-desc">Ask before permanently deleting records</p>
                </div>
              </div>
              <button
                className={`toggle-switch ${preferences.deleteConfirmations ? "on" : ""}`}
                onClick={() => togglePref("deleteConfirmations")}
              >
                {preferences.deleteConfirmations ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>

            <div className="settings-toggle-item">
              <div className="settings-toggle-info">
                <div className="settings-toggle-icon" style={{ background: "var(--success-light)", color: "var(--success)" }}>
                  <FaPalette />
                </div>
                <div>
                  <p className="settings-toggle-title">Compact Sidebar</p>
                  <p className="settings-toggle-desc">Use the icon-only collapsed sidebar by default</p>
                </div>
              </div>
              <button
                className={`toggle-switch ${preferences.compactSidebar ? "on" : ""}`}
                onClick={() => togglePref("compactSidebar")}
              >
                {preferences.compactSidebar ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>

            <div className="settings-toggle-item">
              <div className="settings-toggle-info">
                <div className="settings-toggle-icon" style={{ background: "var(--warning-light)", color: "var(--warning)" }}>
                  🕒
                </div>
                <div>
                  <p className="settings-toggle-title">Auto Logout</p>
                  <p className="settings-toggle-desc">Automatically log out after session expires</p>
                </div>
              </div>
              <button
                className={`toggle-switch ${preferences.autoLogout ? "on" : ""}`}
                onClick={() => togglePref("autoLogout")}
              >
                {preferences.autoLogout ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>
          </div>
        </Card>

        {/* ── Security Card ── */}
        <Card className="settings-card" title="Security" subtitle="Change your account password">
          <form className="settings-password-form" onSubmit={handleChangePassword}>
            <div className="form-field">
              <label className="form-label">Current Password</label>
              <div className="form-input-box">
                <FaLock className="form-input-icon" />
                <input
                  type="password" name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                />
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">New Password</label>
              <div className="form-input-box">
                <FaLock className="form-input-icon" />
                <input
                  type="password" name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Min 6 characters"
                />
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">Confirm New Password</label>
              <div className="form-input-box">
                <FaLock className="form-input-icon" />
                <input
                  type="password" name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Repeat new password"
                />
              </div>
            </div>
            <div style={{ marginTop: "8px" }}>
              <Button text="Change Password" type="submit" variant="primary" />
            </div>
          </form>
        </Card>

        {/* ── Data Management Card ── */}
        <Card className="settings-card" title="Data Management" subtitle="Export data or clear local cache">
          <div className="settings-data-actions">
            <div className="settings-data-row">
              <div className="settings-data-info">
                <div className="settings-data-icon"><FaDatabase /></div>
                <div>
                  <p className="settings-toggle-title">Export Student Data</p>
                  <p className="settings-toggle-desc">Download all student records as CSV</p>
                </div>
              </div>
              <button className="settings-outline-btn" onClick={handleExportData}>
                Export CSV
              </button>
            </div>

            <div className="settings-data-row">
              <div className="settings-data-info">
                <div className="settings-data-icon" style={{ background: "var(--warning-light)", color: "var(--warning)" }}>🗑️</div>
                <div>
                  <p className="settings-toggle-title">Clear Local Cache</p>
                  <p className="settings-toggle-desc">Reset stored sidebar and UI preferences</p>
                </div>
              </div>
              <button className="settings-outline-btn warning" onClick={handleClearCache}>
                Clear Cache
              </button>
            </div>
          </div>
        </Card>

        {/* ── Danger Zone Card ── */}
        <Card className="settings-card danger-zone-card" title="Danger Zone">
          <div className="danger-zone-body">
            <div>
              <p className="settings-toggle-title">Sign out of all sessions</p>
              <p className="settings-toggle-desc">You will be redirected to the login page.</p>
            </div>
            <button className="settings-danger-btn" onClick={logout}>
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Settings;
