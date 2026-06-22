import { useState } from "react";
import { FaUser, FaEnvelope, FaShieldAlt, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Avatar from "../../components/Avatar/Avatar";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";

function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving]       = useState(false);
  const [formData, setFormData]   = useState({
    name:  user?.name  || "",
    email: user?.email || "",
  });

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name || formData.name.trim().length < 3) {
      toast.error("Name must be at least 3 characters."); return;
    }
    setSaving(true);
    try {
      /* NOTE: Extend this when a PATCH /auth/profile endpoint is available.
         For now we update local context only. */
      await new Promise(r => setTimeout(r, 600)); // Simulate network
      updateProfile({ ...user, name: formData.name.trim() });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch {
      toast.error("Could not save profile changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({ name: user?.name || "", email: user?.email || "" });
    setIsEditing(false);
  };

  const joinedDate = new Date().toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="profile-container">
      {/* Hero banner */}
      <div className="profile-hero">
        <div className="profile-hero-bg" />
        <div className="profile-hero-content">
          <div className="profile-avatar-area">
            <Avatar alt={user?.name || "Admin"} size={96} />
            <div className="profile-online-dot" />
          </div>
          <div className="profile-hero-text">
            <h1 className="profile-hero-name">{user?.name || "Admin"}</h1>
            <p className="profile-hero-role">
              <FaShieldAlt className="profile-role-icon" /> System Administrator
            </p>
          </div>
          {!isEditing && (
            <button className="profile-edit-btn" onClick={() => setIsEditing(true)}>
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Info Grid */}
      <div className="profile-info-grid">
        {/* About Card */}
        <Card className="profile-card" title="Account Details" subtitle="Your registered information">
          {isEditing ? (
            <form onSubmit={handleSave} className="profile-edit-form">
              <div className="profile-form-field">
                <label className="form-label">Full Name</label>
                <div className="form-input-box">
                  <FaUser className="form-input-icon" />
                  <input
                    type="text" name="name"
                    value={formData.name} onChange={handleChange}
                    placeholder="Your full name" required
                  />
                </div>
              </div>
              <div className="profile-form-field">
                <label className="form-label">Email Address</label>
                <div className="form-input-box">
                  <FaEnvelope className="form-input-icon" />
                  <input
                    type="email" name="email"
                    value={formData.email} onChange={handleChange}
                    placeholder="Your email" disabled
                  />
                </div>
                <p className="profile-email-note">Email cannot be changed from this panel.</p>
              </div>
              <div className="profile-form-actions">
                <button type="button" className="btn-cancel" onClick={handleCancel}>
                  <FaTimes /> Cancel
                </button>
                <Button text="Save Changes" type="submit" loading={saving} variant="primary" />
              </div>
            </form>
          ) : (
            <div className="profile-info-rows">
              <div className="profile-info-row">
                <div className="profile-info-icon name"><FaUser /></div>
                <div>
                  <span className="info-label">Full Name</span>
                  <span className="info-value">{user?.name || "—"}</span>
                </div>
              </div>
              <div className="profile-info-row">
                <div className="profile-info-icon email"><FaEnvelope /></div>
                <div>
                  <span className="info-label">Email Address</span>
                  <span className="info-value">{user?.email || "—"}</span>
                </div>
              </div>
              <div className="profile-info-row">
                <div className="profile-info-icon role"><FaShieldAlt /></div>
                <div>
                  <span className="info-label">Role</span>
                  <span className="info-value">Administrator</span>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Stats Card */}
        <Card className="profile-card" title="Account Summary">
          <div className="profile-stat-list">
            <div className="profile-stat-item">
              <div className="profile-stat-icon" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
                🎓
              </div>
              <div>
                <span className="info-label">Account Type</span>
                <span className="info-value">Admin</span>
              </div>
            </div>
            <div className="profile-stat-item">
              <div className="profile-stat-icon" style={{ background: "var(--success-light)", color: "var(--success)" }}>
                ✅
              </div>
              <div>
                <span className="info-label">Account Status</span>
                <span className="info-value" style={{ color: "var(--success)" }}>Active</span>
              </div>
            </div>
            <div className="profile-stat-item">
              <div className="profile-stat-icon" style={{ background: "var(--warning-light)", color: "var(--warning)" }}>
                📅
              </div>
              <div>
                <span className="info-label">Session Date</span>
                <span className="info-value">{joinedDate}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
