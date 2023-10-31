import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import email from 'react-native-email';

const informationContent1 = () => (
  <View style={styles.informationContent1}>
    <Text style={styles.growingTitle}>Growing freedom one seed at a time</Text>
    <Text style={styles.growingContent}>
      Since our launch on Earth Day 2021, we have helped people grow food in
    </Text>
    <View style={styles.thirdContent}>
      <View style={styles.thirdContainerChild}>
        <Text style={styles.numberTitle}>50</Text>
        <Text style={styles.stateTitle}>STATES</Text>
      </View>
      <View style={styles.thirdContainerChild}>
        <Text style={styles.numberTitle}>51</Text>
        <Text style={styles.stateTitle}>COUNTRIES</Text>
      </View>
    </View>
    <View style={styles.mt10}>
      <Text style={styles.growingContent}>
        including resorts in Thailand, large farms in Africa, and single-family
        residences from Poland to Mexico and all around the United States. Our
        professional food forest designers can design in any location around the
        world.
      </Text>
    </View>
  </View>
);

const _renderFirstCarousel = ({index, item}) => (
  <View>
    <View style={styles.renderFirstCarousel}>
      <Image source={item.uri} style={styles.peopleSaidImage} />
    </View>
  </View>
);

const _renderSecondCarousel = ({index, item}) => (
  <View>
    <View style={styles.renderSecondCarousel}>
      <Image source={item.uri} style={styles.workImage} />
    </View>
  </View>
);

const TestingScreen = props => {
  const [playing, setPlaying] = useState(false);
  const [activeIndexCar1, setActiveIndexCar1] = useState(0);
  const [activeIndexCar2, setActiveIndexCar2] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAdress] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [hear, setHear] = useState('');
  const [message, setMessage] = useState('');
  const carouselRef = useRef(null);
  const carouselWorkRef = useRef(null);
  const listData = [
    {
      uri: require('../../assets/testi1.png'),
    },
    {
      uri: require('../../assets/testi2.png'),
    },
    {
      uri: require('../../assets/testi4.png'),
    },
    {
      uri: require('../../assets/testi5.png'),
    },
    {
      uri: require('../../assets/testi6.png'),
    },
    {
      uri: require('../../assets/testi7.png'),
    },
    {
      uri: require('../../assets/testi8.png'),
    },
  ];

  const listWorkData = [
    {
      uri: require('../../assets/work1.jpeg'),
    },
    {
      uri: require('../../assets/work2.jpeg'),
    },
    {
      uri: require('../../assets/work4.jpeg'),
    },
    {
      uri: require('../../assets/work5.jpeg'),
    },
    {
      uri: require('../../assets/work0.jpeg'),
    },
  ];

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      console.log('video has finished playing!');
    }
  }, []);

  const handleEmail = () => {
    const mainMessage = `Name : ${firstName} ${lastName} \n Email: ${emailAddress} \n Phone: ${phone} \n Address: ${address} \n Province: ${province} \n How did hear about us : ${hear} \n Message: ${message}`;
    const to = ['giles73@gmail.com']; // string or array of email addresses
    email(to, {
      // Optional additional arguments
      // cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
      // bcc: 'mee@mee.com', // string or array of email addresses
      // subject: 'Show how to use',
      body: mainMessage,
      // checkCanOpen: false, // Call Linking.canOpenURL prior to Linking.openURL
    }).catch('error open email ', console.error);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.growingContent}>
          including resorts in Thailand, large farms in Africa, and
          single-family residences from Poland to Mexico and all around the
          United States. Our professional food forest designers can design in
          any location around the world.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  contentContainer: {
    marginTop: 8,
  },
  heading: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 25,
    color: '#212121',
    marginHorizontal: 15,
    // marginTop: 50,
  },
  content: {
    color: '#2c2c2c',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
  space: {
    height: 25,
  },
  containerDescription: {
    marginBottom: 15,
    marginTop: 25,
    marginHorizontal: 15,
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  link: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    marginLeft: 14,
  },
  profile: {
    marginTop: 30,
    width: '100%',
    height: 200,
    // marginHorizontal: 15,
  },
  titleDescription: {
    fontFamily: 'Roboto-Black',
    fontSize: 17,
    marginTop: 15,
    marginBottom: 5,
  },
  subTitleDescription: {
    fontFamily: 'Outfit-SemiBold',
    color: '#92C255',
    fontSize: 15,
    marginTop: 10,
  },
  description: {
    fontFamily: 'Outfit-Regular',
    color: '#595959',
    fontSize: 15,
    fontWeight: '300',
  },
  backgroundVideo: {
    marginTop: 20,
    height: 200,
    width: 320,
    flex: 1,
    // top: 0,
    backgroundColor: '#000',
  },
  youtubePlayer: {
    marginTop: 10,
    marginHorizontal: 15,
  },
  youtubeOpacity: {
    opacity: 0.99,
  },
  informationContent1: {marginBottom: 60, marginTop: 30, marginHorizontal: 20},
  growingTitle: {
    fontFamily: 'Outfit-SemiBold',
    color: '#5E8887',
    fontSize: 21,
    textAlign: 'center',
  },
  growingContent: {
    marginTop: 5,
    fontFamily: 'Outfit-Regular',
    color: '#595959',
    fontSize: 17,
    fontWeight: '300',
    textAlign: 'center',
  },
  thirdContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginTop: 10,
  },
  thirdContainerChild: {justifyContent: 'center', alignItems: 'center'},
  numberTitle: {
    fontFamily: 'Outfit-SemiBold',
    color: '#5E8887',
    fontSize: 40,
  },
  stateTitle: {
    fontFamily: 'Outfit-SemiBold',
    color: '#92C255',
    fontSize: 15,
  },
  mt10: {
    marginTop: 10,
  },
  contactUsSection: {
    marginBottom: 50,
    // marginTop: 20,
    // marginHorizontal: 5,
    backgroundColor: '#5E8886',
    width: '100%',
    paddingBottom: 20,
  },
  wallWripple: {
    width: '100%',
  },
  txtContactUsTitle: {
    textAlign: 'center',
    fontFamily: 'Outfit-SemiBold',
    color: 'white',
    fontSize: 21,
  },
  textInputContactUs: {
    fontFamily: 'Outfit-Regular',
    fontSize: 15,
    color: '#000000',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 15,
  },
  textInputContactUsMessage: {
    fontFamily: 'Outfit-Regular',
    fontSize: 15,
    color: '#000000',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 15,
    height: 100,
  },
  contactUsSubmitButton: {
    width: 100,
    height: 50,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 15,
    alignSelf: 'center',
  },
  txtSubmit: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Outfit-Regular',
  },
  peopleSaidImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  workImage: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
  },
  renderFirstCarousel: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 240,
    marginLeft: 25,
    marginRight: 25,
  },
  renderSecondCarousel: {
    borderRadius: 5,
    height: 280,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
    alignSelf: 'center',
  },
  sliderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  previousCarousel: {
    width: '15%',
    alignItems: 'flex-end',
  },
  mainCarousel: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    // alignSelf: 'center',
  },
  mainWorkCarousel: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    // backgroundColor: 'red',
    // alignSelf: 'center',
  },
  nextCarousel: {
    width: '15%',
    alignItems: 'flex-start',
  },
  reviewContainer: {
    flexDirection: 'column',
    marginTop: 10,
    alignSelf: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  outfitRegular: {
    fontFamily: 'Outfit-Regular',
  },
  outfitRegularCenter: {
    fontFamily: 'Outfit-Regular',
    textAlign: 'center',
  },
  growingContent2: {
    marginTop: 10,
    fontFamily: 'Outfit-Regular',
    color: '#595959',
    fontSize: 17,
    fontWeight: '300',
    textAlign: 'center',
    marginHorizontal: 15,
  },
  paginationContainer: {
    width: 50,
    height: 10,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 1,
    backgroundColor: '#404040',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  workContainer: {
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 30,
  },
});

export default TestingScreen;
