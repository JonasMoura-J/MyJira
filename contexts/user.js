import React, { createContext, useState, useEffect } from 'react';

import api from '../services/api';

import AsyncStorage from '@react-native-community/async-storage';

const UsuarioContext = createContext({});

const UsuarioProvider = ({ children }) => {

  const [user, setUser] = useState(null);



  useEffect(() => {

    const loadData = async () => {
      const user = await AsyncStorage.getItem("@TODO:user")

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
      await AsyncStorage.setItem("@TODO:user", JSON.stringify(user));
      //tenho que persistir em um storage / banco de dados embarcado

    } else {
      console.warn("Senha ou Usuário inválidos.")
    }

  }

  const signOut = async () => {
    await AsyncStorage.removeItem("@TODO:user");
    setUser(null)
  }


  return (
    <UsuarioContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </UsuarioContext.Provider>
  )
}

export { UsuarioContext, UsuarioProvider }