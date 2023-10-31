//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import FirebaseHelper from '../Utils/FirebaseHelper';
import AppLoading from '../Utils/AppLoader';
import auth from '@react-native-firebase/auth';

//================================ Local Imported Files ======================================//

const AllUserListing = props => {
  const isFocused = useIsFocused();
  const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getAllUsers();
    }
  }, [isFocused]);

  const getAllUsers = () => {
    let tempArray = [];
    setLoading(true);
    FirebaseHelper.getAllUsers(resp => {
      if (resp?._docs) {
        resp?._docs?.map(v => {
          tempArray.push({
            name: v?._data?.name,
            email: v?._data?.email,
            uid: v?._data?.uid,
            image: v?._data?.imageUrl,
            userId: v?._data?.userId,
          });
        });
        setPairs(tempArray);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  const _renderUsers = (item, index) => {
    if (item?.uid !== auth().currentUser.uid) {
      return (
        <TouchableOpacity
          style={styles.userView}
          onPress={() => props.navigation.navigate('ChatScreen', {item})}>
          <View style={styles.leftView}>
            <Image
              source={
                item?.image
                  ? {uri: item.image}
                  : require('../../assets/defaultProfile.jpg')
              }
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.rightView}>
            <Text style={styles.nameText}>{item?.name}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {AppLoading(loading)}
      <FlatList
        data={pairs}
        extraData={pairs}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: 10}}
        renderItem={({item, index}) => _renderUsers(item, index)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userView: {
    height: 80,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderWidth: 0.5,
  },
  leftView: {
    height: '100%',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  rightView: {
    marginLeft: 20,
  },
  nameText: {
    fontSize: 16,
  },
});
export default AllUserListing;
