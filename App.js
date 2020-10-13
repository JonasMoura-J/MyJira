import React from 'react';

import Routes from './routes';
import {UsuarioProvider} from './contexts/user'
import { ProjetoIdProvider } from './contexts/projeto';


export default () => {
  return (
    <UsuarioProvider>
        <ProjetoIdProvider>
        <Routes />
      </ProjetoIdProvider>    
    </UsuarioProvider>
  );
}