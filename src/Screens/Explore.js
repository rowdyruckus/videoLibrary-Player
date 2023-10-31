import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import email from 'react-native-email';
import HeaderComponent from '../Utils/HeaderComponent';

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
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.headerStyleView}>
          <HeaderComponent
            onPressAvatar={() => props.navigation.navigate('Users')}
            onPressNotification={() =>
              props.navigation.navigate('Notifications')
            }
          />
        </View>
        <ScrollView style={styles.contentContainer}>
          <Image
            source={require('../../assets/forest.png')}
            style={styles.wallWripple}
            resizeMode="center"
          />
          <Text style={styles.growingContent}>
            Local agriculture done right is a panacea for food purity, food
            security, and self reliance. We can create independence from toxic,
            exploitive, destructive consumerism. We can create everything we
            need to thrive: food, medicine, building materials and fuel. We can
            create lasting legacies that produce abundance beyond our years.
            This prepares us for the biggest challenges we’ll face, whether
            drought, flood, famine or fire. This means local resilience in the
            face of fragile supply chains. Sowing abundance together, …we
            naturally foster community, …and delicious, nutritious beauty. …as
            we have for thousands of years, …it’s in our blood, it’s who we are.
            Many are anxious and depressed because they are disconnected from
            the divine design. This is the best way most of us can love
            ourselves and our communities. With plenty of fresh air, exercise,
            and sunshine, …we make ourselves maximally alive, healthy and
            strong. What’s more important than the health of us and our loved
            ones? It can be as simple and easy as feeding the bunnies and
            watering the flowers. Let’s plant paradise everywhere.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  headerStyleView: {
    height: 50,
  },
  contentContainer: {
    paddingHorizontal: 20,
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
    textAlign: 'left',
    marginBottom: 100,
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
    height: 250,
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
