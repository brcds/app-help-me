import React from 'react';
import { StyleSheet, View, Text, ToastAndroid } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';


import { Input, Button } from 'react-native-elements';

interface Usuario {
  email: string;
  senha: string;
}

export default function Login() {
  const nav = useNavigation();
  const fireStore = firebase.firestore();

  const logar = (dados: Usuario) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(dados.email, dados.senha)
      .then(() => {})
      .catch(err => {
        ToastAndroid.show('Usuário / Senha Incorreto(s)! Favor verificar e tentar novamente.', 2500);
      });
  }


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Help Me!</Text>

      <Formik
        initialValues={{ email: '', senha: ''}}
        onSubmit={values => logar(values)}
        validationSchema={Yup.object().shape({
          email: Yup.string().required('Informe o email').email('E-mail não válido'),
          senha: Yup.string().required('Informe a senha').min(6, 'A senha precisa ter 6 caracteres')
        })}
      >
        {({ handleChange, handleSubmit, errors, handleBlur, touched, values }) => (
          <View style={styles.caixaForm}>
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

            <Button
              containerStyle={styles.botao}
              title="Entrar"
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </Formik>

      <View style={styles.caixaButao}>

        <Button
          containerStyle={styles.botao}
          title="Registrar"
          type="solid"
          onPress={() => nav.navigate('Register')}
        />


      </View>

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
  titulo: {
    color: 'yellow',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 85
  },
  caixaForm: {
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
  },
  botao: {
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
