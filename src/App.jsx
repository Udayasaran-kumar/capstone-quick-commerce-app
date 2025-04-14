import {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Alert,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import {create} from 'zustand';
import auth from '@react-native-firebase/auth';
import HomeScreen from './screens/HomeScreen';
import { DarkTheme } from '@react-navigation/native';
export const useStore = create((set) => ({
  isLoggedin: false,
  setIsLoggedin: (value) => set({ isLoggedin: value }),

  products: [],
  setProducts: (newProducts) =>
    set(() => ({ products: newProducts })), 

  cartItems: [],
  setCartItems: (prod) =>
    set((state) => ({ cartItems: [...state.cartItems, prod] })), 
}));


const HaveAccountButton = ({haveAccount, setHaveAccount}) => {
  return (
    <Pressable onPress={() => setHaveAccount(prev => !prev)}>
      <Text style={styles.haveAccountLink}>
        {haveAccount
          ? "Don't have an account? Goto Sign Up"
          : 'Have an account? Goto Sign In'}
      </Text>
    </Pressable>
  );
};
const SignUp = ({haveAccount, setHaveAccount}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setIsLoggedin} = useStore();

  const signUp = async () => {
    auth()
    .createUserWithEmailAndPassword(username, password)
    .then((userCredentials) => {
      console.log('User account created & signed in!',userCredentials);
        if(userCredentials){
          <signIn/>
        }
      })
    .catch(error,userCredentials => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!', userCredentials);
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
  
      console.error(error);
    });
  };
  return (
    <View style={styles.innerContainer}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Submit" onPress={signUp} />
      <HaveAccountButton
        haveAccount={haveAccount}
        setHaveAccount={setHaveAccount}
      />
    </View>
  );
};
const SignIn = ({haveAccount, setHaveAccount}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {isLoggedin,setIsLoggedin} = useStore();

  const signIn = async () => {
  auth().signInWithEmailAndPassword(username,password)
  .then(userCredentials=>{
    if(userCredentials.user){
      setIsLoggedin(true);
    }
  });
  };
  return (
    <View style={styles.innerContainer}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Submit" onPress={signIn} />
      <HaveAccountButton
        haveAccount={haveAccount}
        setHaveAccount={setHaveAccount}
      />
    </View>
  );
};

const SingInSignUp = () => {
  const [haveAccount, setHaveAccount] = useState(true);
  if (haveAccount) {
    return <SignIn haveAccount={haveAccount} setHaveAccount={setHaveAccount} />;
  } else {
    return <SignUp haveAccount={haveAccount} setHaveAccount={setHaveAccount} />;
  }
};
 export const handleLogout=()=>{  
    auth().signOut;    
}

const App = () => {
  const {isLoggedin,setIsLoggedin} = useStore();
  useEffect(()=>{
    setIsLoggedin(auth()?.currentUser?.email?true:false);
  },[auth().currentUser])
  console.log("login",isLoggedin)
 
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'}/>
    <View style={styles.container}>
      {isLoggedin ? <HomeScreen /> : <SingInSignUp />}
    </View>
    </SafeAreaView >
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,0,0,0.2)',
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  haveAccountLink: {
    marginTop: 50,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
  },
});