"use client";
import { DrugTabs } from "@/components/DrugTables";
import { backendUrl } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
    const [tabIds, setTabIds] = useState([]);

    const { data, isLoading, error } = useQuery({
        queryKey: ["all-drugs"],
        queryFn: async () => {
            const response = await axios.get(`${backendUrl}/drugs`);
            return response.data;
        },
    });

    useEffect(() => {
        function updateTabIds() {
            if (!data) return;
            setTabIds(data.map((item) => item.id));
        }

        updateTabIds();
    }, [data]);

    return (
        <div style={{ margin: "50px" }}>
            <DrugTabs tabIds={tabIds} data={data} />
        </div>
    );
}
