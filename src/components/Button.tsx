import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base';

type Props = IButtonProps & {
    title: string;
    //Se eu nao tipar pode ser qualquer outra variante
    variant?: 'solid' | 'outline';
}

export function Button({ title, variant = 'solid', ...rest}: Props){
    return (
        <NativeBaseButton
            w="full"
            h={14}
            bg={variant === "outline" ? "transparent" : "green.700"}
            rounded="sm"
            borderWidth={variant === "outline" ? 1 : 0}
            borderColor="green.500"
            _pressed={{
                bg: variant === "outline" ? "gray.500" : "green.500"
            }}
            {...rest}
        >
            <Text 
                color={variant === "outline" ? "green.500" : "white"} 
                fontFamily="heading" 
                fontSize="sm"
            >
                {title}
            </Text>
        </NativeBaseButton>
    );
}