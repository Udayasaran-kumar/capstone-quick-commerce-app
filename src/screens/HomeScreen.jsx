// import {useEffect, useState} from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     Button,
//     StyleSheet,
//     Pressable,
//     FlatList,
//   } from 'react-native';
//   import axios from 'axios';
//   import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//   import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import Cart from './Cart';


//   const Tab = createBottomTabNavigator();
//   function MyTabs() {
//     return (
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name='Cart' component={Cart}/>
//       </Tab.Navigator>
//     );
//   }
//   const renderItem = ({ item }) => (
//     <View>
//       <Text>{item.name}</Text>
//     </View>
//   );
// const HomeScreen = () => {

//   const [data, setData] = useState([]);

//   return (
//     <NavigationContainer>
//     <View>
//       <Text style={styles.title}>Home Screen</Text>
//       <FlatList 
//         data={data}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderItem}
//       />
//     </View>
//     <MyTabs/>
//     </NavigationContainer>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });
import { FlatList, Pressable, StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { handleLogout, useStore } from '../App';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from './Cart';
const Tab = createBottomTabNavigator();
  function MyTabs() {
    return (
      <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Cart" component={Cart} />
      </Tab.Navigator>
    </NavigationContainer>
    );
  }

const HomeScreen = () => {
  const {  setIsLoggedin,products,setProducts,cartItems,setCartItems } = useStore();
  const [screen,setScreen]=useState(false);
    function handlePress() {
    handleLogout();
    setIsLoggedin(false)
  }
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const response=await fetch("https://backend.ecom.subraatakumar.com/api/v1/allproducts");
        const resp=await response.json();
        // console.log(resp);
        setProducts(resp);
        // console.log(products);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  },[])
  useEffect(() => {
    console.log("Updated products:", products);
  }, [products]);
  const renderItem = ({ item }) => (
    <View style={{
      padding: 10,
      margin: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{item.title}</Text>
      
      <Image
        source={{ uri: item.imageUrl }}
        style={{ width: '100%', height: 150, borderRadius: 8, marginBottom: 10 }}
        resizeMode="cover"
      />
      
      <Text style={{ fontSize: 14, color: '#666', marginBottom: 10 }}>{item.name}</Text>
      
      <Pressable
        onPress={() => handleAddToCart(item)}
        style={{
          backgroundColor: '#007bff',
          paddingVertical: 10,
          borderRadius: 5,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add to Cart</Text>
      </Pressable>
    </View>
  );
  function handleAddToCart(item) {
    setCartItems((prevItems) => [...prevItems, item]);
  }
  const gotocart=()=>{
    setScreen(true);
    }
  
  return (
    
    <View style={styles.container}>
      <View style={{flex:1,justifyContent:'space-evenly',flexDirection:'row',height:50}}>
      <Text>HomeScreen</Text>
      <Pressable onPress={() => gotocart} style={{height:35,backgroundColor:'rgba(0,0,255,0.5)',borderRadius:5,padding:5}}><Text style={{fontWeight:'bold'}}>Cart {cartItems.length}</Text></Pressable>
      <Pressable onPress={() => handlePress()} style={{height:35,backgroundColor:'rgba(0,0,255,0.5)',borderRadius:5,padding:5}}><Text style={{fontWeight:'bold'}}>Logout</Text></Pressable>
      </View>
      <View style={{marginTop:50}}>
      <FlatList 
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      </View>
      
    </View>

   
  )
}

export default HomeScreen

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
})