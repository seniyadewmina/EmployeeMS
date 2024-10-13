import { notifyError } from "../Components/notify";
import api from "./api";

export const getDepartment = async () => {
    try {
        const response = await api.get("/Departments");
        return response.data;
    } catch (error: any) {
        notifyError(error);
    }
}