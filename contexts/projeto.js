import React, { createContext, useState, useEffect } from 'react';

import api from '../services/api';

import AsyncStorage from '@react-native-community/async-storage';

const ProjetoContext = createContext({});

const ProjetoProvider = ({ children }) => {

  const [projeto, setProjeto] = useState("");


  useEffect(() => {

    const loadData = async () => {
      const projeto = await AsyncStorage.getItem("projeto")
      if (projeto) {
        setProjeto(JSON.parse(projeto))
      }
    }

    loadData();
  }, []);

  const EntrarProjeto = async (id) => {
      setProjeto(id)
    await AsyncStorage.setItem("projeto", JSON.stringify(id));
  }

  const SairProjeto = async () => {
    await AsyncStorage.removeItem("projeto");
    setProjeto("")
  }


  return (
    <ProjetoContext.Provider value={{ projeto, EntrarProjeto, SairProjeto }}>
      {children}
    </ProjetoContext.Provider>
  )
}

export { ProjetoContext, ProjetoProvider }