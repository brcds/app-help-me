import React from 'react';
import {View, Text, StyleSheet, } from 'react-native';
import {AdMobBanner} from 'expo-ads-admob';

import {DrawerActions, useNavigation} from '@react-navigation/native';

import {Button, Input} from 'react-native-elements';

import Toolbar from '../components/toolbar';

export default function Home() {
    const nav = useNavigation();

    return (
        <>
        <Toolbar title="Bem vindo" menu/>
        <View style={styles.container}>

            <Button
                containerStyle={styles.butao}
                title="Pedir ajuda (publicar)"
                onPress={() => nav.navigate('Postagem')}
            />

            <Button
                containerStyle={styles.butao}
                title="Lista de publicações"
                onPress={() => nav.navigate('Feed de ajuda')}
            />
        </View>

        <AdMobBanner bannerSize="fullBanner" adUnitID="ca-app-pub-3940256099942544/6300978111" />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
    },
    texto: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    butao: {
      marginTop: 25,
      width: 150,
      alignSelf: 'center'
    },
  });