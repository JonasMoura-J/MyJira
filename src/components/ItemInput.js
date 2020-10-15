import React from 'react';

import {
    Input,
    Button,
    TextButton,
    FormEnviar 
  } from './styles'

const ItemInput = (props) =>{

    return (
        <FormEnviar>
            {console.warn(props.setInput)}
            <Input
                placeholder="Incluir tarefas..."
                onChangeText={(letras) => { props.setInput(letras) }}
                value={props.input}
            />
            <Button onPress={props.handleAdd}>
                <TextButton>Criar</TextButton>
            </Button>
            
        </FormEnviar>
    );
}
export default ItemInput
