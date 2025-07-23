import { backendUrl } from "@/config";
import axios from "axios";

export const createNewTrial = async (formData) => {
    const body = { ...formData };

    const response = await axios.post(`${backendUrl}/trials`, body);

    return response.data;
};
