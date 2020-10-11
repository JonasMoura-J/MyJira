import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';
import {UsuarioProvider} from './contexts/user'


export default () => {
  return (
      <UsuarioProvider>
        <Routes />
      </UsuarioProvider>
    
  );
}