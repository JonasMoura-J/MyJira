import React, { useState, useEffect, useContext } from 'react';
import { Text, Image, ImageBackground } from 'react-native';

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
import api from '../../../services/api';
import { UsuarioContext } from '../../../contexts/user';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import bg from '../../assets/fundo.jpg'
import logo from '../../assets/logo2.png'
import ProgressCircle from 'react-native-progress-circle';
import ProgressLine from '../../components/ProgressLine';

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
      const response = await api.get("tarefas");
      
      
      setTasks(response.data)
      
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
  }, [])

  const tarefas = tasks.filter(t => t.usuarioId == user.id)

  return (
    <Container>
      <ImageBackground source={bg} style ={{height: 150, width: 400}}>
      <Logo>
        <Image source={logo} style ={{height: 45, width: 45, margin: 8}}/>
        <TextLogo>MyJira</TextLogo>
      </Logo>
      <FormEnviar>
        <Input
          placeholder="Incluir tarefas..."
          onChangeText={(letras) => { setNewTask(letras) }}
          value={newTask}
        />
        <Button onPress={handleAddTasks}>
          <TextButton>Criar</TextButton>
        </Button>
        
        </FormEnviar>
      </ImageBackground>
      <ProgressLine percent={percentual}/>
        {/* <ProgressContainer>
          <ProgressCircle
            percent={percentual}
            radius={70}
            borderWidth={7}
            color="#3aa4d4"
            shadowColor="#999"
            bgColor="#1c1c1c"
          >
          <Text style={{ fontSize: 25, color: "#fff", fontWeight: "bold" }}>{`${percentual.toFixed(0)}%`}</Text>
          </ProgressCircle>
      </ProgressContainer> */}

      <Tasks showsVerticalScrollIndicator={false}>
      {tarefas.map(task => (
            <TaskContainer key={task.id} finalizado={task.concluido}>

            <TaskText>{task.descricao}</TaskText>

          <TaskActions>
          <BoxIcon>
            <Icon
              name="trash-alt"
              color="#ca0000"
              size={30}
              onPress={() => { handleRemoveTask(task) }}
            />
          </BoxIcon>
          <BoxIcon>
            <Icon
              name={task.concluido ? "check" : "clock"}
              color={task.concluido ? "#a4d43a" : "#000"}
              size={30}
              onPress={() => { handleTasks(task)}}
            /> 
          </BoxIcon>
           </TaskActions>

         </TaskContainer>
      ))}
      </Tasks>
    </Container>  
  )
}

export default Tarefas;