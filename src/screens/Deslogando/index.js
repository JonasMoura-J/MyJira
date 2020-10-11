import React, {useEffect, useContext} from 'react'
import { UsuarioContext } from '../../../contexts/user';
import { useNavigation } from '@react-navigation/native';
import {
    Container,
    TextDeslogando,
    LoadingIcon

  } from './styles'


const Deslogando = () =>{
    const { signOut } = useContext(UsuarioContext);
    
    useEffect(() =>{ 
        signOut()
    },[])

    useEffect(() => {
        const navigation = useNavigation();

        const deslog = async () => {
                setTimeout(function() {
                    // navigation.reset({
                    // routes:[{name: 'SignIn'}]
                    // });
                    console.warn('qualquer')
                },3000)
        }
        deslog();
    }, [])

    return(
        <Container>
            <TextDeslogando>Deslogando...</TextDeslogando>
            <LoadingIcon size="large" color="#a4d43a"/>
        </Container>

    )
}
export default Deslogando