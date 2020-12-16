import React from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from 'firebase';
import 'firebase/firestore';

import { useNavigation } from '@react-navigation/native';

import { Input, Button } from 'react-native-elements';

interface Usuario {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
}

export default function Register() {
  const nav = useNavigation();
  const fireStore = firebase.firestore();

  const criarUsuario = async (dados: Usuario) => {
    await firebase
        .auth()
        .createUserWithEmailAndPassword(dados.email, dados.senha)
        .then(async (usuario) => {
          firebase.auth().signOut();

          await fireStore.collection('usuarios').doc(usuario.user?.uid).set({
            nome: dados.nome,
            telefone: dados.telefone,
          });

          nav.navigate('Login');
        })
        .catch(err => {
          console.log(err)
          ToastAndroid.show("Erro ao criar conta, favor tentar novamente.", 2000);
        });
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container2}>
      <Text style={styles.titulo}>Registro!</Text>

      <Formik
        initialValues={{ nome: '', email: '', telefone: '', senha: '', confirmarSenha: '' }}
        onSubmit={values => criarUsuario(values)}
        validationSchema={Yup.object().shape({
          email: Yup.string().required('Informe o email').email('E-mail não válido'),
          nome: Yup.string().required('Informe o nome').min(4, 'O nome precisa ter 4 caracteres'),
          senha: Yup.string().required('Informe a senha').min(6, 'A senha precisa ter 6 caracteres'),
          telefone: Yup.string().required('Informe o telefone').min(9, 'O telefone precisa ter 9 dígitos'),
          confirmarSenha: Yup.string().required('Confirme a senha').oneOf([Yup.ref('senha')], 'As senhas devem ser iguais'),
        })}
      >
        {({ handleChange, handleSubmit, errors, handleBlur, touched, values }) => (
          <View style={styles.caixaForm}>
            <Input
              leftIcon={{ type: 'font-awesome', name: 'user', size: 20, color: 'white' }}
              placeholder="Digite seu nome"
              value={values.nome}
              inputStyle={{ marginLeft: 10, color: 'white' }}
              onChangeText={handleChange("nome")}
              onBlur={handleBlur("nome")}
            />
            {touched.nome && <Text style={{ color: "white", fontSize: 20, textAlign: 'right' }}>{errors.nome}</Text>}

            <Input
              leftIcon={{ type: 'font-awesome', name: 'phone', size: 25, color: 'white' }}
              placeholder="Digite seu telefone"
              keyboardType="number-pad"
              inputStyle={{ marginLeft: 10, color: 'white' }}
              value={values.telefone}
              onChangeText={handleChange("telefone")}
              onBlur={handleBlur("telefone")}
            />
            {touched.telefone && <Text style={{ color: "white", fontSize: 20, textAlign: 'right' }}>{errors.telefone}</Text>}

            <Input
              leftIcon={{ type: 'font-awesome', name: 'envelope', size: 20, color: 'white' }}
              placeholder="Digite seu email"
              value={values.email}
              inputStyle={{ marginLeft: 10, color: 'white' }}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            {touched.email && <Text style={{ color: "white", fontSize: 20, textAlign: 'right' }}>{errors.email}</Text>}

            <Input
              leftIcon={{ type: 'font-awesome', name: 'unlock-alt', size: 25, color: 'white' }}
              placeholder="Digite sua senha"
              value={values.senha}
              inputStyle={{ marginLeft: 10, color: 'white' }}
              secureTextEntry={true}
              onChangeText={handleChange("senha")}
              onBlur={handleBlur("senha")}
            /> 
            {touched.senha && <Text style={{ color: "white", fontSize: 20, textAlign: 'right' }}>{errors.senha}</Text>} 

            <Input
              leftIcon={{ type: 'font-awesome', name: 'unlock-alt', size: 25, color: 'white' }}
              placeholder="Confirme sua senha"
              value={values.confirmarSenha}
              inputStyle={{ marginLeft: 10, color: 'white' }}
              secureTextEntry={true}
              onChangeText={handleChange("confirmarSenha")}
              onBlur={handleBlur("confirmarSenha")}
            /> 
            {touched.confirmarSenha && <Text style={{ color: "white", fontSize: 20, textAlign: 'right' }}>{errors.confirmarSenha}</Text>} 
            
            <Button
              containerStyle={styles.butao}
              title="Registrar"
              onPress={() => handleSubmit()}
            />
           </View>
        )}
        </Formik>
      
        <Button             
          containerStyle={styles.butao}
          title="Voltar para o login"
          type="solid"
          onPress={() => nav.goBack()}
        />
      </KeyboardAvoidingView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: '100%',
  },
  titulo: {
    color: 'yellow',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 55
  },
  caixaForm: {
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
  },
  butao: {
    marginTop: 25,
    width: 150,
    alignSelf: 'center'
  },
  caixaButao: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  }
});
