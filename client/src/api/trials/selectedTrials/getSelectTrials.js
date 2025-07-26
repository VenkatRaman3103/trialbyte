import { backendUrl } from "@/config";
import axios from "axios";

export const getSelectTrials = async () => {
    const response = await axios.get(`${backendUrl}/selected-trials`);

    return response.data;
};
