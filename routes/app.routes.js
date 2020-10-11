import React, {useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Tarefas from '../src/screens/Tarefas';
import Projetos from '../src/screens/Projetos';
import AFazer from '../src/screens/Projetos/AFazer';
import Deslogando from '../src/screens/Deslogando';

const Tab = createBottomTabNavigator();

const AppRoutes = () => {

  return (
        <Tab.Navigator
        initialRouteName="Tarefas"
        tabBarOptions={
            {
            activeTintColor: 'tomato',
            inactiveTintColor: '#ccc'
            }
        }>
        <Tab.Screen
            name="Tarefas"
            component={Tarefas}
            />
        <Tab.Screen
            name="Projetos"
            component={Projetos}
            
        />
        <Tab.Screen
            name="Sair"
            component={Deslogando}
        />    
        </Tab.Navigator>

  )
}

export default AppRoutes;