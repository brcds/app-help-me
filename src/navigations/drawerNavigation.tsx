import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../tela/Home';
import ListHelp from '../tela/ListHelp';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
    <Drawer.Navigator 
        initialRouteName="Home" 
        drawerStyle={{backgroundColor: 'white'}} 
        
    >
        <Drawer.Screen 
            name="Home"
            component={Home}
        />
        <Drawer.Screen 
            name="ListHelp"
            component={ListHelp}
        />
        
    </Drawer.Navigator>
    )
    
    
}

export default DrawerNavigation;