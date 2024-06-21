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
import {
  Calculated_Price_And_Profit,
  Options_MP_ML_BEP,
} from '@/constants/optionstype';
import { calculateRiskReward } from './options/calculateStrategy';
import OptionsStrategyGraph from './options/optionsStrategyGraph';
import { ThemedText } from './ThemedText';
import OptionForm from './options/optionsForm';
import { optionsContractT } from '@/constants/optionsStrategy';

const OptionsStrategyScreen = () => {
  const [options, setOptions] = useState<optionsContractT[]>([]);
  const [results, setResults] = useState<Calculated_Price_And_Profit[]>([]);

  const handleCalculate = () => {
    const strategyResults = calculateRiskReward(options);
    setResults(strategyResults);
    console.log(strategyResults);
  };

  const handleOptionsChange = (value: optionsContractT) => {
    console.log(value);
    setOptions([...options, value]);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Options Strategy Analyzer</Text>
        <OptionForm
          onAddOption={(option) => {
            handleOptionsChange(option);
          }}
        />

        <View style={styles.flexCol}>
          {options?.length > 0 &&
            options?.map((option, index) => (
              <View key={index} style={styles.flex}>
                <Text>Option {index + 1}</Text>
                <Text>Strike Price: {option.strikePrice}</Text>
                <Text>Premium: {option.premium}</Text>
                <Text>Type: {option.type}</Text>
                {/* Remove button */}
                <Pressable
                  onPress={() => {
                    setOptions(options.filter((_, i) => i !== index));
                  }}
                >
                  <Text style={styles.remove}>Remove</Text>
                </Pressable>
              </View>
            ))}
        </View>
        <Pressable onPress={handleCalculate} style={styles.button}>
          <ThemedText>Calculate</ThemedText>
        </Pressable>

        {results && (
          <View>
            <OptionsStrategyGraph options={results} />
          </View>
        )}
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

  flex: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    flex: 1,
    backgroundColor: '#ffbdbd',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flexItem: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#ff0000',
  },
  remove: {
    color: 'red',
  },
});

export default OptionsStrategyScreen;
