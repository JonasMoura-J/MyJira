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
  BoxIcon,
  ButtonProjects
} from './styles'
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { UsuarioContext } from '../../../contexts/user';

const Projetos = () => {

    const {user} = useContext(UsuarioContext);

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    const loadTasks = async () => {
      try {
        const response = await api.get("projetos");
        setTasks(response.data)

      } catch (err) {
        console.warn("Falha ao recuperar os projetos.")
      }
    }

  const handleAddTasks = async () => {
    
    if (newTask == "") {
      // if (newTask.isEmpty()) {
      // if (!(!!newTask)) {
      console.warn("você deve preencher um projeto")
      return
    }
    const params = {
      descricao: newTask,
      usuarioId: user.id,
      concluido: false
    }

    try {
      console.warn(params)
      await api.post("projetos", params);
      setNewTask("");
      loadTasks();
    } catch (err) {
      console.warn("erro ao salvar o projeto")
    }

  }

  const handleTasks = async (task) => {
    
    const params = {
      ...task,
      concluido: !task.concluido
    }
    try {
      
      await api.put(`projetos/${task.id}`, params);
      loadTasks();
    } catch (err) {

    }
  }

  const handleRemoveTask = async ({ id }) => {
    
    try {
      await api.delete(`projetos/${id}`);
      loadTasks();
    } catch (err) {
      console.warn("erro ao deletar projeto")
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

  //Navegação para as tarefas de projetos
  const navigation = useNavigation();

  const handleProject = () => {
    navigation.reset({
      routes:[{name: 'AFazer'}]
  });
  }

  const oi = tasks.filter(p => p.usuarioId == user.id)

  return (
    <Container> 
      <FormEnviar>
        <Input
          placeholder="Incluir projeto..."
          onChangeText={(letras) => { setNewTask(letras) }}
          value={newTask}
        />
        <Button onPress={handleAddTasks}>
          <TextButton>Criar</TextButton>
        </Button>
      </FormEnviar>

      <Tasks showsVerticalScrollIndicator={false}>

        {oi.map(p => (
        <ButtonProjects onPress={handleProject}>
          <TaskContainer key={p.id} finalizado={p.concluido}>
           
              <TaskText>{p.descricao}</TaskText>
              
            <TaskActions>
            <BoxIcon>
              <Icon
                name="trash-alt"
                color="#ca0000"
                size={30}
                onPress={() => {handleRemoveTask(p)}}
              />

            </BoxIcon>
            <BoxIcon>
              <Icon
                name={p.concluido ? "check" : "clock"}
                color={p.concluido ? "#a4d43a" : "#000"}
                size={30}
                onPress={() => { handleTasks(p)}}
              />
            </BoxIcon>
             </TaskActions>
            
           </TaskContainer>
         </ButtonProjects>
        )
        )}
      </Tasks>
    </Container>
  )
}

export default Projetos;