import { useContext } from 'react';
import { useTheme, Box } from 'native-base'
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthContext } from '@contexts/AuthContext';
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from './app.routes';

export function Routes(){
    const { colors } = useTheme();
    // To access content of my context
    const contextData = useContext(AuthContext);


    const theme = DefaultTheme;
    theme.colors.background = colors.gray[700]

    return (
        <Box flex={1} bg="gray.700">
            <NavigationContainer theme={theme}>
                <AuthRoutes />
                {/* <AppRoutes /> */}
            </NavigationContainer>
        </Box>
    )
}