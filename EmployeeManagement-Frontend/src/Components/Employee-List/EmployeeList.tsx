import React, { useEffect, useState } from 'react';
import Headers from "../../Atoms/headers";
import { deleteEmployees, getEmployees } from '../../api/employee';
import './EmployeeList.css';
import { useNavigate } from 'react-router-dom';

interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    departments: { id: number; departmentName: string }[];
    position: string;
    createdDate: string;
}

const EmployeeList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc'); // For sorting
    const [employees, setEmployee] = useState<Employee[]>([]);
    const navigate = useNavigate();
    const rowsPerPage = 5;

    const fetchEmployee = async () => {
        const emp = await getEmployees();
        setEmployee(emp);
    }

    useEffect(()=>{
        fetchEmployee();
    }, [])

    const filteredEmployees = employees.filter(employee =>
        `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.departments.some(dept => dept.departmentName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Sort employees by created date
    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        const dateA = new Date(a.createdDate).getTime();
        const dateB = new Date(b.createdDate).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

    const totalPages = Math.ceil(sortedEmployees.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentEmployees = sortedEmployees.slice(startIndex, startIndex + rowsPerPage);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleSort = () => {
        setSortDirection(prevSortDirection => prevSortDirection === 'asc' ? 'desc' : 'asc');
    };

    const editEmployee = (id: number) => {
        navigate(`/Employee/${id}`)
    };

    const deleteEmployee = async (id: number) => {
        const confirmation = window.confirm(`Are you sure you want to delete employee with ID: ${id}?`);
        if (confirmation) {
            await deleteEmployees(id);
            fetchEmployee();
        }
    };

    return (
        <div className="employee-container">
            <Headers divClassName="register-header" name="Employee List" />
            <div className="search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search by name or department"
                    className="search-bar"
                />
                <span className="tooltip">Enter name or department to search</span>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th onClick={handleSort} style={{ cursor: 'pointer' }}>
                            Created Date {sortDirection === 'asc' ? '↑' : '↓'}
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="employeeTableBody">
                    {currentEmployees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{`${employee.firstName} ${employee.lastName}`}</td>
                            <td>{employee.email}</td>
                            <td>{employee.departments.map(dept => dept.departmentName).join(', ') || 'N/A'}</td>
                            <td>{employee.createdDate}</td>
                            <td>
                                <div className="button-container">
                                    <button className='edit' onClick={() => editEmployee(employee.id)}>Edit</button>
                                    <button className='delete' onClick={() => deleteEmployee(employee.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button className='paginated-btn' onClick={handlePrevPage} disabled={currentPage === 1}>←</button>
                <span id="pageInfo">Page {currentPage} of {totalPages}</span>
                <button className='paginated-btn' onClick={handleNextPage} disabled={currentPage === totalPages}>→</button>
            </div>
        </div>
    );
};

export default EmployeeList;
