import { useState, useEffect } from "react";
import {
  FaArrowLeft, FaEdit, FaTrash, FaEnvelope,
  FaPhone, FaBook, FaCalendarAlt, FaClock
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Avatar from "../../components/Avatar/Avatar";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { getStudentById, deleteStudent } from "../../services/student.service";
import "./StudentDetails.css";

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await getStudentById(id);
        if (res.success && res.data) {
          setStudent(res.data);
        } else {
          toast.error("Student not found."); navigate("/students");
        }
      } catch {
        toast.error("Could not load student."); navigate("/students");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await deleteStudent(id);
      toast.success("Student deleted successfully.");
      navigate("/students");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed.");
    }
  };

  if (loading) {
    return (
      <div className="details-loader-center">
        <Loader size="large" text="Loading student profile..." />
      </div>
    );
  }

  if (!student) return null;

  const createdDate = student.createdAt
    ? new Date(student.createdAt).toLocaleDateString("en-IN", {
        year: "numeric", month: "long", day: "numeric",
      })
    : "—";

  return (
    <div className="student-details-container">
      {/* Back navigation */}
      <button className="back-btn" onClick={() => navigate("/students")}>
        <FaArrowLeft /> Back to Directory
      </button>

      {/* Hero card */}
      <div className="details-hero-card">
        <div className="details-hero-left">
          <div className="details-avatar-wrapper">
            <Avatar src={student.profileImage?.url} alt={student.name} size={100} />
          </div>
          <div className="details-hero-info">
            <h1 className="details-name">{student.name}</h1>
            <p className="details-sub">{student.course} · Year {student.year}</p>
            <span className={`status-badge ${student.status}`}>{student.status}</span>
          </div>
        </div>
        <div className="details-hero-actions">
          <Button
            text="Edit Profile"
            onClick={() => navigate(`/students/edit/${student._id}`)}
            variant="primary"
          />
          <Button
            text="Delete"
            onClick={() => setConfirmOpen(true)}
            variant="danger"
          />
        </div>
      </div>

      {/* Info grid */}
      <div className="details-info-grid">
        <div className="details-info-card">
          <h3 className="details-section-title">Contact Information</h3>
          <div className="details-info-list">
            <div className="details-info-item">
              <div className="details-info-icon email"><FaEnvelope /></div>
              <div>
                <span className="info-label">Email Address</span>
                <span className="info-value">{student.email}</span>
              </div>
            </div>
            <div className="details-info-item">
              <div className="details-info-icon phone"><FaPhone /></div>
              <div>
                <span className="info-label">Phone Number</span>
                <span className="info-value">{student.phone}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="details-info-card">
          <h3 className="details-section-title">Academic Information</h3>
          <div className="details-info-list">
            <div className="details-info-item">
              <div className="details-info-icon course"><FaBook /></div>
              <div>
                <span className="info-label">Programme / Course</span>
                <span className="info-value">{student.course}</span>
              </div>
            </div>
            <div className="details-info-item">
              <div className="details-info-icon year"><FaCalendarAlt /></div>
              <div>
                <span className="info-label">Year of Study</span>
                <span className="info-value">Year {student.year}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="details-info-card">
          <h3 className="details-section-title">System Information</h3>
          <div className="details-info-list">
            <div className="details-info-item">
              <div className="details-info-icon clock"><FaClock /></div>
              <div>
                <span className="info-label">Date Registered</span>
                <span className="info-value">{createdDate}</span>
              </div>
            </div>
            <div className="details-info-item">
              <div className="details-info-icon" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
                #
              </div>
              <div>
                <span className="info-label">Student ID</span>
                <span className="info-value mono">{student._id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm delete dialog */}
      <ConfirmDialog
        isOpen={confirmOpen}
        title="Delete Student Profile"
        message={`You are about to permanently delete the profile of "${student.name}". This action is irreversible.`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

export default StudentDetails;
