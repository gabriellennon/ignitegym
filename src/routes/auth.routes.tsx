import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';

type AuthRoutes = {
    //Como nao vai ter nenhum parametro passado pela rota eu coloco undefined
    signIn: undefined;
    signUp: undefined;
}

// Essa sera exportada para ser utilizada com as outras rotas
export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes(){
    return(
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen 
                name="signIn"
                component={SignIn}
            />

            <Screen 
                name="signUp"
                component={SignUp}
            />
        </Navigator>
    )
}