import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../screens/Splash';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Tarefas from '../screens/Projects';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="Tarefas"
        screenOptions={{
            headerShown: false
        }}    
    >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Tarefas" component={Tarefas} />

    </Stack.Navigator>

);