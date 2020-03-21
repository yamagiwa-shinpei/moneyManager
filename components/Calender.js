/**
 * Sample React Native Calender
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import {listMoneys, listPaymentss} from '../src/graphql/queries';
import {deletePayments} from '../src/graphql/mutations';

import {API, graphqlOperation} from 'aws-amplify';

function Calender() {
  const [cardName, setCardName] = useState([]);
  const [selectDay, setSelectDay] = useState();
  const [showHistory, setShowHistory] = useState(false);
  const [paymentDay, setPaymentDay] = useState();
  const [paymentData, setPaymentData] = useState([]);

  const onDayPress = async date => {
    setSelectDay(date);
    const result = await API.graphql(graphqlOperation(listPaymentss));
    var paymentsList = [];
    for (var i = 0; i < result.data.listPaymentss.items.length; i++) {
      var createdAt = result.data.listPaymentss.items[i].createdAt;
      var paymentsDay = createdAt.substr(0, 10);
      if (date === paymentsDay) {
        paymentsList.push(result.data.listPaymentss.items[i]);
      }
    }
    setPaymentData(paymentsList);
    setShowHistory(true);
  };

  useEffect(async () => {
    const result = await API.graphql(graphqlOperation(listPaymentss));
    markedDates = {};
    for (var i = 0; i < result.data.listPaymentss.items.length; i++) {
      var createdAt = result.data.listPaymentss.items[i].createdAt;
      var paymentsDay = createdAt.substr(0, 10);
      markedDates[paymentsDay] = {marked: true};
    }
    setPaymentDay(markedDates);
    const f = async () => {
      const result = await API.graphql(graphqlOperation(listMoneys));
      setCardName(result.data.listMoneys.items);
    };
    f();
  }, []);
  const deleteItem = async id => {
    const input = {id};
    await API.graphql(graphqlOperation(deletePayments, {input}));
  };

  return (
    <ScrollView>
      <Calendar
        onDayPress={day => {
          onDayPress(day.dateString);
        }}
        markedDates={paymentDay}
      />
      {showHistory && (
        <View>
          <Text style={{fontSize: 20, margin: 5}}>{selectDay}</Text>
          <FlatList
            sytle={{flex: 1, flexDirection: 'column'}}
            data={paymentData}
            renderItem={({item}) => {
              const swipeoutBtns = [
                {
                  text: '削除',
                  backgroundColor: 'blue',
                  underlayColor: 'rgba(0,0,0,1)',
                  onPress: () => deleteItem(item.id),
                },
              ];
              return (
                <Swipeout right={swipeoutBtns}>
                  <View
                    style={{
                      flexDirection: 'row',
                      margin: 10,
                      borderBottomColor: 'red',
                    }}>
                    <Text style={{flex: 1, fontSize: 20}}>{item.genre}</Text>
                    <Text style={{flex: 2, fontSize: 20}}>{item.pay}</Text>
                  </View>
                </Swipeout>
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  cardFont: {
    fontSize: 60,
    lineHeight: 100,
  },
  card: {
    marginBottom: 20,
  },
});
export default Calender;
