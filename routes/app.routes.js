import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Tarefas from '../src/screens/Tarefas';
import Projetos from '../src/screens/Projetos';


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

    </Tab.Navigator>
  )
}

export default AppRoutes;