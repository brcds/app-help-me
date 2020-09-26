import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Input, Button } from 'react-native-elements';

export default function Login() {
  const nav = useNavigation();

  const logar = (dados: any) => {
    console.log(dados);
    if (dados.email == 'teste@teste.com' && dados.senha == '123456')
      nav.navigate('Home');
    else
      console.log('Email ou senha incorreta ');
  }


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Help Me!</Text>

      <Formik
        initialValues={{ email: '', senha: '' }}
        onSubmit={logar}
        validationSchema={Yup.object().shape({
          email: Yup.string().required('Informe o email').email('E-mail não válido'),
          senha: Yup.string().required('Informe a senha').min(6, 'A senha precisa ter 6 caracteres')
        })}
      >
        {({ handleChange, handleSubmit, errors, handleBlur, touched, values }) => (
          <View>
            <Input
              leftIcon={{ type: 'font-awesome', name: 'envelope', size: 20 }}
              placeholder="Digite seu email"
              value={values.email}
              inputStyle={{ marginLeft: 10, color: 'white' }}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            {touched.email && <Text style={{ color: "white", fontSize: 20, textAlign: 'right' }}>{errors.email}</Text>}

            <Input
              leftIcon={{ type: 'font-awesome', name: 'unlock-alt', size: 25 }}
              placeholder="Digite seu senha"
              value={values.senha}
              inputStyle={{ marginLeft: 10, color: 'white' }}
              secureTextEntry={true}
              onChangeText={handleChange("senha")}
              onBlur={handleBlur("senha")}
            />
            {touched.senha && <Text style={{ color: "white", fontSize: 20, textAlign: 'right' }}>{errors.senha}</Text>}

            <Button
              style={styles.butao}
              title="Entrar"
              type="solid"
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </Formik>

      <View style={styles.caixaButao}>

        <Button
          style={styles.butao}
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
    marginBottom: 15
  },
  butao: {
    marginTop: 15,
    width: 250,
    alignSelf: 'center'
  },
  caixaButao: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  }
});
