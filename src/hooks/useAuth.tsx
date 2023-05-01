import { useContext } from 'react';
import { AuthContext } from '@contexts/AuthContext';

export function useAuth(){
        // To access content of my context
        const context = useContext(AuthContext);

        return context;
}