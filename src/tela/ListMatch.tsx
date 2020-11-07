import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Platform, Image } from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import {Button, Input} from 'react-native-elements';
import Toolbar from '../components/toolbar';

export default function Home() {
    const nav = useNavigation();
    const [image, setImage] = useState(null);

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
            <Text style={styles.texto}>Match's</Text>

            <FlatList 
                data={ListFeed}
                keyExtractor={feed => feed.id}
                showsVerticalScrollIndicator={false}
                renderItem={({item: feed}) => (
                    <View style={styles.feedContainer}>
                        <Text style={styles.title}>{feed.title}</Text>
                        <Text style={styles.text}>{feed.text}</Text>

                        <View>
        
                        </View>
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