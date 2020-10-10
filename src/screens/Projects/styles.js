import styled from 'styled-components/native';

export const Container = styled.View`
  background-color:#fff;
  flex:1;
  /* justify-content:center; */
  padding:0 20px;
`;


export const TaskContainer = styled.View`
  flex-direction:row;
  justify-content:space-between;
  background-color: ${props => props.finalizado ? "#f9f9f9" : "#e6e6e6"};
  padding:15px 20px;
  margin-top:10px;
  border-radius:5px;
  flex:1;
`;

export const Tasks = styled.ScrollView`

`;

export const Task = styled.View`
  flex:1;
`;

export const TaskText = styled.Text`
  font-size:20px;
`;

export const TaskActions = styled.View`
  flex-direction:row;
`;

export const FormEnviar = styled.View`
  flex-direction:row;
`;

export const Input = styled.TextInput`
  border:1px solid #333;
  height:60px;
  flex:1;
  border-radius:5px;
  padding:0 20px;
`;

export const Button = styled.TouchableOpacity`
  width:100px;
  background-color:#04d361;
  height:60px;
  border-radius:5px;
  justify-content:center;
  align-items:center;
  margin-left:10px;

`;

export const TextButton = styled.Text`
  font-size:20px;
`;