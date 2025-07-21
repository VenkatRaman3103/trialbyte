import { backendUrl } from "@/config";
import axios from "axios";

export const deleteUserById = async (id) => {
    await axios.delete(`${backendUrl}/users/${id}`);
};
