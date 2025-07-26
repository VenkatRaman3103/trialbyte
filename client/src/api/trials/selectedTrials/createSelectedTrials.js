import { backendUrl } from "@/config";
import axios from "axios";

export const createSelectedTrials = async (trial_ids) => {
    console.log(trial_ids, "trial_ids: createSelectedTrials");
    const response = await axios.post(`${backendUrl}/selected-trials`, {
        trial_ids: trial_ids,
    });
    return response;
};
