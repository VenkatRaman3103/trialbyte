import { backendUrl } from "@/config";
import axios from "axios";

export const saveFavTitles = async (trial_ids) => {
    console.log(
        trial_ids.map((item) => item.id),
        "trial_idsids",
    );

    const response = await axios.post(`${backendUrl}/fav-titles`, {
        trial_ids: trial_ids.map((item) => item.id),
    });
    return response;
};
