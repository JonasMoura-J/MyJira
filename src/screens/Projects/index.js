import React, { useState, useEffect, useContext } from 'react';
import { Text, View } from 'react-native';

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
  BoxIcon
} from './styles'

import api from '../../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome5';

// import { UsuarioContext } from '../../contexts/user';

const Tarefas = () => {

//   const usuario = useContext(UsuarioContext);

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
      // if (newTask.isEmpty()) {
      // if (!(!!newTask)) {
      console.warn("você deve preencher a tarefa")
      return
    }
    const params = {
      descricao: newTask,
      concluido: false
    }

    try {
      await api.post("tarefas", params);
      setNewTask("");
      loadTasks();
    } catch (err) {
      console.warn("erro ao salvar a tarefa")
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
    } catch (err) {

    }
  }

  const handleRemoveTask = async ({ id }) => {

    try {
      await api.delete(`tarefas/${id}`);
      loadTasks();
    } catch (err) {
      console.warn("erro ao deletar tarefa")
    }
    // console.warn(`delete ${id}`)
  }

  //Apenas será executado uma única vez!
  useEffect(() => {
    loadTasks();
  }, [])

  //Aerá executado toda vez que NewTask sofrer alterações
  //apenas um exemplo, sem relação com a solução atual
  useEffect(() => {
    // console.warn(newTask)
  }, [newTask])

  return (

    <Container>
      <FormEnviar>
        <Input
          placeholder="Digitar a tarefa ..."
          onChangeText={(letras) => { setNewTask(letras) }}
          value={newTask}
        />
        <Button onPress={handleAddTasks}>
          <TextButton>Criar</TextButton>
        </Button>
      </FormEnviar>

      <Tasks showsVerticalScrollIndicator={false}>


        {tasks.map(task => (
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

        )
        )}
      </Tasks>
    </Container>

        
  )

}

export default Tarefas;