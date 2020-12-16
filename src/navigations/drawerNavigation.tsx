import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import firebase from 'firebase';

import Home from '../tela/Home';
import ListHelp from '../tela/ListHelp';
import ListMatch from '../tela/ListMatch';
import Postagem from '../tela/Postagem';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {

    function CustomDrawerContent(props: any) {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Sair" onPress={() => firebase.auth().signOut()} />
          </DrawerContentScrollView>
        );
      }

    return (
    <Drawer.Navigator 
        initialRouteName="Home" 
        drawerStyle={{backgroundColor: 'white'}} 
        drawerContent={props => <CustomDrawerContent {...props} />}
    >
        <Drawer.Screen 
            name="Página principal"
            component={Home}
        />

        <Drawer.Screen 
            name="Feed de ajuda"
            component={ListHelp}
        />
        
        <Drawer.Screen 
            name="Publicações curtidas"
            component={ListMatch}
        />

        <Drawer.Screen 
            name="Postagem"
            component={Postagem}
        />
        
    </Drawer.Navigator>
    )
    
    
}

export default DrawerNavigation;