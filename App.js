import React from 'react';

import Routes from './routes';
import {UsuarioProvider} from './contexts/user'
import { ProjetoIdProvider } from './contexts/projeto';
import {LogBox} from 'react-native'


export default () => {
  LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.'])
  LogBox.ignoreLogs(['componentWillReceiveProps has been renamed'])

  return (
    <UsuarioProvider>
      <ProjetoIdProvider>
        <Routes />
     </ProjetoIdProvider>    
    </UsuarioProvider>
  );
}