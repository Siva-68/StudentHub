import { useState, useEffect, useRef } from "react";
import {
  FaArrowLeft, FaUser, FaEnvelope, FaPhone,
  FaBook, FaCalendar, FaCamera, FaSave
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import { getStudentById, updateStudent } from "../../services/student.service";
import "./EditStudent.css";

const COURSES = ["BCA", "BSC", "MCA", "MSC", "ENGINEERING", "OTHER"];
const YEARS   = [1, 2, 3, 4, 5];

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [loading,   setLoading]   = useState(true);
  const [saving,    setSaving]    = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    course: "", year: "", status: "active",
  });

  /* ── Load existing student data ── */
  useEffect(() => {
    async function load() {
      try {
        const res = await getStudentById(id);
        if (res.success && res.data) {
          const s = res.data;
          setFormData({
            name:   s.name   || "",
            email:  s.email  || "",
            phone:  s.phone  || "",
            course: s.course || "",
            year:   s.year   || "",
            status: s.status || "active",
          });
          if (s.profileImage?.url) setImagePreview(s.profileImage.url);
        } else {
          toast.error("Student not found."); navigate("/students");
        }
      } catch {
        toast.error("Could not load student data."); navigate("/students");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, navigate]);

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Select a valid image."); return; }
    if (file.size > 5 * 1024 * 1024)    { toast.error("Image must be < 5 MB."); return; }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = ev => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || formData.name.trim().length < 3)        { toast.error("Name ≥ 3 characters."); return; }
    if (!/^[0-9]{10}$/.test(formData.phone))                      { toast.error("Phone must be 10 digits."); return; }
    if (!formData.course)                                          { toast.error("Select a course."); return; }
    if (!formData.year)                                            { toast.error("Select a year."); return; }

    setSaving(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      if (selectedFile) data.append("profileImage", selectedFile);

      const res = await updateStudent(id, data);
      if (res.success) {
        toast.success("Student updated successfully!");
        navigate(`/students/${id}`);
      } else {
        toast.error(res.message || "Update failed.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update student.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-loader-center">
        <Loader size="large" text="Loading student data..." />
      </div>
    );
  }

  return (
    <div className="edit-student-container">
      {/* Header */}
      <div className="form-page-header">
        <button className="back-btn" onClick={() => navigate(`/students/${id}`)}>
          <FaArrowLeft /> Back to Profile
        </button>
        <div>
          <h1>Edit Student Record</h1>
          <p>Update the details below and save your changes.</p>
        </div>
      </div>

      <div className="form-page-layout">
        {/* Avatar upload */}
        <div className="form-avatar-section">
          <div className="avatar-upload-box" onClick={() => fileInputRef.current?.click()}>
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="avatar-upload-preview" />
            ) : (
              <div className="avatar-upload-placeholder">
                <FaCamera className="avatar-upload-icon" />
                <p>Change Photo</p>
                <span>JPG, PNG up to 5 MB</span>
              </div>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*"
            onChange={handleFileChange} style={{ display: "none" }} />
          {selectedFile && (
            <button className="remove-photo-btn"
              onClick={() => { setImagePreview(null); setSelectedFile(null); }}>
              Remove New Photo
            </button>
          )}
        </div>

        {/* Form */}
        <form className="student-form-card" onSubmit={handleSubmit}>
          <div className="form-grid-two-col">
            {/* Name */}
            <div className="form-field">
              <label className="form-label">Full Name <span className="required">*</span></label>
              <div className="form-input-box">
                <FaUser className="form-input-icon" />
                <input type="text" name="name" value={formData.name}
                  onChange={handleChange} placeholder="Full name" required />
              </div>
            </div>

            {/* Email */}
            <div className="form-field">
              <label className="form-label">Email Address <span className="required">*</span></label>
              <div className="form-input-box">
                <FaEnvelope className="form-input-icon" />
                <input type="email" name="email" value={formData.email}
                  onChange={handleChange} placeholder="email@example.com" required />
              </div>
            </div>

            {/* Phone */}
            <div className="form-field">
              <label className="form-label">Phone <span className="required">*</span></label>
              <div className="form-input-box">
                <FaPhone className="form-input-icon" />
                <input type="text" name="phone" value={formData.phone}
                  onChange={handleChange} placeholder="10-digit number" maxLength={10} required />
              </div>
            </div>

            {/* Course */}
            <div className="form-field">
              <label className="form-label">Course <span className="required">*</span></label>
              <div className="form-input-box">
                <FaBook className="form-input-icon" />
                <select name="course" value={formData.course} onChange={handleChange} required>
                  <option value="">Select course</option>
                  {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Year */}
            <div className="form-field">
              <label className="form-label">Year <span className="required">*</span></label>
              <div className="form-input-box">
                <FaCalendar className="form-input-icon" />
                <select name="year" value={formData.year} onChange={handleChange} required>
                  <option value="">Select year</option>
                  {YEARS.map(y => <option key={y} value={y}>Year {y}</option>)}
                </select>
              </div>
            </div>

            {/* Status */}
            <div className="form-field">
              <label className="form-label">Status</label>
              <div className="status-toggle-group">
                <button type="button"
                  className={`status-toggle-btn ${formData.status === "active" ? "active-selected" : ""}`}
                  onClick={() => setFormData(p => ({ ...p, status: "active" }))}>
                  Active
                </button>
                <button type="button"
                  className={`status-toggle-btn ${formData.status === "inactive" ? "inactive-selected" : ""}`}
                  onClick={() => setFormData(p => ({ ...p, status: "inactive" }))}>
                  Inactive
                </button>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel"
              onClick={() => navigate(`/students/${id}`)}>Cancel</button>
            <Button text="Save Changes" type="submit" loading={saving} variant="primary" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;
