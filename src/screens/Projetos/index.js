import React, { useState, useEffect, useContext } from 'react';

import {
  Container,
  ProjectContainer,
  ProjectActions,
  Input,
  Button,
  TextButton,
  FormEnviar,
  Projects,
  ProjectText,
  BoxIcon,
  ButtonProjects,
  Logo,
  TextLogo
} from './styles'
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';
import { Alert, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import bg from '../../assets/fundo.jpg'
import logo from '../../assets/logo2.png'

import { UsuarioContext } from '../../../contexts/user';
import { ProjetoIdContext } from '../../../contexts/projeto';
import Item from '../../components/Item';
import ItemInput from '../../components/ItemInput';

const Projetos = () => {

    const {user} = useContext(UsuarioContext);

    const {SelecionarProjeto} = useContext(ProjetoIdContext);

    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState("");

    const loadProject = async () => {
      try {
        const response = await api.get("projetos");
        setProjects(response.data)

      } catch (err) {
        Alert.alert("","Falha ao recuperar os projetos.",[{text:'ok'}])
      }
    }

  const handleAddProject = async () => {
    if (newProject == "") {
      Alert.alert("","Você deve preencher um projeto",[{text:'ok'}])
      return
    }

    const params = {
      descricao: newProject,
      usuarioId: user.id,
      concluido: false
    }

    try {
      await api.post("projetos", params);
      setNewProject("");
      loadProject();
    } catch (err) {
      Alert.alert("","Erro ao salvar o projeto",[{text:'ok'}])
    }
  
  }

   const handleProject = async (project) => {
    
  //   const params = {
  //     ...project,
  //     concluido: !project.concluido
  //   }
  

  //   try {
      
  //     await api.put(`projetos/${project.id}`, params);
  //     loadProject();
  //   } catch (err) {

  //   }
   }

  const handleRemoveProject = async ({ id }) => {
    
    try {
      await api.delete(`projetos/${id}?_embed=afazeres`);
      loadProject();
    } catch (err) {
      Alert.alert("","Erro ao deletar o projeto",[{text:'ok'}])
    }

  }

  useEffect(() => {
    loadProject();
  }, [])

  const navigation = useNavigation();

  const handleIdProject = (id) => {
    SelecionarProjeto(id)
    navigation.reset({
      routes:[{name: 'AFazer'}]
  });
  }

  const projetos = projects.filter(p => p.usuarioId == user.id)
  
  return (
  
    <Container>
      <ImageBackground source={bg} style ={{height: 150, width: 400}}>
      <Logo>
        <Image source={logo} style ={{height: 45, width: 45, margin: 8}}/>
        <TextLogo>MyJira</TextLogo>
      </Logo>

      <ItemInput input={newProject} setInput={setNewProject} handleAdd={handleAddProject} type= 'projetos'/>

      </ImageBackground>

      <Projects showsVerticalScrollIndicator={false}>

        {projetos.map(p => (
        <ButtonProjects key={p.id} onPress={()=> handleIdProject(p.id)}>

          <Item label={p} handle={handleProject} handleRemove={handleRemoveProject}/>

         </ButtonProjects>
        )
        )}
      </Projects>
    </Container> 
  )
}

export default Projetos;