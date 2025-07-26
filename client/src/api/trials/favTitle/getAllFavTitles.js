import { backendUrl } from "@/config";
import axios from "axios";

export const getAllFavTitles = async () => {
    // GET http://localhost:5000/api/trials HTTP/1.1
    const response = await axios.get(`${backendUrl}/fav-titles`);
    return response.data;
};
