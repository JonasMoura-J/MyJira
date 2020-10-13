import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';
import {UsuarioProvider} from './contexts/user'
import { ProjetoProvider } from './contexts/projeto';


export default () => {
  return (
      <ProjetoProvider>
      <UsuarioProvider>
        <Routes />
      </UsuarioProvider>
      </ProjetoProvider>    
  );
}