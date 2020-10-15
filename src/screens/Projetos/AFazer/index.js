import React, { useState, useEffect, useContext } from 'react';
import { Alert,Text, Image, ImageBackground } from 'react-native';

import {
  Container,
  Task,
  TaskContainer,
  TaskActions,
  Input,
  Button,
  TextButton,
  FormEnviar,
  Tasks,
  TaskText,
  BoxIcon,
  ProgressContainer,
  Logo,
  TextLogo
} from './styles'

import api from '../../../../services/api';

import bg from '../../../assets/fundo.jpg'
import logo from '../../../assets/logo2.png'


import { ProjetoIdContext } from '../../../../contexts/projeto';
import Item from '../../../components/Item';
import ProgressLine from '../../../components/ProgressLine';
import ItemInput from '../../../components/ItemInput';

const AFazer = () => {

  const {idDoProjeto} = useContext(ProjetoIdContext);

  const [percentual, setPercentual] = useState(0);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const percentualAFazerRealizados = async () => {
    const response = await api.get(`projetos/${idDoProjeto}?_embed=afazeres`); 
    const listaAfazer = response.data.afazeres
    const afazer_realizadas = listaAfazer.filter(afazer => afazer.concluido)
    const calculo_percentual = (listaAfazer.length < 1 ? 0 : afazer_realizadas.length / listaAfazer.length) * 100

    setPercentual(calculo_percentual)
    handleProjetos(calculo_percentual)
    
  }

  const handleProjetos = async (calculo_percentual) => {
    
    const resposta = await api.get(`projetos/${idDoProjeto}`);
    const r = resposta.data

    if(calculo_percentual==100){    
      const params = {
        ...r,
        concluido: true
      }
      try {
        await api.put(`projetos/${idDoProjeto}`, params);
      } catch (err) {
        
      }
    }else{
      const params = {
        ...r,
        concluido: false
      }
      try {
        await api.put(`projetos/${idDoProjeto}`, params);

      } catch (err) {
        
      }
    }
    
  }
  
  const loadTasks = async () => {

    try {
      const response = await api.get(`projetos/${idDoProjeto}?_embed=afazeres`); 
      const listaAfazer = response.data.afazeres
      setTasks(listaAfazer)
      
    } catch (err) {
      Alert.alert("","Falha ao recuperar afazeres.",[{text:'ok'}])
    }
  }

  const handleAddTasks = async () => {

    if (newTask == "") {

      Alert.alert("","Você deve preencher o afazer",[{text:'ok'}])
      return
    }
    const params = {
      descricao: newTask,
      concluido: false,
      projetoId: idDoProjeto
    }

    try {
      await api.post("afazeres", params);
      setNewTask("");
      loadTasks();
      percentualAFazerRealizados(tasks);
    } catch (err) {
      Alert.alert("","Erro ao salvar o afazer",[{text:'ok'}])
    }

  }

  const handleTasks = async (task) => {

    const params = {
      ...task,
      concluido: !task.concluido
    }

    try {
      await api.put(`afazeres/${task.id}`, params);
      loadTasks();
      percentualAFazerRealizados();
    } catch (err) {

    }
  }

  const handleRemoveTask = async ({ id }) => {

    try {
      await api.delete(`afazeres/${id}`);
      loadTasks();
      percentualAFazerRealizados();
    } catch (err) {
      Alert.alert("","Erro ao deletar o afazer",[{text:'ok'}])
    }

  }

  useEffect(() => {
    loadTasks();
    percentualAFazerRealizados();
  }, [])

  return (
    <Container>
      <ImageBackground source={bg} style ={{height: 150, width: 400}}>
        <Logo>
          <Image source={logo} style ={{height: 45, width: 45, margin: 8}}/>
          <TextLogo>MyJira</TextLogo>
        </Logo>

        <ItemInput input={newTask} setInput={setNewTask} handleAdd={handleAddTasks} type= 'afazeres'/>
        
      </ImageBackground>

      <ProgressLine percent={percentual} textPercent={`${percentual.toFixed(0)}%`}/>

      <Tasks showsVerticalScrollIndicator={false}>

        {tasks.map(a =>

          <Item label={a} handle={handleTasks} handleRemove={handleRemoveTask} key={a.id}/>
        )}

      </Tasks>
    </Container>
        
  )
}

export default AFazer;