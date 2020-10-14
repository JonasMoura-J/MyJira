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
            } else {
                setTimeout(function() {
                    navigation.navigate('SignIn')
                },3000)
            }
        }

        checkToken();
    }, [])
    
    return (
        <Container>
            <Imagem source={logo2}/>
            <CustomText>MyJira</CustomText>
            <LoadingIcon size="large" color="#a4d43a"/>
        </Container>
    );
}