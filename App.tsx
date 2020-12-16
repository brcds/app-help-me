import React from 'react';
import firebase from 'firebase';
import firebaseConfig from './src/configuracao/firebaseConfig';

import Navegation from './src/navigations';

firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <Navegation />

  );
}

