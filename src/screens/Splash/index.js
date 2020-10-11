import React, { useEffect } from 'react';
import { Container, LoadingIcon, Imagem, CustomText} from './styles'; 
import { useNavigation } from '@react-navigation/native';
import logo2 from '../../assets/logo2.png'


export default () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            const token = null;
            if (token) {
                //validar token
                //AsyncStorage
            } else {
                setTimeout(function() {
                    navigation.navigate('Splash')
                },3000)
            }
        }

        checkToken();
    }, [])
    
    return (
        <Container>
            <Imagem source={logo2}/>
            <CustomText>ToDo</CustomText>
            <LoadingIcon size="large" color="#a4d43a"/>
        </Container>
    );
}