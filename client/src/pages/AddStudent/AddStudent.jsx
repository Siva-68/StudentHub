import { useState, useRef } from "react";
import { FaUser, FaEnvelope, FaPhone, FaBook, FaCalendar, FaCamera, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button/Button";
import { createStudent } from "../../services/student.service";
import "./AddStudent.css";

const COURSES = ["BCA", "BSC", "MCA", "MSC", "ENGINEERING", "OTHER"];
const YEARS = [1, 2, 3, 4, 5];

function AddStudent() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    year: "",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (!formData.name || formData.name.trim().length < 3) {
      toast.error("Name must be at least 3 characters."); return;
    }
    if (!formData.email) {
      toast.error("Email address is required."); return;
    }
    if (!formData.phone || !/^[0-9]{10}$/.test(formData.phone)) {
      toast.error("Phone must be exactly 10 digits."); return;
    }
    if (!formData.course) {
      toast.error("Please select a course."); return;
    }
    if (!formData.year) {
      toast.error("Please select a year."); return;
    }

    setLoading(true);
    try {
      // Build multipart form-data object for file upload
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (selectedFile) {
        data.append("profileImage", selectedFile);
      }

      const response = await createStudent(data);
      if (response.success) {
        toast.success("Student record created successfully!");
        navigate("/students");
      } else {
        toast.error(response.message || "Could not create student.");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to save student record.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-student-container">
      {/* Page Header */}
      <div className="form-page-header">
        <button className="back-btn" onClick={() => navigate("/students")}>
          <FaArrowLeft /> Back to Students
        </button>
        <div>
          <h1>Add New Student</h1>
          <p>Fill out the form below to register a new student profile.</p>
        </div>
      </div>

      <div className="form-page-layout">
        {/* Left: Avatar Upload */}
        <div className="form-avatar-section">
          <div
            className="avatar-upload-box"
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="avatar-upload-preview" />
            ) : (
              <div className="avatar-upload-placeholder">
                <FaCamera className="avatar-upload-icon" />
                <p>Upload Photo</p>
                <span>JPG, PNG up to 5MB</span>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          {imagePreview && (
            <button className="remove-photo-btn" onClick={() => { setImagePreview(null); setSelectedFile(null); }}>
              Remove Photo
            </button>
          )}
        </div>

        {/* Right: Form */}
        <form className="student-form-card" onSubmit={handleSubmit}>
          <div className="form-grid-two-col">
            <div className="form-field">
              <label className="form-label">Full Name <span className="required">*</span></label>
              <div className="form-input-box">
                <FaUser className="form-input-icon" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Aarav Kumar"
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Email Address <span className="required">*</span></label>
              <div className="form-input-box">
                <FaEnvelope className="form-input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Phone Number <span className="required">*</span></label>
              <div className="form-input-box">
                <FaPhone className="form-input-icon" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit number"
                  maxLength={10}
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Course <span className="required">*</span></label>
              <div className="form-input-box">
                <FaBook className="form-input-icon" />
                <select name="course" value={formData.course} onChange={handleChange} required>
                  <option value="">Select a course</option>
                  {COURSES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Year of Study <span className="required">*</span></label>
              <div className="form-input-box">
                <FaCalendar className="form-input-icon" />
                <select name="year" value={formData.year} onChange={handleChange} required>
                  <option value="">Select a year</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>Year {y}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Status</label>
              <div className="status-toggle-group">
                <button
                  type="button"
                  className={`status-toggle-btn ${formData.status === "active" ? "active-selected" : ""}`}
                  onClick={() => setFormData(p => ({ ...p, status: "active" }))}
                >
                  Active
                </button>
                <button
                  type="button"
                  className={`status-toggle-btn ${formData.status === "inactive" ? "inactive-selected" : ""}`}
                  onClick={() => setFormData(p => ({ ...p, status: "inactive" }))}
                >
                  Inactive
                </button>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate("/students")}>
              Cancel
            </button>
            <Button text="Create Student" type="submit" loading={loading} variant="success" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
