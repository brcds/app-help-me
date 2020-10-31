import React from 'react';
import {View, Text, StyleSheet, FlatList } from 'react-native';

import {DrawerActions, useNavigation} from '@react-navigation/native';

import {Button, Input} from 'react-native-elements';

import Toolbar from '../components/toolbar';
import { forScaleFromCenterAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';

export default function Home() {
    const nav = useNavigation();

    const ListFeed = [
        {
            id: '1',
            title: 'Alcolico Anônimo',
            text: 'Eu preciso de ajuda pois sou um viciado em cerveja e bebidas quentes.'
        },
        {
            id: '2',
            title: 'Alcolico Anônimo',
            text: 'Eu preciso de ajuda pois sou um viciado em cerveja e bebidas quentes.'
        },
        {
            id: '3',
            title: 'Alcolico Anônimo',
            text: 'Eu preciso de ajuda pois sou um viciado em cerveja e bebidas quentes.'
        }
    ]

    return (
        <>
        <Toolbar title="Welcome" menu/>
        <View style={styles.container}>
            <Text style={styles.texto}>Feed de Ajuda</Text>

            <Input 
                placeholder="Digite seu texto"
            />
            
            <Button 
                title="Postar"
                type="solid"
                style={{marginTop: 40, marginBottom: 20}}
                buttonStyle={{backgroundColor:"#1E90FF"}}
            />

            <FlatList 
                data={ListFeed}
                keyExtractor={feed => feed.id}
                showsVerticalScrollIndicator={false}
                renderItem={({item: feed}) => (
                    <View style={styles.feedContainer}>
                        <Text style={styles.title}>{feed.title}</Text>
                        <Text style={styles.text}>{feed.text}</Text>
                    </View>
                )}
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
    },
    title: {
        fontSize: 18,
        color: 'white',
        marginBottom: 15
    },
    feedContainer: {
        width: 250,
        height: 150,
        display: 'flex',
        backgroundColor: 'blue',
        marginTop: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
        color: 'white',
        justifyContent: 'center',
        marginLeft: 15
    }
  });