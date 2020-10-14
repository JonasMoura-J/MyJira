import React, {useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Tarefas from '../src/screens/Tarefas';
import Projetos from '../src/screens/Projetos';
import AFazer from '../src/screens/Projetos/AFazer';
import Deslogando from '../src/screens/Deslogando';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const AppRoutes = () => {

  return (

        <Tab.Navigator
        initialRouteName="Tarefas"
        tabBarOptions={
            {
            activeTintColor: '#a4d43a',
            inactiveTintColor: '#ccc'
            }
        }>
       
        <Tab.Screen
            name="Projetos"
            component={Projetos}
            options={
                {
                  tabBarIcon: ({ color }) => (
                    <Icon
                      name="project-diagram"
                      color={color}
                      size={30} />
                  )
                }
              } />
              <Tab.Screen
                name="AFazer"
                component={AFazer}
                options={{
                tabBarButton: () => null
                //tabBarVisible: false, // if you don't want to see the tab bar
                }}
            />

            <Tab.Screen
            name="Tarefas"
            component={Tarefas}
            options={
            {
                tabBarIcon: ({ color }) => (
                <Icon
                    name="tasks"
                    color={color}
                    size={30} />
                )
            }
            } />
            
        
        <Tab.Screen
        name="Sair"
        component={Deslogando}
        options={
            {
                tabBarIcon: ({ color }) => (
                <Icon
                    name="door-open"
                    color={color}
                    size={30} />
                )
            }
            } />
        
           
        </Tab.Navigator>


  )
}

export default AppRoutes;