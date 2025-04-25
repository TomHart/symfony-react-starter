import {useState} from 'react';

type UseCsrfTokenOptions = {
    namespace: string;
};

function useCsrfToken({namespace = 'authenticate'}: UseCsrfTokenOptions) {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCsrfToken = async () => {
        setIsLoading(true); // Set loading state
        try {
            const response = await fetch('/csrf-token', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({namespace}),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch CSRF token');
            }

            const data = await response.json();
            const token: string = data.csrfToken;
            return token;
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

    return {
        fetchCsrfToken,
        error,
        isLoading,
    };
}

export default useCsrfToken;
