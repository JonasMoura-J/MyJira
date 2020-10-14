import React, { createContext, useState, useEffect } from 'react';

import api from '../services/api';

import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native'
const UsuarioContext = createContext({});

const UsuarioProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const loadData = async () => {
      const user = await AsyncStorage.getItem("@JIRA:user")

      if (user) {
        setUser(JSON.parse(user))
      }
    }

    loadData();
  }, []);


  const signIn = async (email, password) => {
    const response = await api.get('usuarios');
    

    const user = response.data.find((usuario) => {
      return email === usuario.email && password === usuario.password
    })


    if (user !== undefined) {
      setUser(user)
      await AsyncStorage.setItem("@JIRA:user", JSON.stringify(user));

    } else {
      Alert.alert("","Senha ou Usuário inválidos.",[{text:'ok'}])
    }

  }

  const signOut = async () => {
    await AsyncStorage.removeItem("@JIRA:user");
    setUser(null)
  }


  return (
    <UsuarioContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </UsuarioContext.Provider>
  )
}

export { UsuarioContext, UsuarioProvider }