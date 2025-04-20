declare function useCsrfToken(): {
    csrfToken: string;
    error: string | null;
    isLoading: boolean;
};
export default useCsrfToken;
