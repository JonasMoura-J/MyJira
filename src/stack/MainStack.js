// import React, {useContext} from 'react';
// import { createStackNavigator } from '@react-navigation/stack';

// import Splash from '../screens/Splash';
// import SignIn from '../screens/SignIn';
// import SignUp from '../screens/SignUp';
// import Projetos from '../screens/Projetos';
// import Tarefas from '../screens/Tarefas';
// import AFazer from '../screens/Projetos/AFazer';
// import { UsuarioContext } from '../../contexts/user';

// const Stack = createStackNavigator();

// export default () => {
    
//     const { user } = useContext(UsuarioContext);

//     return(
//     <Stack.Navigator
//         initialRouteName="Splash"
//         screenOptions={{
//             headerShown: false
//         }}    
//     >
//             <Stack.Screen name="Splash" component={Splash} />
//             <Stack.Screen name="SignIn" component={SignIn} />
            

//             {
//                 user?
//                 <Stack.Screen name="Tarefas" component={Tarefas} />
//                 // <Stack.Screen name="Projetos" component={Projetos} />
//                 // <Stack.Screen name="AFazer" component={AFazer} />
//                 :
//                 <Stack.Screen name="SignUp" component={SignUp} />
//             }
        
//     </Stack.Navigator>

//     );
// }