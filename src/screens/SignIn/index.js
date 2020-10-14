import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import SignInput from '../../components/SignInput';
import { 
    Container, 
    CustomButton,
    CustomButtonText, 
    InputArea,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';

import agenda from '../../assets/agenda.png';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import { Alert,} from 'react-native';
import { UsuarioContext } from '../../../contexts/user';
import AnimatedImage from '../../components/AnimatedImage'

export default () => {

    const { signIn } = useContext(UsuarioContext);

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes:[{name: 'SignUp'}]
        });
    }

    const handleSubmit = async () => {

        try {
          await signIn(email, password)
        } catch (err) {
          Alert.alert("",'erro ao realizar a requisição',[{text:'ok'}])
      }
    }
    return (
        <Container>
            <AnimatedImage/>
            <InputArea>
                <SignInput 
                    IconSvg={EmailIcon}
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChangeText={texto => setEmail(texto)}
                />
                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={password}
                    onChangeText={texto => setPassword(texto)}
                    password={true}
                />

                <CustomButton onPress={handleSubmit} disabled={!password || !email}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
            </InputArea>
            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}