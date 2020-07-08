import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import Select from '../components/Select';
import Title from '../components/Title';
import Time from '../components/Time';
import ProgressBar from '../components/ProgressBar';
import BackgroundProgress from '../components/BackgroundProgress';
import {TextInput} from 'react-native-gesture-handler';
import Sound from 'react-native-sound';

const alert = require('../../assets/sounds/alertPapaleguas.mp3');

class EMOMScreen extends Component {
  state = {
    keyboardIsVisible: false,
    alerts: [0, 15],
    countdown: 1,
    time: '2',
    countdownValue: 5,
    count: 0,

    isRunning: false,
  };
  componentDidMount() {
    Sound.setCategory('Playback', true);
    this.alert = new Sound(alert);

    this.kbShow = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({keyboardIsVisible: true});
    });
    this.kbHide = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({keyboardIsVisible: false});
    });
    // this.play();
    this.stop();
  }
  componentWillUnmount() {
    this.kbShow.remove();
    this.kbHide.remove();
  }
  playAlert = () => {
    const resto = this.state.count % 60;
    if (this.state.alerts.indexOf(resto) >= 0) {
      this.alert.play();
    }
    if (this.state.countdown === 1) {
      if (resto >= 55 && resto < 60) {
        this.alert.play();
      }
    }
  };
  play = () => {
    this.setState({isRunning: true});
    const count = () => {
      this.setState({count: this.state.count + 1}, () => {
        this.playAlert();
        if (this.state.count === parseInt(this.state.time) * 60) {
          clearInterval(this.countTimer);
        }
      });
    };
    if (this.state.countdown === 1) {
      this.alert.play();
      this.countdownTimer = setInterval(() => {
        this.alert.play();
        this.setState({countdownValue: this.state.countdownValue - 1}, () => {
          if (this.state.countdownValue === 0) {
            clearInterval(this.countdownTimer);
            this.countTimer = setInterval(count, 1000);
          }
        });
      }, 1000);
    } else {
      this.countTimer = setInterval(count, 1000);
    }
  };

  stop = () => {
    console.log('stop');
  };
  render() {
    if (this.state.isRunning) {
      const percMinute = parseInt(((this.state.count % 60) / 60) * 100);
      const percTime = parseInt(
        (this.state.count / 60 / parseInt(this.state.time)) * 100,
      );
      return (
        <BackgroundProgress percentage={percMinute}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Title
              title="EMOM"
              subtitle="Every Minute On the Minute"
              style={{paddingTop: this.state.keyboardIsVisible ? 20 : 40}}
            />

            <Text>Countdown: {this.state.countdownValue}</Text>
            <Text>Count: {this.state.count}</Text>
            <Time time={this.state.count} />
            <ProgressBar percentage={percTime} />
            <Time
              time={parseInt(this.state.time) * 60 - this.state.count}
              type="text2"
              appendedText={'  restantes'}
            />
            <Text>Minute: {percMinute}</Text>
            <Text>Time: {percTime}</Text>
            <Text>5</Text>
            <TouchableOpacity style={{alignSelf: 'center'}} onPress={this.stop}>
              <Image
                style={styles.iconImg}
                source={require('../../assets/iconsImg/stop.png')}
              />
            </TouchableOpacity>
          </View>
        </BackgroundProgress>
      );
    }
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="">
        <ScrollView style={styles.container}>
          <Title
            title="EMOM"
            subtitle="Every Minute On the Minute"
            style={{paddingTop: this.state.keyboardIsVisible ? 20 : 70}}
          />
          <Image
            style={styles.iconImg}
            source={require('../../assets/iconsImg/engrenagem.png')}
          />
          <Select
            current={this.state.alerts}
            label="Alertas:"
            options={[
              {
                id: 0,
                label: '0s',
              },
              {
                id: 15,
                label: '15s',
              },
              {
                id: 30,
                label: '30s',
              },
              {
                id: 45,
                label: '45s',
              },
            ]}
            onSelect={opt => this.setState({alerts: opt})}
          />
          <Select
            label="Contagem regressiva:"
            current={this.state.countdown}
            options={[{id: 1, label: 'sim'}, {id: 0, label: 'não'}]}
            onSelect={opt => this.setState({countdown: opt})}
          />
          <Text style={styles.label}>Quantos minutos:</Text>
          <TextInput
            style={styles.input}
            value={this.state.time}
            kyboardType="numeric"
            onChangeText={text => this.setState({time: text})}
          />
          <Text style={styles.label}>minutos</Text>
          <Text style={styles.label}>Testar</Text>
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={this.play}>
            <Image
              style={styles.iconImg}
              source={require('../../assets/iconsImg/play.png')}
            />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#612f74',
  },
  label: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 24,
  },
  input: {
    textAlign: 'center',
    color: 'gray',
    fontFamily: 'Ubuntu-Bold',
    fontSize: 48,
  },
  iconImg: {
    alignSelf: 'center',
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default EMOMScreen;
