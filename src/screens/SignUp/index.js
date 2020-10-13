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
import PersonIcon from '../../assets/person.svg';
import { Alert } from 'react-native';
import api from '../../../services/api';

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

    const handleAddAccount = async () => {
        
        if (nome == "" || email =="" || senha == "") {
          console.warn("você deve preencher todos os campos")
          return
        }
        const params = {
            name: nome,
            email: email,
            password: senha
        }
        try {
          await api.post("usuarios", params);
          setNome('')
          setEmail('')
          setSenha('')
          Alert.Alert("Usuario cadastrado com sucesso!")
        } catch (err) {
          console.warn("erro ao salvar usuario")
        }
    
      }
    return (
        <Container>
            <Imagem source={agenda} style ={{height: 100, width: 100}}/>
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
                    <CustomButtonText onPress = {handleAddAccount}>CADASTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça login</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    );
}