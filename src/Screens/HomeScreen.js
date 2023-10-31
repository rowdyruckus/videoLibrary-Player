import {
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {CoverVideo} from '../Modules';
import Icon from 'react-native-vector-icons/Ionicons';
import Orientation from 'react-native-orientation-locker';
import {useFocusEffect} from '@react-navigation/native';
import HeaderComponent from '../Utils/HeaderComponent';

const Option = ({onPress, icon, title}) => {
  return (
    <Pressable style={styles.option} onPress={onPress}>
      <Icon name={icon} color="#282828" size={25} />
      <Text style={styles.optionText}>{title}</Text>
    </Pressable>
  );
};

const HomeScreen = props => {
  const [optionModal, setOptionModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  useFocusEffect(() => {
    Orientation.lockToPortrait();
  });

  const Comp = ({item, index}) => {
    return (
      <CoverVideo
        onPress={() =>
          props.navigation.navigate('Player', {
            videoIndex: index,
          })
        }
        thumbnail={item?.thumb}
        channelAction={() =>
          props.navigation.navigate('ChannelScreen', {
            channelName: item?.channel,
          })
        }
        channelAvtar={'https://s3.envato.com/files/335035895/thumbnail.png'}
        title={item?.title}
        channelName={item?.channel}
        uploaded={item?.uploaded}
        views={item?.views}
        action={() => setOptionModal(true)}
      />
    );
  };

  const navScreen = (screenName, params = {}) => {
    setProfileModal(false);
    props.navigation.navigate(screenName, params);
  };

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
        <ScrollView style={styles.container}>
          <View style={styles.contentContainer}>
            <Image
              source={require('../../assets/map.png')}
              style={styles.wallWripple}
              resizeMode="center"
            />
            <Text style={styles.growingContent}>
              {
                "Corporate agriculture is maximizing profits at the expense of our health. Monsanto’s herbicide glyphosate is a highly toxic poison. It has caused cancer for millions of Americans. \n\n Peer-reviewed studies link this poison to many other diseases including autism, Alzheimer’s, dementia, Celiac’s, gluten intolerance, diabetes, obesity, autoimmune diseases, and cancers. Many of these disease incidence rates have increased tenfold in the past 25 years with a 99% correlation with the increased use of glyphosate. \n\n The FDA has trouble finding any food that does not have glyphosate. Even low concentrations are toxic. We are far from the responsible guidelines the relevant precautionary principle suggests. \n\n Monsanto’s poison disproportionately affects the poor and children, because it is highly concentrated in processed foods and children’s kidneys aren’t fully developed for filtering toxins. What's more important than the health of us and our loved ones? The stakes could hardly be higher. Let's do better."
              }
            </Text>
          </View>
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
  wallWripple: {
    width: '100%',
    height: 150,
  },
  growingContent: {
    marginTop: 20,
    fontFamily: 'Outfit-Regular',
    color: '#595959',
    fontSize: 17,
    fontWeight: '300',
    textAlign: 'left',
    marginBottom: 100,
  },
  channelAvtar: {
    width: 28,
    height: 28,
    borderRadius: 28 / 2,
  },

  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 8,
  },
  buttonText: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
    marginHorizontal: 6,
  },
  modalLine: {
    borderBottomWidth: 4,
    borderBottomColor: '#282828',
    width: '11%',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 6,
    opacity: 0.7,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  modalHeading: {
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    marginHorizontal: 10,
  },
  margin: {
    marginBottom: 48,
  },
  homeRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    justifyContent: 'space-around',
  },
  rightButton: {
    marginHorizontal: 8,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
  optionContainer: {
    marginHorizontal: 11,
    marginBottom: 4,
  },
  option: {
    flexDirection: 'row',
    marginVertical: 5,
    padding: 5,
  },
  optionText: {
    fontFamily: 'Roboto-Light',
    marginLeft: 10,
    fontSize: 18,
    color: '#212121',
  },
});

export default HomeScreen;
