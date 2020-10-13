import React, { useState, useEffect, useContext } from 'react';
import { Text } from 'react-native';

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
  ProgressContainer
} from './styles'
import api from '../../../services/api';
import { UsuarioContext } from '../../../contexts/user';

import Icon from 'react-native-vector-icons/FontAwesome5';

import ProgressCircle from 'react-native-progress-circle';

const Tarefas = () =>{

  const {user} = useContext(UsuarioContext);

  const [percentual, setPercentual] = useState(0);

  const percentualTarefasRealizadas = async () => {
    const resultado = await api.get(`usuarios/${user.id}?_embed=tarefas`);
    const listaTarefas = resultado.data.tarefas
    const tarefas_realizadas = listaTarefas.filter(tarefa => tarefa.concluido)

    const calculo_percentual = (tarefas_realizadas.length / listaTarefas.length) * 100

    setPercentual(calculo_percentual)
  }

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const loadTasks = async () => {

    try {
      const response = await api.get("tarefas");
      
      
      setTasks(response.data)
      
    } catch (err) {
      console.warn("Falha ao recuperar as tarefas.")
    }
  }

  const handleAddTasks = async () => {

    if (newTask == "") {
      console.warn("Você deve preencher a tarefa")
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
      console.warn("Erro ao salvar a tarefa")
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
      console.warn("Erro ao deletar tarefa")
    }
   
  }

  useEffect(() => {
    loadTasks();
    percentualTarefasRealizadas();
  }, [])

  const tarefas = tasks.filter(t => t.usuarioId == user.id)

  return (
    <Container>
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

        <ProgressContainer>
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
      </ProgressContainer>

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