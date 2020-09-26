import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../tela/Login';
import Home from '../tela/Home';
import Register  from '../tela/register'

const Stack = createStackNavigator();

export default function Navgation() {
    return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen component={Login} name="Login" />
            <Stack.Screen component={Home} name="Home" />
            <Stack.Screen component={Register} name="Register" />
        </Stack.Navigator>
    </NavigationContainer>
    )
}