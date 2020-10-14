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
import { Alert , Animated, Easing } from 'react-native';
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
          Alert.alert("","Você deve preencher todos os campos",[{text:'ok'}])
          return
        }

        const listaUsuarios = await api.get("usuarios");
        const emailExistente = listaUsuarios.data.find(u => u.email == email)
        
        if (emailExistente) {
          Alert.alert("","", "E-mail já cadastrado", [{text:"ok"}])
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
          Alert.alert("","Usuario cadastrado com sucesso!",[{text:'ok'}])
        } catch (err) {
          Alert.alert("","Erro ao salvar usuario",[{text:'ok'}])
        }
    
      }
      
    let spinValue = new Animated.Value(0)

    // First set up animation 
    Animated.timing(
        spinValue,
    {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true  // To make use of native driver for performance
    }
    ).start()

    // Second interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']

    })

    return (
        <Container>
            <Animated.Image
                style={{transform: [{rotateY: spin}], height: 100, width: 100}}
                source={agenda} />

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