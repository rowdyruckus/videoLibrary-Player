import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from '../Modules';
import {heightPercentageToDP, widthPercentageToDP} from '../Utils/DpToPixel';
import {displayName} from '../../app.json';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import FirebaseHelper from '../Utils/FirebaseHelper';
import firestore from '@react-native-firebase/firestore';
import {CommonActions} from '@react-navigation/native';
import AppLoading from '../Utils/AppLoader';
import {useDispatch} from 'react-redux';
import * as ApiDataActions from '../../redux/store/actions/ApiData';

export const Input = ({
  placeholder,
  icon,
  value,
  onChange,
  securePass,
  isPass,
  secureChange,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Icon color="#9097a3" size={24} name={icon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9097a3"
        value={value}
        onChangeText={onChange}
        style={styles.input}
        secureTextEntry={securePass}
      />
      {isPass && (
        <Pressable onPress={secureChange}>
          <Icon
            name={securePass ? 'eye-off-outline' : 'eye-outline'}
            color="#9097a3"
            size={23}
          />
        </Pressable>
      )}
    </View>
  );
};

const Login = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  GoogleSignin.configure({
    webClientId:
      '59244111152-0s2cvsjnjsdb9hrinieb7iitrsvpur8j.apps.googleusercontent.com',
    offlineAccess: false,
    forceCodeForRefreshToken: true,
    scopes: ['profile', 'email'],
  });
  const onGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const credential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
      );
      const firebaseUserCredential = await auth().signInWithCredential(
        credential,
      );
      setLoading(true);
      FirebaseHelper.getUserProfile(
        firebaseUserCredential.user.uid,
        response => {
          if (response._exists !== true) {
            createUserProfileGoogle(
              firebaseUserCredential?.user?.uid,
              firebaseUserCredential?.user?._user?.displayName,
              firebaseUserCredential?.user?._user?.email,
              firebaseUserCredential?.user?._user?.photoURL,
              Math.floor(Math.random() * (999 - 100 + 1) + 100),
            );
          } else {
            setLoading(false);
            let user = {
              uid: response?._data?.uid,
              name: response?._data?.name,
              email: response?._data?.email,
              image: response?._data?.imageUrl,
              userId: response?._data?.userId,
            };
            dispatch(ApiDataActions.SetLoginData(user));
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Main'}],
              }),
            );
          }
        },
      );
    } catch (error) {
      setLoading(false);
      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error?.code === statusCodes.IN_PROGRESS) {
      } else if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
        console.log('Error ===>', error);
      }
    }
  };

  const createUserProfileGoogle = async (id, name, email, pic, userId) => {
    await firestore()
      .collection('UserRecord')
      .doc(id)
      .set({
        name: name,
        email: email,
        imageUrl: pic,
        userId: userId,
        uid: id,
      })
      .then(res => {
        setLoading(false);
        let user = {
          uid: id,
          name: name,
          email: email,
          image: pic,
          userId: userId,
        };
        dispatch(ApiDataActions.SetLoginData(user));
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Main'}],
          }),
        );
      });
  };

  return (
    <ScrollView style={styles.container}>
      {AppLoading(loading)}
      <Image
        source={require('../../assets/login.png')}
        style={styles.loginImage}
        resizeMode="contain"
      />
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Login</Text>
        <Input placeholder="Email ID" icon="at-outline" />
        <Input placeholder="Password" icon="lock-closed-outline" />
        <Button
          title="Login"
          styleProps={styles.button}
          textStyle={styles.buttonText}
          // onPress={() => props.navigation.navigate('Main')}
          onPress={() => console.log('Main')}
        />
        <Text style={styles.loginWith}>Or, login with</Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => onGoogleLogin()}>
            <Icon size={28} name="logo-google" color="#242526" />
          </TouchableOpacity>
          <View style={styles.socialButton}>
            <Icon size={28} name="logo-facebook" color="#1877f2" />
          </View>
          <View style={styles.socialButton}>
            <Icon size={28} name="logo-twitter" color="#1DA1F2" />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.loginWith}>New to {displayName}?</Text>
          <Pressable onPress={() => props.navigation.navigate('Signup')}>
            <Text style={styles.link}>Register</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  contentContainer: {
    marginHorizontal: 15,
  },
  heading: {
    color: '#192948',
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    marginVertical: 15,
  },
  loginImage: {
    width: widthPercentageToDP('100%'),
    height: heightPercentageToDP('34%'),
  },
  inputContainer: {
    borderBottomColor: '#e4e6e5',
    borderBottomWidth: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  input: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    color: '#212121',
    width: widthPercentageToDP('80'),
  },
  button: {
    backgroundColor: '#0165ff',
    borderWidth: 0,
    width: widthPercentageToDP('85'),
    height: heightPercentageToDP('6'),
  },
  buttonText: {
    color: '#fff',
  },
  loginWith: {
    textAlign: 'center',
    color: '#9097a3',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
  socialButton: {
    borderColor: '#e4e6e5',
    borderWidth: 1.4,
    width: widthPercentageToDP('25'),
    height: heightPercentageToDP('7'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  logo: {
    width: 30,
    height: 30,
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: widthPercentageToDP('80'),
    alignSelf: 'center',
    marginVertical: 15,
  },
  link: {
    color: '#2862ab',
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    marginHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
});

export default Login;
