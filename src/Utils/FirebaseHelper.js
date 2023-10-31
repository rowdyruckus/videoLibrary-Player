import firestore from '@react-native-firebase/firestore';

class firebaseServices {
  constructor(props) {}

  getUserProfile = async (userId, callback) => {
    await firestore()
      .collection('UserRecord')
      .doc(userId)
      .get()
      .then(resp => {
        callback(resp);
      });
  };
  getAllUsers = async callback => {
    await firestore()
      .collection('UserRecord')
      .get()
      .then(resp => {
        callback(resp);
      });
  };
}

const apiService = new firebaseServices();

export default apiService;
