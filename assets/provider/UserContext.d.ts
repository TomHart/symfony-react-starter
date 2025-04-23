import React from 'react';
export type User = {
    id: number;
    email: string;
    roles: string[];
};
export declare const useUser: () => {
    user: User | null;
    loading: boolean;
    error: any;
};
export declare const UserProvider: ({ children }: Readonly<{
    children: React.ReactNode;
}>) => React.JSX.Element;
