import React from 'react';
import {View, Text, StyleSheet, } from 'react-native';

import {DrawerActions, useNavigation} from '@react-navigation/native';

import {Button, Input} from 'react-native-elements';

import Toolbar from '../components/toolbar';

export default function Home() {
    const nav = useNavigation();

    return (
        <>
        <Toolbar title="Welcome" menu/>
        <View style={styles.container}>
            <Text style={styles.texto}>Bem-vindo</Text>

            <Button 
                title="Solicitar ajuda"
                type="solid"
                style={{marginTop: 40 }}
                buttonStyle={{backgroundColor:"#1E90FF"}}
                onPress={() => nav.navigate('ListHelp')}
            />
            <Button 
                title="Verficar match's"
                type="solid"
                style={{marginTop: 40}}
                buttonStyle={{backgroundColor:"#1E90FF"}}
                onPress={() => nav.navigate('ListMatch')}
            />
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
      padding: 50
    },
    texto: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15
    }
  });