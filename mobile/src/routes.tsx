import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import QRCode from './pages/QRCode';
import Checagem from './pages/Checagem';

const AppStack = createStackNavigator();

const Routes = () => {
  return(
    <NavigationContainer>
      <AppStack.Navigator 
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#f5f5f5'
          }
        }}
      >
        <AppStack.Screen name="Home" component={Home}/>
        <AppStack.Screen name="QRCode" component={QRCode}/>
        <AppStack.Screen name="Checagem" component={Checagem}/>
      </AppStack.Navigator>
    </NavigationContainer>
  )
};

export default Routes;