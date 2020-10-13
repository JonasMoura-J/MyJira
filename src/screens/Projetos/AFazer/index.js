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
  ProgressContainer
} from './styles'

import api from '../../../../services/api';
import { useIsFocused } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import ProgressCircle from 'react-native-progress-circle';

// import { UsuarioContext } from '../../contexts/user';
import { UsuarioContext } from '../../../../contexts/user';

const AFazer = () => {
  const {user} = useContext(UsuarioContext);

  const [percentual, setPercentual] = useState(0);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const percentualAFazerRealizados = async () => {
    const resultado = await api.get("afazer");
    const AFazer = resultado.data.afazer
    const AFazer_realizadas = AFazer.filter(tarefa => tarefa.concluido)

    const calculo_percentual = (AFazer_realizadas.length / AFazer.length) * 100

    setPercentual(calculo_percentual)
  }
  
  const loadTasks = async () => {

    try {
      const response = await api.get("projetos"); 
      const AFazer = response.data
      const {oi, ...oi2} = response.data
      console.warn(oi)
      setTasks(AFazer)
      
    } catch (err) {
      console.warn("Falha ao recuperar as AFazer.")
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
      concluido: false,
      usuarioId: user.id

    }

    try {
      await api.post("afazer", params);
      setNewTask("");
      loadTasks();
      percentualAFazerRealizados();
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
      await api.put(`afazer/${task.id}`, params);
      loadTasks();
      percentualAFazerRealizados();
    } catch (err) {

    }
  }

  const handleRemoveTask = async ({ id }) => {

    try {
      await api.delete(`afazer/${id}`);
      loadTasks();
      percentualAFazerRealizados();
    } catch (err) {
      console.warn("erro ao deletar tarefa")
    }
    // console.warn(`delete ${id}`)
  }

  //Apenas será executado uma única vez!
  useEffect(() => {
    loadTasks();
    percentualAFazerRealizados();
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


        {tasks.map(a =>
          
          <TaskText>{a.descricao}</TaskText>
          // <TaskContainer>
           
          //     <TaskText>{p.afazer}</TaskText>
              
          //   <TaskActions>
          //   {/* <BoxIcon>
          //     <Icon
          //       name="trash-alt"
          //       color="#ca0000"
          //       size={30}
          //       onPress={() => { handleRemoveTask(task) }}
          //     />
          //   </BoxIcon>
          //   <BoxIcon>
          //     <Icon
          //       name={task.concluido ? "check" : "clock"}
          //       color={task.concluido ? "#a4d43a" : "#000"}
          //       size={30}
          //       onPress={() => { handleTasks(task)}}
          //     /> 
          //   </BoxIcon> */}
          //    </TaskActions>
            
          //  </TaskContainer>   
        )}
      </Tasks>
    </Container>

        
  )

}

export default AFazer;