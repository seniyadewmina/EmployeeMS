### Employee Management System (EMS)

A simple employee management system built with **C# .NET 7 (Web API) and React.js**, using **Entity Framework Core (Code First) and MySQL**.  

---

## 📌 Features

- **Employee List**: View all employees with pagination and filtering by name and department.  
- **Employee Registration**: Add new employees with validation.  
- **Update & Delete Employees**: Modify or remove employee records.  
- **Sorting**: Employee list sorted by creation date.  

---

## 🛠️ Tech Stack

### **Backend**
- **C# .NET 7** - Web API  
- **Entity Framework Core** - Code First Approach  
- **MySQL** - Database  

### **Frontend**
- **React.js** - Client-side  
- **Vite** - React project setup  
- **Axios** - API requests  

---

## 🚀 Installation & Setup

### **Backend Setup**
1. **Clone the repository**  
   ```bash
   git clone https://github.com/seniyadewmina/EmployeeMS.git
   cd EmployeeMS/EmployeeManagement
   ```

2. **Set up MySQL database**  
   - Update `appsettings.Development.json` with your database connection string.  

3. **Run database migrations**  
   ```bash
   dotnet ef database update
   ```

4. **Run the backend**  
   ```bash
   dotnet run
   ```

---

### **Frontend Setup**
1. **Navigate to the frontend directory**  
   ```bash
   cd EmployeeManagement-Frontend
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Run the frontend**  
   ```bash
   npm run dev
   ```

---

## 🏗️ Project Structure

```
/EmployeeManagement
│── Controllers/         # API Controllers
│── Data/               # Database Context
│── Migrations/         # EF Core Migrations
│── Models/             # Entity Models
│── Properties/
│── Program.cs          # Main Application Entry
│── appsettings.Development.json  # Configurations
│── EmployeeManagement.csproj
│── bin/Debug/net7.0/
│
/EmployeeManagement-Frontend
│── src/
│   ├── components/      # React Components
│   ├── pages/           # Page Components
│   ├── services/        # API Service Calls
│── public/
│── package.json
│── vite.config.ts
│── index.html
│── README.md
```

---

## 🎯 Best Practices Followed

✔️ **Object-Oriented Design**  
✔️ **C# Naming Conventions**  
✔️ **RESTful API Principles**  
✔️ **Modular and Scalable Architecture**  

---

## 💡 Future Enhancements

- Role-based authentication  
- Department CRUD operations  
- UI improvements  

---

## 📬 Contact

For any queries or suggestions, reach out via:  
📧 **seniyadewminaw@gmail.com**  
🔗 [LinkedIn](https://www.linkedin.com/in/seniyadewmina/)  

---
