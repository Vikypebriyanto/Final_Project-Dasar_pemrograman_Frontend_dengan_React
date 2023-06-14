import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";

const Student = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [facultyFilter, setFacultyFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All')

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:3001/student');
            const data = await response.json();
            setStudents(data);
            setFilteredStudents(data);
        } catch (error) {
            console.log('Error fetching students:', error);
        }
    };

    const handleFilterChange = (event) => {
        const selectedFilter = event.target.value;
        setFilter(selectedFilter);

        if (selectedFilter === 'All') {
            setFilteredStudents(students);
        } else {
            const filtered = students.filter((student) => student.faculty === selectedFilter);
            setFilteredStudents(filtered);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3001/student/${id}`, { method: 'DELETE' });
            const updatedStudents = students.filter((student) => student.id !== id);
            setStudents(updatedStudents);
            setFilteredStudents(updatedStudents);
        } catch (error) {
            console.log('Error deleting student:', error);
        }
    };


    return (
        <>
            <Navbar />
            <div className="container">
                <h1>All Students</h1>
                {students.length === 0 ? (
                    <p className="loading-message">Loading ...</p>
                ) : (
                    <div>
                        <label htmlFor="faculty-filter">Filter by Faculty:</label>
                        <select
                            id="faculty-filter"
                            value={facultyFilter}
                            onChange={handleFilterChange}
                            data-testid="filter"
                        >
                            <option value="All">All</option>
                            <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
                            <option value="Fakultas Ilmu Sosial dan Politik">
                                Fakultas Ilmu Sosial dan Politik
                            </option>
                            <option value="Fakultas Teknik">Fakultas Teknik</option>
                            <option value="Fakultas Teknologi Informasi dan Sains">
                                Fakultas Teknologi Informasi dan Sains
                            </option>
                        </select>
                        <table id="table-student">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Full Name</th>
                                    <th>Faculty</th>
                                    <th>Program Study</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student, index) => (
                                    <tr key={student.id} className="student-data-row">
                                        <td>{index + 1}</td>
                                        <td>
                                            <Link to={`/student/${student.id}`}>{student.fullname}</Link>
                                        </td>
                                        <td>{student.faculty}</td>
                                        <td>{student.programStudy}</td>
                                        <td>
                                            <button
                                                data-testid={`delete-${student.id}`}
                                                onClick={() => handleDelete(student.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <style>{`
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }

                h1 {
                    margin-top: 20px;
                }

                .container {
                    margin: 20px;
                }

                #table-student {
                    width: 100%;
                    border-collapse: collapse;
                }

                #table-student th,
                #table-student td {
                    padding: 8px;
                    border: 1px solid #ccc;
                }

                #table-student th {
                    background-color: #f2f2f2;
                    text-align: left;
                }

                .student-data-row:hover {
                    background-color: #f9f9f9;
                }

                label {
                    margin-right: 10px;
                    width: '99%',
                }

                select {
                    padding: 5px;
                }

                button {
                    padding: 5px 10px;
                    background-color: #dc3545;
                    color: white;
                    border: none;
                    cursor: pointer;
                    width: '99%',
                }

                button:hover {
                    background-color: #c82333;
                }

                .loading-message {
                    margin-top: 20px;
                    font-style: italic;
                }
            `}</style>
        </>
    );
};

export default Student;
