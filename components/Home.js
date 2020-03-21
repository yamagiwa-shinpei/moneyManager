/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  Text,
  FlatList,
} from 'react-native';

import Amplify from 'aws-amplify';
import aws_exports from '../aws-exports';
import {Subtitle, TouchableOpacity} from '@shoutem/ui';
import {Button, Item, Card, Input, CardItem, Body} from 'native-base';
import Modal from 'react-native-modal';
import {listCards, getCard, listPaymentss} from '../src/graphql/queries';
import {updateCard, createPayments, deleteCard} from '../src/graphql/mutations';
import {
  onCreateCard,
  onCreatePayments,
  onUpdateCard,
} from '../src/graphql/subscriptions';
import {API, graphqlOperation} from 'aws-amplify';
import UserContainer from './UserContainer';
import AddCard from './AddCard';
import RNPickerSelect from 'react-native-picker-select';

Amplify.configure(aws_exports);

function Home() {
  const [cardName, setCardName] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [payment, setPayment] = useState();
  const [totalBalance, setTotalBalance] = useState();
  const [totalPayment, setTotalPayment] = useState();
  const [genre, setGrenre] = useState();
  const [card, setCard] = useState();

  const toggleModal = item => {
    setCard(item);
    setIsModalVisible(!isModalVisible);
  };

  const inputPayment = async (paymentsCard, pay, genre) => {
    setIsModalVisible(!isModalVisible);
    const paymentsCardId = paymentsCard.id;
    var input = {genre, pay, paymentsCardId};
    await API.graphql(graphqlOperation(createPayments, {input}));
    const id = paymentsCardId;
    const card = await API.graphql(graphqlOperation(getCard, {id}));
    console.log(card.data.getCard.balance);
    const balance = card.data.getCard.balance - pay;
    var input = {id, balance};

    const newBalancd = await API.graphql(graphqlOperation(updateCard, {input}));
    console.log(newBalancd);
  };
  var dt = new Date();
  var y = dt.getFullYear();
  var m = ('00' + (dt.getMonth() + 1)).slice(-2);
  var date = y + '-' + m;

  const TotalPayment = async () => {
    const limit = 1000;
    const result = await API.graphql(graphqlOperation(listPaymentss, {limit}));
    var payment = 0;
    for (var i = 0; i < result.data.listPaymentss.items.length; i++) {
      var paymentday = result.data.listPaymentss.items[i].createdAt;
      if (paymentday.substr(0, 7) === date) {
        var payment = payment + result.data.listPaymentss.items[i].pay;
      }
    }
    setTotalPayment(payment);
  };
  const TotalBalance = async () => {
    const result = await API.graphql(graphqlOperation(listCards));
    setCardName(result.data.listCards.items);
    var balance = 0;
    for (var i = 0; i < result.data.listCards.items.length; i++) {
      var balance = balance + result.data.listCards.items[i].balance;
    }
    setTotalBalance(balance);
    TotalPayment();
  };
  useEffect(() => {
    TotalBalance();
    API.graphql(graphqlOperation(onCreateCard)).subscribe({
      next: cardData => {
        TotalPayment();
        TotalBalance();
        console.log(cardData);
      },
    });
    API.graphql(graphqlOperation(onCreatePayments)).subscribe({
      next: paymentsData => {
        TotalPayment();
        TotalBalance();
        console.log(paymentsData);
      },
    });
    API.graphql(graphqlOperation(onUpdateCard)).subscribe({
      next: paymentsData => {
        TotalPayment();
        TotalBalance();
      },
    });
  }, []);

  const deleteItem = async id => {
    const input = {id};
    console.log(input);
    await API.graphql(graphqlOperation(deleteCard, {input}));
  };

  const deleteAlert = id => {
    Alert.alert(
      'カードを削除しますか？',
      'リストから消えます',
      [
        {
          text: 'Cancel',
        },
        {text: 'Delete', onPress: () => deleteItem(id)},
      ],
      {cancelable: false},
    );
  };
  const PickerSelect = () => {
    return (
      <View style={styles.modalItem}>
        <Item rounded style={styles.modalPicker}>
          <RNPickerSelect
            style={styles.pickerSelect}
            onValueChange={value => setGrenre(value)}
            items={[
              {label: '食費', value: '食費'},
              {label: '交通費', value: '交通費'},
              {label: '交際費', value: '交際費'},
              {label: '趣味', value: '趣味'},
              {label: '生活費', value: '生活費'},
            ]}
          />
        </Item>
      </View>
    );
  };

  return (
    <ScrollView>
      <UserContainer totalBalance={totalBalance} totalPayment={totalPayment} />
      <FlatList
        numColumns={2}
        style={{flex: 1}}
        data={cardName}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{alignItems: 'center', width: '50%'}}
              onPress={() => toggleModal(item)}>
              <Card style={{width: '90%'}}>
                <CardItem header>
                  <Text style={{fontSize: 16}}>{item.name}</Text>
                  <Button
                    block
                    danger
                    style={styles.deleteButton}
                    onPress={() => deleteAlert(item.id)}>
                    <Text style={{fontSize: 14}}>削除</Text>
                  </Button>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text style={{fontSize: 23}}>{item.balance}円</Text>
                  </Body>
                </CardItem>
              </Card>
              <Modal isVisible={isModalVisible}>
                <TouchableOpacity onPress={toggleModal}>
                  <View style={styles.modal}>
                    <Card style={styles.card}>
                      <View style={styles.modalItem}>
                        <Item rounded style={{width: 150}}>
                          <Input
                            placeholder="金額入力"
                            style={{width: 150}}
                            keyboardType="numeric"
                            onChangeText={value => setPayment(value)}
                          />
                        </Item>
                      </View>
                      <View style={styles.modalItem}>
                        <Item rounded style={styles.modalPicker}>
                          <RNPickerSelect
                            style={{
                              fontSize: 16,
                              paddingVertical: 12,
                              paddingHorizontal: 10,
                              borderWidth: 1,
                              borderColor: 'gray',
                              borderRadius: 4,
                              color: 'black',
                              placeholder: {
                                padding: 'auto',
                                height: 20,
                                fontSize: 20,
                              },
                            }}
                            onValueChange={value => setGrenre(value)}
                            items={[
                              {label: '食費', value: '食費'},
                              {label: '交通費', value: '交通費'},
                              {label: '交際費', value: '交際費'},
                              {label: '趣味', value: '趣味'},
                              {label: '生活費', value: '生活費'},
                            ]}
                          />
                        </Item>
                      </View>
                      <View styleName="content" style={{alignItems: 'center'}}>
                        <Subtitle></Subtitle>
                        <Button
                          onPress={() => inputPayment(card, payment, genre)}
                          style={styles.inputButton}>
                          <Text style={{color: 'white', marginLeft: 20}}>
                            OK!
                          </Text>
                        </Button>
                      </View>
                    </Card>
                  </View>
                </TouchableOpacity>
              </Modal>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginLeft: '60%',
        }}>
        <Text style={{fontSize: 15}}>総資産</Text>
        <Text
          style={{
            fontSize: 20,
            marginLeft: 15,
          }}>
          {totalBalance}
        </Text>
      </View>
      <AddCard />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  cardFont: {
    fontSize: 40,
    lineHeight: 100,
    width: 250,
    height: 100,
    position: 'absolute',
    top: 50,
    left: 120,
    color: 'black',
    textAlign: 'center',
  },
  card: {
    width: 230,
    height: 150,
    alignItems: 'center',
    borderRadius: 10,
  },
  modal: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalItem: {
    flexDirection: 'row',
    marginTop: 10,
  },
  modalPicker: {
    width: 150,
    height: 30,
    justifyContent: 'center',
  },
  pickerSelect: {
    width: 150,
    height: 20,
    fontSize: 20,
    flex: 1,
  },
  inputButton: {
    width: 60,
    height: 30,
    alignItems: 'center',
  },
  deleteButton: {
    width: 40,
    height: 25,
    marginLeft: '10%',
  },
});
export default Home;
