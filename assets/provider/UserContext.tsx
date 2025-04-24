import React, {createContext, useContext, useEffect, useState} from 'react';

export type User = {
    id: number;
    email: string;
    roles: string[];
}

type UserContextType =
    | { user: User; loading: false; error: null }
    | { user: null; loading: false; error: Error }
    | { user: null; loading: true; error: null };

// Create the context
const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    error: null,
});

// Export a custom hook for easier access
export const useUser = () => useContext(UserContext);

// Create the provider component
export const UserProvider = ({children}: Readonly<{ children: React.ReactNode }>): React.JSX.Element => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // optional loading state
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/user');
                if (!res.ok) throw new Error('Failed to fetch user');
                const data = await res.json();
                setUser(data);
            } catch (err) {
                // console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        void fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{user, loading, error}}>
            {children}
        </UserContext.Provider>
    );
};

