import React, { useState, useEffect, useContext } from 'react';
import { Text, Image, ImageBackground, View } from 'react-native';

import {
  Container,
  Tasks,
  Logo,
  TextLogo,
  TextTitle
} from './styles'
import api from '../../../services/api';
import { UsuarioContext } from '../../../contexts/user';
import { Alert } from 'react-native';
import bg from '../../assets/fundo.jpg'
import logo from '../../assets/logo2.png'
import ProgressLine from '../../components/ProgressLine';
import Item from '../../components/Item';
import ItemInput from '../../components/ItemInput';

const Tarefas = () =>{

  const {user} = useContext(UsuarioContext);

  const [percentual, setPercentual] = useState(0);

  const percentualTarefasRealizadas = async () => {
    const resultado = await api.get(`usuarios/${user.id}?_embed=tarefas`);
    const listaTarefas = resultado.data.tarefas
    const tarefas_realizadas = listaTarefas.filter(tarefa => tarefa.concluido)

    const calculo_percentual = (listaTarefas.length < 1 ? 0 : tarefas_realizadas.length / listaTarefas.length) * 100

    setPercentual(calculo_percentual)
  }

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const loadTasks = async () => {

    try {
      const response = await api.get(`usuarios/${user.id}?_embed=tarefas`);      
      const listaTarefas = response.data.tarefas
      setTasks(listaTarefas)
      
    } catch (err) {
      Alert.alert("","Falha ao recuperar as tarefas.",[{text:'ok'}])
    }
  }

  const handleAddTasks = async () => {

    if (newTask == "") {
      Alert.alert("","Você deve preencher a tarefa",[{text:'ok'}])
      return
    }
    const params = {
      descricao: newTask,
      concluido: false,
      usuarioId: user.id
    }

    try {
      await api.post("tarefas", params);
      setNewTask("");
      loadTasks();
      percentualTarefasRealizadas();
    } catch (err) {
      Alert.alert("","Erro ao salvar a tarefa",[{text:'ok'}])
    }
  }

  const handleTasks = async (task) => {

    const params = {
      ...task,
      concluido: !task.concluido
    }

    try {
      await api.put(`tarefas/${task.id}`, params);
      loadTasks();
      percentualTarefasRealizadas();
    } catch (err) {

    }
  }

  const handleRemoveTask = async ({ id }) => {

    try {
      await api.delete(`tarefas/${id}`);
      loadTasks();
      percentualTarefasRealizadas();
    } catch (err) {
      Alert.alert("","Erro ao deletar tarefa",[{text:'ok'}])
    }
   
  }

  useEffect(() => {
    loadTasks();
    percentualTarefasRealizadas();
  },[])

  return (
    <Container>
      <ImageBackground source={bg} style ={{height: 150, width: 400}}>
      <Logo>
        <Image source={logo} style ={{height: 45, width: 45, margin: 8}}/>
        <TextLogo>MyJira</TextLogo>
      </Logo>

      <ItemInput input={newTask} setInput={setNewTask} handleAdd={handleAddTasks} type= 'tarefas'/>

      </ImageBackground>
      
      <ProgressLine percent={percentual} textPercent={`${percentual.toFixed(0)}%`}/>

      <Tasks showsVerticalScrollIndicator={false}>
        
      {tasks.map(task => (
        
          <Item label={task} handle={handleTasks} handleRemove={handleRemoveTask} key={task.id}/>
      ))}

      </Tasks>
    </Container>  
  )
}

export default Tarefas;