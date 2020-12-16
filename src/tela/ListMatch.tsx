import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firebase from 'firebase';
import 'firebase/firestore';

import {Button, Input} from 'react-native-elements';
import Toolbar from '../components/toolbar';

type Publicacoes = Array<{
    autor: string;
    email: string;
    publicacao: string;
    telefone: string;
    id: string;
}>;

export default function Home() {
    const nav = useNavigation();
    const fireStore = firebase.firestore();
    const [listaPublicacoes, setListaPublicacoes] = useState<Publicacoes>();

    useEffect(() => {
        async function carregarListaCurtidas() {
            const resultadoCurtidas: Array<string> = await fireStore.collection('usuarios').doc(firebase.auth().currentUser?.uid).get().then(resultado => {
                if (resultado.exists){
                    const curtidas = resultado.data()?.publicacoesCurtidas;
                    return curtidas;
                }
             })
             
             await fireStore.collection('publicacoes').get().then(resultado => {
                const publicacoes: Publicacoes = [];
                    resultado.forEach(result => {
                        resultadoCurtidas.map(publi => {
                            if(publi === result.id){
                                const resu = {
                                    autor: result.get('autor'),
                                    email: result.get('email'),
                                    publicacao: result.get('publicacao'),
                                    telefone: result.get('telefone'),
                                    id: result.id,
                                }
                                publicacoes.push(resu);
                            }
                        })
                    })
                    setListaPublicacoes(publicacoes);
                }).catch(err => {
                    console.log(err)
                })
        }
        carregarListaCurtidas();
    }, [fireStore, firebase])

    const descurtir = (id: string) => {
        fireStore
          .collection('usuarios')
          .doc(firebase.auth().currentUser?.uid)
          .update({
              publicacoesCurtidas: firebase.firestore.FieldValue.arrayRemove(id),
          })
          .then(() => {
              ToastAndroid.show('Você descurtiu a publicação', 2000);
          })
          .catch(err => {
            ToastAndroid.show('Erro você não curtiu essa publicação!.', 2500);
          });

        const novaLista = listaPublicacoes?.filter(publicacao => {
            if (publicacao.id !== id){
                return publicacao;
            }
        })

        setListaPublicacoes(novaLista);
    }

    return (
        <>
        <Toolbar title="Welcome" menu/>
        <View style={styles.container}>
            <Text style={styles.texto}>Publicações curtidas</Text>

            <FlatList 
                data={listaPublicacoes}
                keyExtractor={feed => feed.id}
                showsVerticalScrollIndicator={false}
                renderItem={({item: feed}) => (
                    <View style={styles.feedContainer}>
                        <Text style={styles.text}>{feed.publicacao}</Text>

                        <Text style={styles.text}>Autor: {feed.autor}</Text>
                        <Text style={styles.text}>Email: {feed.email}</Text>
                        <Text style={styles.text}>Telefone: {feed.telefone}</Text>

                        <Button
                            containerStyle={styles.botao}
                            title="Descurtir"
                            type="solid"
                            buttonStyle={{backgroundColor: 'green'}}
                            onPress={() => descurtir(feed.id)}
                        />
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
        textAlign: 'center',
        marginTop: 15
    },
    botao: {
        marginTop: 15,
        width: 90,
        alignSelf: 'center',
        marginBottom: 10
      },
  });