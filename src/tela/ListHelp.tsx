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

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    };
      const takeImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    };

    return (
        <>
        <Toolbar title="Welcome" menu/>
        <View style={styles.container}>
            <Text style={styles.texto}>Feed de Ajuda</Text>

            <Input 
                placeholder="Digite seu texto"
            />

        <Button title="Selecione uma imagem da galeria" onPress={pickImage} buttonStyle={{backgroundColor:"green"}} />
        <Button title="Tirar foto com a câmera" onPress={takeImage} buttonStyle={{backgroundColor:"green"}} />
            
            <Button 
                title="Postar"
                type="solid"
                style={{marginTop: 20, marginBottom: 5}}
                buttonStyle={{backgroundColor:"green"}}
            />

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