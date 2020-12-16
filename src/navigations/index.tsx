import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Login from '../tela/Login';
import Register  from '../tela/register';

import DrawerNavigation from '../navigations/drawerNavigation';

const Stack = createStackNavigator();

export default function Navgation() {
    const [logado, setLogado] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(status => {
            if (status) {
                setLogado(true);
            } else setLogado(false);
          });
    }, [])

    return (
        < NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown: false}}>

        {logado ? (
            <Stack.Screen component={DrawerNavigation} name="Home" />
        ): (
            <>
            <Stack.Screen component={Login} name="Login" />
            <Stack.Screen component={Register} name="Register" />
            </>
        )}
            
        </Stack.Navigator>
        </NavigationContainer>
    )
}