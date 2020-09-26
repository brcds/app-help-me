import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Input, Button } from 'react-native-elements';

export default function Register() {
  const nav = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro!</Text>

      <Input
        leftIcon={{ type: 'font-awesome', name: 'user', size: 20 }}
        placeholder="Digite seu nome"
        inputStyle={{ marginLeft: 10, color: 'white' }}
      />

      <Input
        leftIcon={{ type: 'font-awesome', name: 'envelope', size: 25 }}
        placeholder="Digite seu email"
        inputStyle={{ marginLeft: 10, color: 'white' }}
        secureTextEntry={true}
      />

      <Input
        leftIcon={{ type: 'font-awesome', name: 'phone', size: 25 }}
        placeholder="Digite seu telefone"
        inputStyle={{ marginLeft: 10, color: 'white' }}
        secureTextEntry={true}
      />

      <View style={styles.caixaButao}>

        <Button
          style={styles.butao}
          title="registrar"
          type="solid"
          onPress={() => nav.navigate('Login')}
        />

        <Button             
          style={styles.butao}
          title="login"
          type="solid"
          onPress={() => nav.navigate('Login')}
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
  },
  caixaButao: {
    display: 'flex',
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between'
  }
});
