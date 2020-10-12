import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../src/screens/SignIn';
import SignUp from '../src/screens/SignUp';
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

      <Auth.Screen name="Splash" component={Splash} />
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
    </Auth.Navigator>
  )
}

export default AuthRoutes;