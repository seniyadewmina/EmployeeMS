using EmployeeManagement.Data;
using EmployeeManagement.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {

        private readonly AppDbContext _context;

        public EmployeesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            var employees = await _context.Employees
                .Include(e => e.Departments)
                .ToListAsync();

            return Ok(employees);
        }

        // GET: api/employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees
                .Include(e => e.Departments)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }


        // POST: api/employees
        [HttpPost]
        public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (employee.Departments != null && employee.Departments.Count > 0)
            {
                var departments = await _context.Departments
                    .Where(d => employee.Departments.Select(dept => dept.Id).Contains(d.Id))
                    .ToListAsync();

                employee.Departments = departments;
            }

            employee.createdDate = DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss");

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
        }

        // PUT: api/employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> update_employee(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            var existing_employee = await _context.Employees
                .Include(e => e.Departments)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (existing_employee == null)
            {
                return NotFound();
            }

            // Update employee fields
            existing_employee.FirstName = employee.FirstName;
            existing_employee.LastName = employee.LastName;
            existing_employee.Address = employee.Address;
            existing_employee.Mobile = employee.Mobile;
            existing_employee.Email = employee.Email;
            existing_employee.Birthday = employee.Birthday;

            // Update the departments if provided
            if (employee.Departments != null && employee.Departments.Count > 0)
            {
                var departments = await _context.Departments
                    .Where(d => employee.Departments.Select(dept => dept.Id).Contains(d.Id))
                    .ToListAsync();

                existing_employee.Departments = departments;
            }

            // Update the updated_date to the current date and time

            _context.Entry(existing_employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!employee_exists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool employee_exists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }


        // DELETE: api/employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }
}
