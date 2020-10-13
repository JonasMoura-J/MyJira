import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #1c1c1c;
    flex: 1;
    justify-content: center;
    align-items: center;
`;


export const ProjectContainer = styled.View`
  flex-direction:row;
  justify-content:space-between;
  background-color: #e3e3e3;
  padding:15px 20px;
  margin-top:10px;
  border-radius:30px;
  flex:1;
`;

export const Projects = styled.ScrollView`
`;

export const Project = styled.View`
  flex:1;
`;

export const ProjectText = styled.Text`
  font-size:20px;
  width: 70%;
`;

export const ProjectActions = styled.View`
  flex-direction:row;
  
`;

export const FormEnviar = styled.View`
  flex-direction:row;
  margin-top:10px;
`;

export const Input = styled.TextInput`
  border:1px solid #333;
  height:60px;
  flex:1;
  border-radius: 30px;
  padding:0 20px;
  background-color: #e3e3e3;
  margin-left: 5px;
`;

export const Button = styled.TouchableOpacity`
    height: 60px;
    width: 100px;
    margin: 0 5px;
    background-color: #a4d43a;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;

export const TextButton = styled.Text`
  font-size:20px;
`;
export const BoxIcon = styled.TouchableOpacity`
  margin-left:10px;
`;
export const ProgressContainer = styled.View`
  margin: 30px 0 2px 0;
`;
export const ButtonProjects = styled.TouchableOpacity`
  width:100%;
  height:70px;
`;