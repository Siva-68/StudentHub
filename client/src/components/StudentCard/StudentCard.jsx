import Avatar from "../Avatar/Avatar";
import Card from "../Card/Card";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./StudentCard.css";

function StudentCard({ student, onDelete }) {
  const navigate = useNavigate();
  const { _id, name, course, year, status, profileImage } = student;

  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate(`/students/edit/${_id}`);
  };

  const handleViewClick = () => {
    navigate(`/students/${_id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(_id);
  };

  return (
    <Card className="student-grid-card" onClick={handleViewClick}>
      <div className="student-card-main">
        <Avatar src={profileImage?.url} alt={name} size={64} />
        <div className="student-card-info">
          <h4 className="student-card-name" onClick={handleViewClick}>{name}</h4>
          <p className="student-card-course">{course} • Year {year}</p>
        </div>
      </div>
      
      <div className="student-card-details">
        <span className={`status-badge ${status}`}>
          {status}
        </span>
      </div>

      <div className="student-card-actions">
        <button 
          className="card-action-btn view" 
          onClick={handleViewClick}
          title="View Profile"
        >
          <FaEye />
        </button>
        <button 
          className="card-action-btn edit" 
          onClick={handleEditClick}
          title="Edit Student"
        >
          <FaEdit />
        </button>
        <button 
          className="card-action-btn delete" 
          onClick={handleDeleteClick}
          title="Delete Student"
        >
          <FaTrash />
        </button>
      </div>
    </Card>
  );
}

export default StudentCard;
