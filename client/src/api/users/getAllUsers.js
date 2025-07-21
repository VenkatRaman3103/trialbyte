import { backendUrl } from "@/config";
import axios from "axios";

export const getAllUsers = async () => {
    const response = await axios.get(`${backendUrl}/users`);
    console.log(response.data);
    return response.data;
};
