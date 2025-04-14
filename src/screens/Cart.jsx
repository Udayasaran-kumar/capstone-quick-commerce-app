import { View, Text, FlatList, Pressable, Image } from 'react-native';
import React from 'react';
import { useStore } from '../App'; // adjust the path

const Cart = () => {
  const { cartItems, setCartItems } = useStore();

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const total = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

  const renderItem = ({ item }) => (
    <View
      style={{
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
      <Image
        source={{ uri: item.imageUrl }}
        style={{ width: '100%', height: 150, borderRadius: 8, marginVertical: 10 }}
        resizeMode="cover"
      />
      <Text style={{ color: '#666' }}>{item.name}</Text>
      <Text style={{ fontWeight: 'bold', marginVertical: 5 }}>₹ {item.price}</Text>
      <Pressable
        onPress={() => handleRemove(item.id)}
        style={{
          backgroundColor: 'red',
          paddingVertical: 8,
          borderRadius: 5,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>Remove</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Cart is empty</Text>}
      />
      <View
        style={{
          padding: 15,
          borderTopWidth: 1,
          borderColor: '#ddd',
          backgroundColor: '#fff',
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total: ₹ {total}</Text>
      </View>
    </View>
  );
};

export default Cart;
