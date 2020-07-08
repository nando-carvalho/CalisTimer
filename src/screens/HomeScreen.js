import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import Button from '../components/Button';

const HomeScreen = props => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.logo}>CalisTimer</Text>
      <Button
        style={Styles.btn}
        onPress={() => props.navigation.navigate('EMOM')}>
        EMOM{' '}
      </Button>
      <Button
        style={Styles.btn}
        onPress={() => props.navigation.navigate('EMOM')}>
        AMRAP{' '}
      </Button>
      <Button
        style={Styles.btn}
        onPress={() => props.navigation.navigate('EMOM')}>
        Isometria
      </Button>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#612f74',
  },
  logo: {
    fontFamily: 'Ubuntu-gold',
    fontSize: 48,
    textAlign: 'center',
    color: '#ffff',
    marginTop: 90,
    marginBottom: 90,
  },
  btn: {
    padding: 20,
  },
});

export default HomeScreen;
