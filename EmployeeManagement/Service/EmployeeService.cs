using EmployeeManagement.Data;
using EmployeeManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Service
{
    public class EmployeeService
    {
        private readonly AppDbContext _context;
        public EmployeeService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Employee> CreateEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<Employee> GetEmployeeById(int id)
        {
            var employee = await _context.Employees
                .Include(e => e.EmployeeDepartments)
                .ThenInclude(ed => ed.Department) // Include departments
                .FirstOrDefaultAsync(e => e.EmployeeId == id);

            if (employee == null)
            {
                throw new KeyNotFoundException("Employee not found.");
            }

            return employee;
        }

        public async Task<List<Employee>> GetAllEmployees()
        {
            return await _context.Employees
                .Include(e => e.EmployeeDepartments)
                .ThenInclude(ed => ed.Department) // Include departments
                .ToListAsync();
        }

        public async Task<Employee> UpdateEmployee(Employee employee)
        {
            var existingEmployee = await _context.Employees
                .Include(e => e.EmployeeDepartments)
                .FirstOrDefaultAsync(e => e.EmployeeId == employee.EmployeeId);

            if (existingEmployee == null)
            {
                throw new KeyNotFoundException("Employee not found.");
            }

            // Update employee details
            existingEmployee.FirstName = employee.FirstName;
            existingEmployee.LastName = employee.LastName;
            existingEmployee.Address = employee.Address;
            existingEmployee.Mobile = employee.Mobile;
            existingEmployee.Email = employee.Email;
            existingEmployee.Birthday = employee.Birthday;

            // Clear existing departments if needed
            existingEmployee.EmployeeDepartments.Clear();

            // Add the new department associations if provided
            if (employee.EmployeeDepartments != null)
            {
                foreach (var empDept in employee.EmployeeDepartments)
                {
                    existingEmployee.EmployeeDepartments.Add(empDept);
                }
            }

            await _context.SaveChangesAsync();
            return existingEmployee;
        }

        public async Task DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                throw new KeyNotFoundException("Employee not found.");
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
        }

        // Check for existing employee by email or mobile number
        public async Task<Employee> GetEmployeeByEmailOrMobile(string email)
        {
            return await _context.Employees
                .FirstOrDefaultAsync(e => e.Email == email);
        }

    }
}
