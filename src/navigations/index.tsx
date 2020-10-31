import React from 'react';

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'


import Login from '../tela/Login';
import Home from '../tela/Home';
import Register  from '../tela/register';
import ListHelp  from '../tela/ListHelp';

import DrawerNavigation from '../navigations/drawerNavigation';

const Stack = createStackNavigator();

export default function Navgation() {
    return (
        < NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={DrawerNavigation} name="Home" />

            <Stack.Screen component={ListHelp} name="ListHelp" />
            <Stack.Screen component={Login} name="Login" />

            
            <Stack.Screen component={Register} name="Register" />
        </Stack.Navigator>
        </NavigationContainer>
        
    )
}