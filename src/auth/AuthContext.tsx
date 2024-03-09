import { createContext, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { dodGet, dodPost } from '../axios-config';

const authenticate = async () => {
    const isAuthenticated = await dodGet('/authenticateToken').then(response => response.status === 200);
    return isAuthenticated;
};

interface AuthContextProps {
    isLoggedIn: boolean,
    isLoggedInStatus: string,
    logOut: any,
    logIn: any
}

const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    isLoggedInStatus: 'pending',
    logOut: null,
    logIn: null
});

const AuthProvider = ({ children } : {children : React.ReactNode}) => {
    const queryClient = useQueryClient();

    const { data: isLoggedIn, status: isLoggedInStatus } = useQuery({
        queryKey: ['authenticated'],
        queryFn: authenticate
    });

    const logOut = useMutation({
        mutationFn: async () => {
            return await dodPost('/logout')
        },
        onSuccess: () => {
            queryClient.setQueryData(['authenticated'], false);
        },
        onError: () => {

        }
    });

    const logIn = useMutation({
        mutationFn: async (params) => {
            const response = await dodPost('/login', params);
            return response;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['authenticated'], true);
            return data;
        },
        onError: (e) => {
            return e;
        }
    });

    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn || false,
            isLoggedInStatus,
            logOut,
            logIn
        }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export {
    useAuth,
    AuthProvider
}