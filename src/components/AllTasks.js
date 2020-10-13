// import React from 'react';

// import {
//   Container,
//   TaskContainer,
//   TaskActions,
//   Input,
//   Button,
//   TextButton,
//   FormEnviar,
//   Tasks,
//   TaskText,
//   BoxIcon,
//   Text
// } from '../screens/Projetos/styles'

// import Icon from 'react-native-vector-icons/FontAwesome5';

// const AllTasks = (props) => {

//     return (
//         <Container>
    
//       <FormEnviar>
//         <Input
//           placeholder="Incluir projeto..."
//           onChangeText={(letras) => { setNewTask(letras) }}
//           value={newTask}
//         />
//         <Button onPress={handleAddTasks}>
//           <TextButton>Criar</TextButton>
//         </Button>
//       </FormEnviar>

//       <Tasks showsVerticalScrollIndicator={false}>

//         {props.lista.map(p => (
//         <ButtonProjects onPress={()=> handleProject(p.id)}>
//           <TaskContainer key={p.id} finalizado={p.concluido}>
           
//               <TaskText>{p.descricao}</TaskText>
              
//             <TaskActions>
//             <BoxIcon>
//               <Icon
//                 name="trash-alt"
//                 color="#ca0000"
//                 size={30}
//                 onPress={() => {handleRemoveTask(p)}}
//               />

//             </BoxIcon>
//             <BoxIcon>
//               <Icon
//                 name={p.concluido ? "check" : "clock"}
//                 color={p.concluido ? "#a4d43a" : "#000"}
//                 size={30}
//                 onPress={() => { handleTasks(p)}}
//               />
//             </BoxIcon>
//              </TaskActions>
            
//            </TaskContainer>
//          </ButtonProjects>
//         )
//         )}
//       </Tasks>
//     </Container>
//     )

// }

// export default AllTasks;