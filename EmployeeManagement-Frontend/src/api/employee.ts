import { notifyError, notifySuccess } from "../Components/notify";
import api from "./api";

export const getEmployees = async () => {
    try {
        const response = await api.get("/Employees");
        return response.data;
    } catch (error: any) {
        notifyError(error.message);
    }
}

export const getEmployeeById = async (id: string) => {
    try {
        const response = await api.get(`/Employees/${id}`);
        return response.data;
    } catch (error: any) {
        notifyError(error.message);
    }
}

export const deleteEmployees = async (id: number) => {
    try {
        const response = await api.delete(`/Employees/${id}`);
        notifySuccess("Employee deleted successfully");
        return response.data;
    } catch (error: any) {
        notifyError(error.message);
    }
}

export const newEmployees = async (data: any) => {
    try {
        const response = await api.post("/Employees", data);
        notifySuccess("Employee created successfully");
        return response;
    } catch (error: any) {
        notifyError(error.message);
    }
}

export const updateEmployees = async (id: string, data: any) => {
    try {
        const response = await api.put(`/Employees/${id}`, data);
        notifySuccess("Employee updated successfully");
        return response;
    } catch (error: any) {
        notifyError(error.message);
    }
}

