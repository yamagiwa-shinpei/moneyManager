import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {Item, Card, Input, Button} from 'native-base';
import Modal from 'react-native-modal';

import {createCard} from '../src/graphql/mutations';
import RNPickerSelect from 'react-native-picker-select';

function AddCard() {
  const [type, setType] = useState('');
  const [cardName, setCardName] = useState('');
  const [initialAmount, setInitialAmount] = useState('');
  const [addCardModalVisible, setAddCardModalVisible] = useState(false);

  const CardRegister = async () => {
    const balance = initialAmount;
    const name = cardName;
    const input = {type, name, balance};
    await API.graphql(graphqlOperation(createCard, {input}));
    setType('');
    setCardName('');
    setInitialAmount('');
    setAddCardModalVisible(false);
  };

  return (
    <SafeAreaView>
      <View style={{justifyContent: 'center', marginTop: 20}}>
        <Button
          block
          style={{width: '70%', marginLeft: '15%'}}
          onPress={() => setAddCardModalVisible(true)}>
          <Text style={{fontSize: 20}}>Card Add</Text>
        </Button>
      </View>
      <Modal isVisible={addCardModalVisible}>
        <TouchableOpacity onPress={() => setAddCardModalVisible(false)}>
          <Card>
            <View style={{alignItems: 'center'}}>
              <View style={styles.textInput}>
                <RNPickerSelect
                  style={{
                    fontSize: 16,
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 4,
                    color: 'black',
                    paddingRight: 30,
                    placeholder: {
                      padding: 'auto',
                      height: 40,
                      fontSize: 20,
                    },
                  }}
                  onValueChange={text => setType(text)}
                  items={[
                    {label: '現金', value: '現金'},
                    {label: 'クレジットカード', value: 'クレジットカード'},
                    {label: '銀行', value: '銀行'},
                    {label: 'デビットカード', value: 'デビットカード'},
                    {label: '電子マネー', value: '電子マネー'},
                  ]}
                />
              </View>
              <TextInput
                style={styles.textInput}
                onChangeText={text => setCardName(text)}
                value={cardName}
                placeholder="カード名"
              />
              <TextInput
                style={styles.textInput}
                onChangeText={text => setInitialAmount(text)}
                value={initialAmount}
                placeholder="初期金額"
              />
              <Button
                block
                style={{
                  width: '30%',
                  marginLeft: '35%',
                  height: 40,
                  marginBottom: 10,
                }}
                onPress={CardRegister}>
                <Text style={{fontSize: 20}}>登録</Text>
              </Button>
            </View>
          </Card>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    marginLeft: 20,
  },
  card: {
    marginBottom: 20,
    width: '90%',
    height: 250,
    borderRadius: 10,
  },
});
export default AddCard;
