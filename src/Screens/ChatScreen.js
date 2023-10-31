import React, {useState, useEffect} from 'react';
import {Bubble, GiftedChat, Time} from 'react-native-gifted-chat';
import {SafeAreaView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import {createChatId, sendMessage} from '../Utils/Helper';
import moment, {now} from 'moment';
import auth from '@react-native-firebase/auth';
import AppLoading from '../Utils/AppLoader';
import {useSelector} from 'react-redux';
const ChatScreen = props => {
  const isFocused = useIsFocused();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.ApiData.loginData);
  let otherPersonId = props?.route?.params?.item?.uid;
  let otherPersonName = props?.route?.params?.item?.name;
  let otherPersonProfileImage = props?.route?.params?.item?.image;

  let chatId = createChatId([
    ...[parseInt(user?.userId)],
    parseInt(props?.route?.params?.item?.userId),
  ]);


  useEffect(() => {
    let unSubscribe = fetchChatMessages();
    return () => {
      console.log('Running unmount===>>>', unSubscribe);
    };
  }, [isFocused]);

  const fetchChatMessages = () => {
    setLoading(true);
    firestore()
      .collection('chats')
      .where('chatId', '==', chatId)
      .onSnapshot({includeMetadataChanges: true}, res => {
        if (res != null && res?.docs?.length !== 0) {
          firestore()
            .collection('chats')
            .doc(chatId)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot({includeMetadataChanges: true}, res => {
              let msgs = [];
              if (res != null) {
                res?.docs?.forEach(msg => {
                  if (msg.exists) {
                    let data = {
                      _id: msg?._data?.createdAt + now(),
                      text: msg?._data?.text,
                      docId: msg?.id,
                      createdAt: msg?._data?.createdAt,
                      user: {
                        _id: msg?._data?.user?._id,
                        name: msg?._data?.user?.name,
                        avatar: msg?._data?.user?.avatar,
                      },
                    };
                    msgs.push(data);
                  }
                });
                let Data = msgs.sort(
                  (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                );
                setMessages(Data);
                setLoading(false);
              } else {
                setMessages([]);
                setLoading(false);
              }
            });
        } else {
          setLoading(false);
        }
      });
  };

  const onSendMessage = (newMessages = []) => {
    sendMessage(
      {
        text: newMessages[0]?.text,
        createdAt: moment().format(),
        otherUserId: otherPersonId,
        user: {
          _id: newMessages[0]?.user?._id,
          name: newMessages[0]?.user?.name,
          avatar: newMessages[0]?.user?.avatar,
        },
      },
      [...[user?.userId], props?.route?.params?.item?.userId],
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {AppLoading(loading)}
      <GiftedChat
        messages={messages}
        onSend={messages => {
          const msg = {
            ...messages[0],
            image: '',
          };
          onSendMessage([msg]);
        }}
        user={{
          _id: auth().currentUser.uid,
          name: auth().currentUser?.displayName,
          avatar: auth().currentUser?.photoURL,
        }}
        showUserAvatar={true}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                left: {
                  backgroundColor: 'white',
                  marginRight: 0,
                },
              }}
            />
          );
        }}
        renderTime={props => {
          return (
            <Time
              {...props}
              timeTextStyle={{
                left: {
                  color: 'grey',
                },
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
