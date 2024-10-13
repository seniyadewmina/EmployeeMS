import { useEffect, useState } from 'react';
import Button from "../../Atoms/button";
import Headers from "../../Atoms/headers";
import InputField from "../../Atoms/inputField";
import { getDepartment } from '../../api/department';
import { newEmployees } from '../../api/employee';
import './Register.css';
import { useNavigate } from 'react-router-dom';

interface Department {
    id: number;
    departmentName: string;
}

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [availableDepartments, setAvailableDepartments] = useState<Department[]>([]); 
    const [departments, setDepartments] = useState<Department[]>([]);
    const [errors, setErrors] = useState<any>();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleRegister = () => {
        const newErrors: any = {};
        
        if (!firstName) newErrors.firstName = 'First Name is required';
        if (!lastName) newErrors.lastName = 'Last Name is required';
        if (!address) newErrors.address = 'Address is required';
        if (!mobileNumber) {
            newErrors.mobileNumber = 'Mobile Number is required';
        } else if (!/^\d{10}$/.test(mobileNumber)) {
            newErrors.mobileNumber = 'Mobile Number must be 10 digits';
        }
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!birthday) newErrors.birthday = 'Birthday is required';
        if (departments.length === 0) newErrors.departments = 'At least one department must be selected';

        if (Object.keys(newErrors).length === 0) {
            handleSubmit(); 
        } else {
            setErrors(newErrors);
        }
    };

    useEffect(() => {
        const fetchDepartments = async () => {
            const departmentData = await getDepartment();
            if (departmentData) {
                setAvailableDepartments(departmentData); 
            }
        };

        fetchDepartments();
    }, []);

    const handleDepartmentToggle = (department: Department) => {
        setDepartments((prevDepartments) =>
            prevDepartments.some(dep => dep.id === department.id)
                ? prevDepartments.filter(dep => dep.id !== department.id)
                : [...prevDepartments, department]
        );
    };

    // Submit form data to the API
    const handleSubmit = async () => {
        const employeeData = {
            firstName,
            lastName,
            address,
            mobile: mobileNumber,
            email,
            birthday,
            createdDate: new Date().toISOString(),
            departments,
        };

        try {
            await newEmployees(employeeData);
            navigate('/')
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="register-container">
                <Headers divClassName="register-header" name="Register" />
                
                {errors?.firstName && <div className="error-message">{errors.firstName}</div>}
                <InputField inputClassName="input-field" divClassName="input-field-div" label="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                
                {errors?.lastName && <div className="error-message">{errors.lastName}</div>}
                <InputField inputClassName="input-field" divClassName="input-field-div" label="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                
                {errors?.address && <div className="error-message">{errors.address}</div>}
                <InputField inputClassName="input-field" divClassName="input-field-div" label="Address" value={address} onChange={e => setAddress(e.target.value)} />
                
                {errors?.mobileNumber && <div className="error-message">{errors.mobileNumber}</div>}
                <InputField inputClassName="input-field" divClassName="input-field-div" label="Mobile Number" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} />
                
                {errors?.email && <div className="error-message">{errors.email}</div>}
                <InputField inputClassName="input-field" divClassName="input-field-div" label="Email" value={email} onChange={e => setEmail(e.target.value)} />
                
                {errors?.birthday && <div className="error-message">{errors.birthday}</div>}
                <div className="input-field-div">
                    <label>Birthday</label>
                    <input
                        type="date"
                        className="input-field"
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)}
                    />
                </div>

                {errors?.departments && <div className="error-message">{errors.departments}</div>}
                <div className="input-field-div">
                    <label>Department</label>
                    <div className="dropdown">
                         <div className="dropdown-toggle" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            {departments.length > 0
                                ? departments.map(dep => dep.departmentName).join(', ')
                                : 'Select Departments'}
                        </div>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                {availableDepartments.map(department => (
                                    <label key={department.id} className="dropdown-item">
                                        <input
                                            type="checkbox"
                                            checked={departments.some(dep => dep.id === department.id)}
                                            onChange={() => handleDepartmentToggle(department)}
                                        />
                                        {department.departmentName}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <Button divClassName="btn-container" buttonClassName="register-button" name="Register" onClick={handleRegister} />
            </div>
        </>
    );
}

export default Register;
