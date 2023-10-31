import React from 'react';
import {ActivityIndicator, Modal, Text, View} from 'react-native';
const AppLoading = visible => {
  return (
    <View>
      {visible ? (
        <Modal transparent={true} onRequestClose={() => null} visible={visible}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#00000070',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{borderRadius: 15, backgroundColor: '#fff', padding: 25}}>
              <ActivityIndicator size="large" color={'#0165ff'} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '200',
                  color: '#030031',
                  opacity: 1,
                }}>
                Loading
              </Text>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
};
export default AppLoading;
