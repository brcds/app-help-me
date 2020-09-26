import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Button} from 'react-native-elements';

export default function Home() {
    const nav = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Bem-vindo</Text>

            <Button 
                title="Voltar"
                type="solid"
                onPress={() => nav.goBack()}
            />
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
    texto: {
        color: 'yellow',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15
    }
  });