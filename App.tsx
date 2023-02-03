import {SafeAreaView, StyleSheet, View} from 'react-native';
import SignInForm from './src/components/SignInForm';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SignInForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
});
