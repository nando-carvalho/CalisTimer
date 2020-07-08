import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Timer = props => {
  const minutes = parseInt(props.time / 60);
  const seconds = parseInt(props.time % 60);
  const format = num => {
    if (num < 10) {
      return '0' + num;
    }
    return num;
  };
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles[props.type ? props.type : 'text']}>
        {format(minutes)}:{format(seconds)}
        {props.appendedText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20, paddingBottom: 20},
  title: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 48,
    color: 'white',
    textAlign: 'center',
  },
  text: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 96,
    color: 'white',
    textAlign: 'center',
  },
  text2: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
});

export default Timer;
