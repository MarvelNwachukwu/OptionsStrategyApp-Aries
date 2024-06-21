import { optionsContractT } from "@/constants/optionsStrategy";
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Picker from "react-native-picker-select";

const OptionForm = ({ onAddOption }: { onAddOption: (option: optionsContractT) => void }) => {
  const [type, setType] = useState<optionsContractT['type']>('call');
  const [strikePrice, setStrikePrice] = useState('');
  const [premium, setPremium] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = () => {
    if (!strikePrice || !premium || !quantity) {
      return;
    }
    onAddOption({ type, strikePrice: parseFloat(strikePrice), premium: parseFloat(premium), quantity: parseInt(quantity) });
    setType('call');
    setStrikePrice('');
    setPremium('');
    setQuantity('');
  };

  return (
    <View style={styles.form}>
      <Picker value={type} onValueChange={(itemValue) => setType(itemValue)} items={[{ label: 'Call', value: 'call' }, { label: 'Put', value: 'put' }]} style={PickerStyle}>

      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Strike Price"
        keyboardType="numeric"
        value={strikePrice}
        onChangeText={setStrikePrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Premium"
        keyboardType="numeric"
        value={premium}
        onChangeText={setPremium}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <Button title="Add Option" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },


});const PickerStyle = {
  inputAndroid: {
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    height: 40,
    marginBottom: 10,
  },
  inputIOS: {
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    height: 40,
    marginBottom: 10,
  },
  inputWeb: {
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    height: 40,
    marginBottom: 10,
  },
};

export default OptionForm;