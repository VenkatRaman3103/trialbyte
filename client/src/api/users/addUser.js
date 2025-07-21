import { backendUrl } from "@/config";
import axios from "axios";

export const addUser = async (userData) => {
    const response = await axios.post(`${backendUrl}/users`, userData);
    console.log(response.data);
};
