import { useState, useEffect, useCallback } from "react";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";
import Avatar from "../../components/Avatar/Avatar";
import Loader from "../../components/Loader/Loader";
import EmptyState from "../../components/EmptyState/EmptyState";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import Button from "../../components/Button/Button";
import { getAllStudents, deleteStudent } from "../../services/student.service";
import "./Students.css";

function Students() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, studentId: null, studentName: "" });

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllStudents({
        page: currentPage,
        limit: 8,
        search,
        sort: "createdAt",
        order: "desc",
      });

      if (response.success && response.data) {
        setStudents(response.data.students || []);
        setPagination(response.data.pagination || { total: 0, page: 1, totalPages: 1 });
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error("Failed to fetch students", error);
      toast.error("Could not load student records.");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, search]);

  useEffect(() => {
    // Debounce for search input
    const timer = setTimeout(() => {
      fetchStudents();
    }, 350);
    return () => clearTimeout(timer);
  }, [fetchStudents]);

  // Reset page when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleDeleteClick = (id, name) => {
    setConfirmDelete({ open: true, studentId: id, studentName: name });
  };

  const handleDeleteConfirm = async () => {
    const { studentId } = confirmDelete;
    try {
      await deleteStudent(studentId);
      toast.success("Student record deleted successfully.");
      setConfirmDelete({ open: false, studentId: null, studentName: "" });
      fetchStudents();
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to delete student.";
      toast.error(msg);
    }
  };

  const handleDeleteCancel = () => {
    setConfirmDelete({ open: false, studentId: null, studentName: "" });
  };

  return (
    <div className="students-container">
      {/* Page Header */}
      <div className="students-header">
        <div>
          <h1>Students Directory</h1>
          <p>{pagination.total} student{pagination.total !== 1 ? "s" : ""} registered</p>
        </div>
        <Button
          text="Add Student"
          onClick={() => navigate("/students/add")}
          variant="success"
        />
      </div>

      {/* Toolbar: Search */}
      <div className="students-toolbar">
        <div className="students-search-area">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone..."
          />
        </div>
      </div>

      {/* Student Table */}
      <div className="students-table-wrapper">
        {loading ? (
          <div className="students-loader">
            <Loader size="medium" text="Loading students..." />
          </div>
        ) : students.length === 0 ? (
          <EmptyState
            title={search ? "No Students Found" : "No Student Records Yet"}
            message={
              search
                ? `No results matched "${search}". Try a different search.`
                : "Start by adding your first student to the platform."
            }
          />
        ) : (
          <>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Phone</th>
                    <th>Course</th>
                    <th>Year</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td>
                        <div className="students-name-cell">
                          <Avatar src={student.profileImage?.url} alt={student.name} size={38} />
                          <div>
                            <span className="student-table-name" onClick={() => navigate(`/students/${student._id}`)}>
                              {student.name}
                            </span>
                            <span className="student-table-email">{student.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="text-muted">{student.phone}</td>
                      <td>{student.course}</td>
                      <td>Year {student.year}</td>
                      <td>
                        <span className={`status-badge ${student.status}`}>
                          {student.status}
                        </span>
                      </td>
                      <td>
                        <div className="students-action-row">
                          <button
                            className="action-icon-btn view"
                            onClick={() => navigate(`/students/${student._id}`)}
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          <button
                            className="action-icon-btn edit"
                            onClick={() => navigate(`/students/edit/${student._id}`)}
                            title="Edit Student"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="action-icon-btn delete"
                            onClick={() => handleDeleteClick(student._id, student.name)}
                            title="Delete Student"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={pagination.totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={confirmDelete.open}
        title="Delete Student Record"
        message={`Are you sure you want to permanently delete the record for "${confirmDelete.studentName}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}

export default Students;