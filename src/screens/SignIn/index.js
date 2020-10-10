import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import SignInput from '../../components/SignInput';
import { 
    Container, 
    CustomButton,
    CustomButtonText, 
    InputArea,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    Imagem
} from './styles'; 


import agenda from '../../assets/agenda.png';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';


export default () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    const handleMessageButtonClick = () => {
        navigation.reset({
            routes:[{name: 'SignUp'}]
        });
    }

    return (
        <Container>
            <Imagem source={agenda} style ={{height: 100, width: 100}}/>
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
                    value={senha}
                    onChangeText={texto => setSenha(texto)}
                    password={true}
                />

                <CustomButton>
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