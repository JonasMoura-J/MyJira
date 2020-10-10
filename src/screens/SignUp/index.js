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
    SignMessageButtonTextBold
} from './styles'; 


import Logo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import PersonIcon from '../../assets/person.svg';

export default () => {
    const navigation = useNavigation();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    const handleMessageButtonClick = () => {
        navigation.reset({
            routes:[{name: 'SignIn'}]
        });
    }

    return (
        <Container>
            <Logo width="100%" height="160"/>
            <InputArea>
                <SignInput 
                    IconSvg={PersonIcon}
                    placeholder="Digite seu nome"
                    value={nome}
                    onChangeText={texto => setNome(texto)}
                
                />
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
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça login</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    );
}