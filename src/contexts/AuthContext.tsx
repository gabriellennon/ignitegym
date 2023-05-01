import { ReactNode, createContext } from "react";

import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
    user: UserDTO;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps){
    {/* Sharing my context with my application */}
    return (
        <AuthContext.Provider value={{
            user: {
            id: '1',
            name: 'Gabriel',
            email: 'gabriel@email.com',
            avatar: 'gabriel.png'
            }
        }}>
            {children}
        </AuthContext.Provider>
    )
}