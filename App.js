/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  StatusBar,
} from 'react-native';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import {
  Image,
  Card,
  Button,
  Icon,
  Subtitle,
  Caption,
  Tile,
  Title,
  ImageBackground,
  TouchableOpacity,
} from '@shoutem/ui';
import {Input} from '@ui-kitten/components';
import Modal from 'react-native-modal';
import {listMoneys} from './src/graphql/queries';
import {Navigation} from 'react-native-navigation';
import {withAuthenticator} from 'aws-amplify-react-native';
import {API, graphqlOperation} from 'aws-amplify';
import Home from './components/Home';
import {ApplicationProvider} from '@ui-kitten/components';
import {mapping, light as lightTheme} from '@eva-design/eva';
Amplify.configure(aws_exports);

function App() {
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <Home />
    </ApplicationProvider>
  );
}

export default withAuthenticator(App);
