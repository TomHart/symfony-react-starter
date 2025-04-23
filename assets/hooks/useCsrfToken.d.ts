type UseCsrfTokenOptions = {
    namespace: string;
};
declare function useCsrfToken({ namespace }: UseCsrfTokenOptions): {
    csrfToken: string;
    error: string | null;
    isLoading: boolean;
};
export default useCsrfToken;
