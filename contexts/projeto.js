import React, { createContext, useState, useEffect } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

const ProjetoIdContext = createContext({});

const ProjetoIdProvider = ({ children }) => {

  const [idDoProjeto, setIdDoProjeto] = useState("");


  useEffect(() => {
    const loadData = async () => {
      const idProjeto = await AsyncStorage.getItem("@JIRA:idProjeto")
      if (idProjeto) {
        setIdDoProjeto(JSON.parse(idProjeto))
      }
    }

    loadData();
  }, []);

  const SelecionarProjeto = async (id) => {
      setIdDoProjeto(id)
    await AsyncStorage.setItem("@JIRA:idProjeto", JSON.stringify(id));
  }

  //##Testar para ver se está sendo usado
  // const SairProjeto = async () => {
  //   await AsyncStorage.removeItem("@JIRA:idProjeto");
  //   setIdDoProjeto("")
  // }


  return (
    <ProjetoIdContext.Provider value={{ idDoProjeto, SelecionarProjeto}}>
      {children}
    </ProjetoIdContext.Provider>
  )
}

export { ProjetoIdContext, ProjetoIdProvider }