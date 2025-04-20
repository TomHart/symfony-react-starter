import { useState, useEffect } from 'react';

function useCsrfToken() {
    const [csrfToken, setCsrfToken] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCsrfToken = async () => {
            setIsLoading(true); // Set loading state
            try {
                const response = await fetch('/csrf-token', {
                    method: 'GET',
                    credentials: 'include', // Ensure cookies are sent for the current session
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch CSRF token');
                }

                const data = await response.json();
                setCsrfToken(data.csrfToken);
            } catch (err: unknown) {
                // TypeScript: Check if the error is an instance of Error
                if (err instanceof Error) {
                    setError(err.message); // Handle errors
                } else {
                    setError('An unknown error occurred'); // In case the error is not an instance of Error
                }
            } finally {
                setIsLoading(false); // Reset loading state
            }
        };

        void fetchCsrfToken();
    }, []); // Only run once when the component mounts

    return {
        csrfToken,
        error,
        isLoading,
    };
}

export default useCsrfToken;
