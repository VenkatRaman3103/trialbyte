import { backendUrl } from "@/config";
import axios from "axios";

export const deleteFavTitles = async (trial_ids) => {
    await axios.delete(`${backendUrl}/fav-titles`, {
        data: {
            trial_ids: trial_ids,
        },
    });
};
