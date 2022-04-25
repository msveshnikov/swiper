import { useState, useEffect } from "react";

const useHttp = (httpClient) => {
    const [error, setError] = useState(null);

    const requestInterceptor = httpClient.interceptors.request.use((req) => {
        setError(null);
        return req;
    });

    const responseInterceptor = httpClient.interceptors.response.use(
        (res) => res,
        (error) => setError(error)
    );

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(requestInterceptor);
            httpClient.interceptors.request.eject(responseInterceptor);
        };
    }, [httpClient.interceptors.request, requestInterceptor, responseInterceptor]);

    const errorHandler = () => {
        setError(null);
    };
    return [error, errorHandler];
};

export default useHttp;
