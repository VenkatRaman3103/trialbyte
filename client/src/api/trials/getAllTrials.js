import { backendUrl } from "@/config";
import axios from "axios";

export const getAllTrials = async () => {
    // GET http://localhost:5000/api/trials HTTP/1.1
    const response = await axios.get(`${backendUrl}/trials`);
    return response.data;
};
