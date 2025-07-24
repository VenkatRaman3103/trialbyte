import { backendUrl } from "@/config";
import axios, { Axios } from "axios";

export const getAllTrials = async () => {
    const response = await axios.get(`${backendUrl}/trials`);
    return response.data;
};
