import { useCallback } from "react";
import axios, { AxiosInstance } from "axios";

const useApiClient = () => {
    const apiClient = useCallback((): AxiosInstance => {
        const options = {
            baseURL: process.env.EXPO_PUBLIC_API_URL,
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${process.env.EXPO_PUBLIC_BEARER_TOKEN}`,
            },
        }
        const axiosInstance = axios.create(options);
        axiosInstance.interceptors.response.use((config) => config);
        axiosInstance.interceptors.response.use((response) => response, 
         async (error) => {
            if (error.response.status === 450) {
                return Promise.reject(error);
            }
            try {
                return axios(error.config);
            }
            catch (error) {
                return Promise.reject(error);
            }
         }
        );
        return axiosInstance;
    }, []);

    return { apiClient };
}

export default useApiClient;