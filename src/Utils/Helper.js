//================================ React Native Imported Files ======================================//

import firestore from '@react-native-firebase/firestore';

export const sendMessage = async (message, users) => {
  const chatId = await createChatId(users);
  firestore()
    .collection('chats')
    .where('chatId', '==', chatId)
    .get()
    .then(res => {
      let exists = false;
      res.docs.forEach(document => {
        if (document.exists) {
          exists = true;
          firestore()
            .collection('chats')
            .doc(chatId)
            .update({
              lastMessage: message,
              visibleTo: users,
            })
            .then(res => {
              firestore()
                .collection('chats')
                .doc(chatId)
                .collection('messages')
                .add(message)
                .then(res => {
                  console.log('message sent successfully in old chat');
                });
            });
        }
      });
      if (!exists) {
        startNewChat(message, users, chatId);
      }
    });
};

//this function for new chat messages

export const startNewChat = (message, users, chatId) => {
  firestore()
    .collection('chats')
    .doc(chatId)
    .set({
      members: users,
      createdAt: new Date(),
      chatId: chatId,
      visibleTo: users,
      lastMessage: message,
    })
    .then(res => {
      firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add(message)
        .then(res => {
          console.log('Message sent successfully in new chat');
        });
    });
};

//this function use for join two email and convert into one email

export const createChatId = users => {
  let arr = [...new Set(users)];
  let array = arr?.sort((a, b) => (a > b ? 1 : -1));
  return array.join('');
};

export const sendGroupMessage = async (message, users, chatId) => {
  firestore()
    .collection('chats')
    .where('chatId', '==', chatId)
    .get()
    .then(res => {
      let exists = false;
      res.docs.forEach(document => {
        if (document.exists) {
          exists = true;
          firestore()
            .collection('chats')
            .doc(chatId)
            .update({
              lastmessage: message,
              visibleTo: users,
            })
            .then(res => {
              firestore()
                .collection('chats')
                .doc(chatId)
                .collection('messages')
                .add(message)
                .then(res => {
                  console.log('message sent successfully in old chat');
                });
            });
        }
      });
      if (!exists) {
        startGroupNewChat(message, users, chatId);
      }
    });
};

//this function for new chat messages

export const startGroupNewChat = (message, users, chatId) => {
  firestore()
    .collection('chats')
    .doc(chatId)
    .set({
      members: users,
      createdAt: new Date(),
      chatId: chatId,
      visibleTo: users,
      lastmessage: message,
    })
    .then(res => {
      firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add(message)
        .then(res => {
          console.log('message sent successfully in new chat');
        });
    });
};

export const fetchLiveChatMessages = (chatId, callback) => {
  let firebaseCollection = firestore()
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .orderBy('createdAt', 'desc');
  let unsubscribe = firebaseLiveFetch(firebaseCollection, liveCallback => {
    callback(liveCallback);
  });
  return unsubscribe;
};

export const checkMessage = (chatId, callback) => {
  firestore()
    .collection('chats')
    .doc(chatId)
    .get()
    .then(response => {
      callback({
        isSuccess: true,
        response: response,
      });
    })
    .catch(error => {
      callback({
        isSuccess: false,
        response: error,
      });
    });
};

export const firebaseLiveFetch = (collection, callback) => {
  let unsubscribe = collection.onSnapshot(snapshot => {
    if (snapshot) {
      callback({
        isSuccess: true,
        response: snapshot,
        reference: unsubscribe,
        message: 'Live Data fetched successfully',
      });
    } else {
      callback({
        isSuccess: false,
        response: snapshot,
        reference: unsubscribe,
        message: 'Live Data Not found',
      });
    }
  });
  return unsubscribe;
};
