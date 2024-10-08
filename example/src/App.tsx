import { StyleSheet, View, Text } from 'react-native';
import { Initialize, ENV } from '@hybeck/react-native-wellthiq';

export default function App() {
  Initialize({
    key: 'Hello',
    env: ENV.PROD,
    whitelist: ['com.myapp.com', 'com.anyapp.com'],
    appConfig: {
      appIcon: 'https://chzapps.com',
      inviteMessage: 'Join us for great rewards!',
      inviteExpire: true,
      permissionId: '1001',
    },
  });

  return (
    <View style={styles.container}>
      <Text>Result: {}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
