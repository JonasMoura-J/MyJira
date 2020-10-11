import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../src/screens/SignIn';
import Splash from '../src/screens/Splash';

const Auth = createStackNavigator();

const AuthRoutes = () => {
console.warn('cheguei')
  return (
    <Auth.Navigator
      screenOptions={
        {
          headerShown: false
        }
      }
    >
      <Auth.Screen name="SignIn" component={SignIn} />
    </Auth.Navigator>
  )
}

export default AuthRoutes;