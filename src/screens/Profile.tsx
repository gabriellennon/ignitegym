import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Center, Heading, ScrollView, Skeleton, Text, useToast, VStack } from "native-base";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE = 33;

export function Profile(){
    const [photoIsLoading, setPhotoIsLoading] = useState(false);
    const [userPhoto, setUserPhoto] = useState('https://github.com/gabriellennon.png');

    const toast = useToast();

    async function handleUserPhotoSelect() {
        setPhotoIsLoading(true);

        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                // a qualidade da imagem vai de 0 a 1
                quality: 1,
                // Dizendo que será uma imagem 4x4
                aspect: [4,4],
                // Permitindo que o usuario possa editar a imagem
                allowsEditing: true
            });
    
            // Se o usuario nao selecionou uma foto nem segue em frente
            if(photoSelected.canceled){
                return;
            }

            if(photoSelected.assets[0].uri){
                const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);
                
                // Transformando o tamanho da imagem de byte para MB e verificando se ela é maior que 5MB se for mostramos o alerta
                if(photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
                    return toast.show({
                        title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
                        placement: 'top',
                        bgColor: 'red.500'
                    })
                }

                setUserPhoto(photoSelected.assets[0].uri)
            }
    
        } catch (error) {
            console.log(error)
        } finally {
            setPhotoIsLoading(false);
        }
    }

    return(
        <VStack flex={1}>
            <ScreenHeader title="Perfil" />
            <ScrollView>
                <Center mt={6} px={10}>
                    {
                        photoIsLoading ?
                            <Skeleton 
                                w={PHOTO_SIZE} 
                                h={PHOTO_SIZE} 
                                rounded="full" 
                                startColor="gray.500"
                                endColor="gray.400"
                            />
                        :
                            <UserPhoto  
                                source={{ uri: userPhoto }}
                                alt="Foto do usuário"
                                size={PHOTO_SIZE}
                            />
                    }

                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
                            Alterar foto
                        </Text>
                    </TouchableOpacity>

                    <Input 
                        bg="gray.600"
                        placeholder="Nome"
                    />

                    <Input 
                        bg="gray.600"
                        isDisabled
                        value="gabriellennon7@gmail.com"
                    />
                </Center>

                <VStack px={10} mt={12} mb={9}>
                    <Heading color="gray.200" fontSize="md" mb={2} fontFamily="heading">
                        Alterar senha
                    </Heading>

                    <Input 
                        bg="gray.600"
                        placeholder="Senha antiga"
                        secureTextEntry
                    />

                    <Input 
                        bg="gray.600"
                        placeholder="Nova senha"
                        secureTextEntry
                    />

                    <Input 
                        bg="gray.600"
                        placeholder="Confirme a nova senha"
                        secureTextEntry
                    />

                    <Button 
                        title="Atualizar"
                        mt={4}
                    />
                </VStack>
            </ScrollView>
        </VStack>
    )
}