import { backendUrl } from "@/config";
import axios from "axios";

export const deleteMultipleUsers = async (ids) => {
    console.log(ids, "ids");
    const response = await axios.delete(`${backendUrl}/users`, {
        data: { ids },
    });
    console.log(response, "response");
    return response.data;
};
