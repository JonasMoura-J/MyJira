import React, {useEffect, useContext} from 'react'
import { UsuarioContext } from '../../../contexts/user';

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

    return(
        <Container>
            <TextDeslogando>Deslogando...</TextDeslogando>
            <LoadingIcon size="large" color="#a4d43a"/>
        </Container>

    )
}
export default Deslogando