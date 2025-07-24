import { backendUrl } from "@/config";
import axios from "axios";

export const getAllSavedQueries = async (params = {}) => {
    const response = await axios.get(`${backendUrl}/saved-queries`, { params });
    return response.data;
};

export const getSavedQuery = async (id) => {
    const response = await axios.get(`${backendUrl}/saved-queries/${id}`);
    return response.data;
};

export const createSavedQuery = async (queryData) => {
    const response = await axios.post(`${backendUrl}/saved-queries`, queryData);
    return response.data;
};

export const updateSavedQuery = async (id, queryData) => {
    const response = await axios.put(
        `${backendUrl}/saved-queries/${id}`,
        queryData,
    );
    return response.data;
};

export const deleteSavedQuery = async (id) => {
    const response = await axios.delete(`${backendUrl}/saved-queries/${id}`);
    return response.data;
};

export const executeSavedQuery = async (id, executionData) => {
    const response = await axios.post(
        `${backendUrl}/saved-queries/${id}/execute`,
        executionData,
    );
    return response.data;
};

export const getQueryHistory = async (params = {}) => {
    const response = await axios.get(`${backendUrl}/query-history`, { params });
    return response.data;
};

export const getFavoriteQueries = async (params = {}) => {
    const response = await axios.get(`${backendUrl}/saved-queries/favorites`, {
        params,
    });
    return response.data;
};

export const toggleFavorite = async (id) => {
    const response = await axios.patch(
        `${backendUrl}/saved-queries/${id}/favorite`,
    );
    return response.data;
};
