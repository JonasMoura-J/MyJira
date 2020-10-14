import React, { useState, useContext } from 'react';
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
import { Alert, Animated, Easing } from 'react-native';
import { UsuarioContext } from '../../../contexts/user';

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
          Alert.alert("",'ola erro ao realizar a requisição',[{text:'ok'}])
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