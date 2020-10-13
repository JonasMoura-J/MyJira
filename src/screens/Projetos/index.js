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
  ButtonProjects
} from './styles'
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { UsuarioContext } from '../../../contexts/user';
import { ProjetoIdContext } from '../../../contexts/projeto';

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
        console.warn("Falha ao recuperar os projetos.")
      }
    }

  const handleAddProject = async () => {
    
    if (newProject == "") {
      console.warn("Você deve preencher um projeto")
      return
    }
    const params = {
      descricao: newProject,
      usuarioId: user.id,
      concluido: false
    }

    try {
      console.warn(params)
      await api.post("projetos", params);
      setNewProject("");
      loadProject();
    } catch (err) {
      console.warn("Erro ao salvar o projeto")
    }

  }

  const handleProject = async (project) => {
    
    const params = {
      ...project,
      concluido: !project.concluido
    }
  

    try {
      
      await api.put(`projetos/${project.id}`, params);
      loadProject();
    } catch (err) {

    }
  }

  const handleRemoveProject = async ({ id }) => {
    
    try {
      await api.delete(`projetos/${id}`);
      loadProject();
    } catch (err) {
      console.warn("Erro ao deletar o projeto")
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
    
      <FormEnviar>
        <Input
          placeholder="Incluir projeto..."
          onChangeText={(letras) => { setNewProject(letras) }}
          value={newProject}
        />
        <Button onPress={handleAddProject}>
          <TextButton>Criar</TextButton>
        </Button>
      </FormEnviar>

      <Projects showsVerticalScrollIndicator={false}>

        {projetos.map(p => (
        <ButtonProjects key={p.id} onPress={()=> handleIdProject(p.id)}>
          <ProjectContainer finalizado={p.concluido}>
           
              <ProjectText>{p.descricao}</ProjectText>
              
            <ProjectActions>
            <BoxIcon>
              <Icon
                name="trash-alt"
                color="#ca0000"
                size={30}
                onPress={() => {handleRemoveProject(p)}}
              />

            </BoxIcon>
            <BoxIcon>
              <Icon
                name={p.concluido ? "check" : "clock"}
                color={p.concluido ? "#a4d43a" : "#000"}
                size={30}
                onPress={() => { handleProject(p)}}
              />
            </BoxIcon>
             </ProjectActions>
            
           </ProjectContainer>
         </ButtonProjects>
        )
        )}
      </Projects>
    </Container> 
  )
}

export default Projetos;