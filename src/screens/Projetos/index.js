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
  ProgressContainer,
  ButtonHidden,
  ButtonProjects
} from './styles'
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';
import { useIsFocused } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import ProgressCircle from 'react-native-progress-circle';

import { UsuarioContext } from '../../../contexts/user';

const Projetos = () => {

    const {user} = useContext(UsuarioContext);
    const projetos = user.projetos

    const [percentual, setPercentual] = useState(0);

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    const loadTasks = async () => {
      try {
        const response = await api.get("usuarios");

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
      concluido: false
    }

    try {
      await api.post("usuario", params);
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

        {user.projetos.map(p => (
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