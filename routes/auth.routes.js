import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../src/screens/SignIn';

const Auth = createStackNavigator();

const AuthRoutes = () => {
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