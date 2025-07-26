import { getSelectTrials } from "@/api/trials/selectedTrials/getSelectTrials";
import { useQuery } from "@tanstack/react-query";

export const TrialsTabs = () => {
    const { data: selectedTrialsData } = useQuery({
        queryFn: () => getSelectTrials(),
        queryKey: ["selected-trials"],
    });

    console.log(selectedTrialsData, "selectedTrialsData");

    return (
        <div>
            <div>foobar</div>
        </div>
    );
};
