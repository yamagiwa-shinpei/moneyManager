/**
 * Sample React Native UserContainer
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
  Image,
  TouchableOpacity,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Modal from 'react-native-modal';
import {Button, Item, Card, Input} from 'native-base';
import {listTargetValues} from '../src/graphql/queries';
import {updateTargetValue, createTargetValue} from '../src/graphql/mutations';
import {API, graphqlOperation} from 'aws-amplify';
import {ProgressCircle} from 'react-native-svg-charts';

import {Icon, Subtitle, Caption, Tile, Title} from '@shoutem/ui';
import Amplify from 'aws-amplify';
import aws_exports from '../aws-exports';
import {Auth} from 'aws-amplify';

Amplify.configure(aws_exports);

function UserContainer(props) {
  const [userName, setUserName] = useState();
  const [isVisible, setIsVisible] = useState();
  const [targetValue, setTargetValue] = useState(null);

  const goToAddPage = () => {
    Navigation.push('AddCard');
  };
  useEffect(() => {
    getUserData();
    getTargetValue();
  }, []);
  const toggleModal = () => {
    setIsVisible(!isVisible);
  };
  const getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    setUserName(user.username);
  };
  const getTargetValue = async () => {
    const result = await API.graphql(graphqlOperation(listTargetValues));
    setTargetValue(result.data.listTargetValues.items[0].value);
  };

  const settingTargetValue = async value => {
    const result = await API.graphql(graphqlOperation(listTargetValues));
    setTargetValue(value);
    if (result.data.listTargetValues.items.length === 0) {
      var input = {value};
      await API.graphql(graphqlOperation(createTargetValue, {input}));
    } else {
      const id = result.data.listTargetValues.items[0].id;
      const value = Number(targetValue);
      var input = {id, value};
      await API.graphql(graphqlOperation(updateTargetValue, {input}));
      updateTargetValue();
    }
    getTargetValue();
  };

  const inputTargetValue = async targetValue => {
    setIsModalVisible(!isModalVisible);
    var input = {targetValue};
    await API.graphql(graphqlOperation(createTargetValue, {input}));
    const id = paymentsCardId;
    const card = await API.graphql(graphqlOperation(getCard, {id}));
    const balance = card.data.getCard.balance - pay;
    var input = {id, balance};
    const newBalancd = await API.graphql(graphqlOperation(updateCard, {input}));

    TotalBalance();
    getUserData();
  };
  const possibleUsagePer = props.totalPayment / targetValue;
  const possibleUsage = targetValue - props.totalPayment;

  return (
    <View style={styles.container}>
      <View style={styles.possibleUsage}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 15}}>今月の残り利用可能額</Text>
          <Text style={{flex: 1, fontSize: 30, marginLeft: 15}}>
            {possibleUsage}
          </Text>
        </View>
      </View>
      <View style={styles.paymentContainer}>
        <View style={styles.totalPayment}>
          <Text style={{fontSize: 15}}>合計支出</Text>
          <Text style={{flex: 1, fontSize: 25, marginLeft: 10}}>
            {props.totalPayment}
          </Text>
        </View>
        <View style={styles.targetValueContainer}>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={{fontSize: 15}}>今月の支出目標</Text>
            <Text style={styles.totalPaymentText}>{targetValue}</Text>
          </TouchableOpacity>
          <Modal isVisible={isVisible}>
            <TouchableOpacity onPress={toggleModal}>
              <View style={styles.modalContainer}>
                <Card style={styles.card}>
                  <View style={styles.inputPay}>
                    <Item rounded style={{width: 150}}>
                      <Input
                        placeholder="金額を入力して"
                        style={{width: 150}}
                        keyboardType="numeric"
                        onChangeText={value => setTargetValue(value)}
                      />
                    </Item>
                  </View>
                  <View styleName="content" style={{alignItems: 'center'}}>
                    <Subtitle></Subtitle>
                    <Button
                      onPress={() => settingTargetValue(targetValue)}
                      style={styles.inutButton}>
                      <Text style={{color: 'white', marginLeft: 20}}>OK!</Text>
                    </Button>
                  </View>
                </Card>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 120,
    width: '100%',
    flexDirection: 'column',
    marginTop: 40,
  },
  possibleUsage: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 50,
    marginBottom: 10,
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
  },
  totalPayment: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: 50,
  },
  totalPaymentText: {
    flex: 1,
    fontSize: 25,
    marginLeft: 10,
  },
  modalContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  card: {
    width: 230,
    height: 150,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'column',
    marginTop: 20,
  },
  inputPay: {
    flexDirection: 'row',
    marginTop: 20,
  },
  inutButton: {
    width: 60,
    height: 30,
    alignItems: 'center',
  },
  targetValueContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: 50,
  },
});
export default UserContainer;
