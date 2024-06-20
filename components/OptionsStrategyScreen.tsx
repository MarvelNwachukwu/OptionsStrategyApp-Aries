// src/screens/OptionsStrategyScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TextInput,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Options_MP_ML_BEP } from '@/constants/optionstype';
import { calculateStrategy } from './options/calculateStrategy';
import OptionsStrategyGraph from './options/optionsStrategyGraph';
import { ThemedText } from './ThemedText';

const OptionsStrategyScreen = () => {
  const [options, setOptions] = useState<Options_MP_ML_BEP[]>([
    { maxProfit: 1000, maxLoss: -500, breakEvenPoints: [50, 100] },
  ]);
  const [results, setResults] = useState<Options_MP_ML_BEP>();
  const [number, setNumber] = useState(0);
  const [text, setText] = useState('');

  const handleCalculate = () => {
    const strategyResults = calculateStrategy(options);
    setResults(strategyResults);
  };

  const handleOptionsChange = (value: Options_MP_ML_BEP) => {
    console.log(value);
    setOptions([...options, value]);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Options Strategy Analyzer</Text>
        <RNPickerSelect
          placeholder={{ label: 'Select an option', value: null }}
          style={PickerStyle}
          onValueChange={(value) => handleOptionsChange(value)}
          items={[
            {
              label: 'Option 1',
              value: {
                maxProfit: 1000,
                maxLoss: -500,
                breakEvenPoints: [50, 100],
              },
            },
            {
              label: 'Option 2',
              value: {
                maxProfit: 2000,
                maxLoss: -100,
                breakEvenPoints: [75, 150],
              },
            },
            {
              label: 'Option 3',
              value: {
                maxProfit: 3000,
                maxLoss: -1500,
                breakEvenPoints: [100, 200],
              },
            },
            {
              label: 'Option 4',
              value: {
                maxProfit: 4000,
                maxLoss: -2000,
                breakEvenPoints: [125, 250],
              },
            },
          ]}
          value={undefined}
        />
        <TextInput style={styles.input} onChangeText={setText} value={text} />
        <TextInput
          style={styles.input}
          onChangeText={setNumber}
          value={number}
          placeholder='useless placeholder'
          keyboardType='numeric'
        />
        {results && (
          <View>
            <OptionsStrategyGraph options={options} />
          </View>
        )}
        <Pressable onPress={handleCalculate} style={styles.button}>
          <ThemedText>Calculate</ThemedText>
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0a7ea4',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#0a7ea4',
  },
});

const PickerStyle = {
  inputAndroid: { color: 'black' },
  inputIOS: { color: 'black' },
  inputWeb: {
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    height: 40,
    margin: 12,
  },
};

export default OptionsStrategyScreen;
