import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { FaUserGraduate, FaSearch, FaSync } from 'react-icons/fa';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/auth/students');
      setStudents(response.data.data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return students;
    return students.filter((student) => {
      return (
        student.name?.toLowerCase().includes(term) ||
        student.email?.toLowerCase().includes(term) ||
        student.studentId?.toLowerCase().includes(term) ||
        student.department?.toLowerCase().includes(term)
      );
    });
  }, [search, students]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="fw-bold text-white d-flex align-items-center">
            <FaUserGraduate className="me-2" />
            Registered Students
          </h2>
          <p className="text-white-50">Manage and review all students registered in the system.</p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="card-title text-muted mb-2">Total Students</h6>
              <h2 className="mb-0">{students.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h6 className="card-title text-muted mb-0">Search</h6>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={fetchStudents}
                  title="Refresh list"
                >
                  <FaSync className="me-1" />
                  Refresh
                </button>
              </div>
              <div className="input-group">
                <span className="input-group-text">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name, email, ID, or department"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-3">Student Directory</h5>
          {filteredStudents.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Student ID</th>
                    <th>Department</th>
                    <th>Year</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.studentId || '—'}</td>
                      <td>{student.department || '—'}</td>
                      <td>{student.year ? `${student.year} Year` : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted text-center mb-0">No students found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentList;

