import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Platform, Image, ToastAndroid } from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from 'firebase';
import 'firebase/firestore';

import {Input, Button} from 'react-native-elements';
import Toolbar from '../components/toolbar';

interface Publicacao {
    post: string;
}

interface Usuario {
    nome: any;
    email: any;
    telefone: any;
}

export default function Postagem() {
    const nav = useNavigation();
    const fireStore = firebase.firestore();
    const [usuario, setUsuario] = useState<Usuario>({} as Usuario);

    useEffect(() => {
        async function carregarUsuario() {
           await fireStore.collection('usuarios').doc(firebase.auth().currentUser?.uid).get().then(resultado => {
                if(resultado.exists){
                    const usuario = resultado.data();
                    const usuarioCarregado = {
                        nome: usuario?.nome,
                        telefone: usuario?.telefone,
                        email: firebase.auth().currentUser?.email,
                    }
                    setUsuario(usuarioCarregado);
                }
            })
        }
        carregarUsuario();        
    }, [fireStore])

    const publicar = (dados: Publicacao) => {
        fireStore
          .collection('publicacoes')
          .add({
              publicacao: dados.post,
              autor: usuario.nome,
              email: usuario.email,
              telefone: usuario.telefone
          }).then(() => {
              ToastAndroid.show('Publicação gravada com sucesso!', 2000);
              nav.reset({
                index: 0,
                routes: [{ name: 'Feed de ajuda' }],
              });
          })
          .catch(err => {
            ToastAndroid.show('Erro ao gravar publicação! Favor verificar e tentar novamente.', 2500);
          });
      }

    return (
        <>
        <Toolbar title="Nova publicação" menu/>
        <View style={styles.container}>
            <Text style={styles.titulo}>Nova publicação</Text>

            <Formik
                initialValues={{ post: ''}}
                onSubmit={values => publicar(values)}
                validationSchema={Yup.object().shape({
                post: Yup.string().required('Informe a descrição da publicação')
                })}
            >
        {({ handleChange, handleSubmit, errors, handleBlur, touched, values }) => (
          <View style={styles.caixaForm}>
            <Input 
                multiline
                numberOfLines={10}
                placeholder="O que esta passando ?"
                inputStyle={{color: 'white'}}
                value={values.post}
                onChangeText={handleChange("post")}
                onBlur={handleBlur("post")}
            />
            {touched.post && <Text style={{ color: "white", fontSize: 20, textAlign: 'right' }}>{errors.post}</Text>}

            <Button
              containerStyle={styles.botao}
              title="Publicar"
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </Formik>

        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'black',
      padding: 30
    },
    titulo: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15
    },
    botao: {
        marginTop: 25,
        width: 150,
        alignSelf: 'center'
      },
    caixaForm: {
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
    },
  });