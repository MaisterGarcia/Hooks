import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  // const [cont, setCont] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchUsers = async() => {
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1000);
    const response =await  fetch('https://jsonplaceholder.typicode.com/users');
    const json = await response.json();
    setUsers(json);
    setLoading(false);
  };
  useEffect(()=> {
    fetchUsers();
  }, []);
  return (
    <View style={styles.container}>
      {/* <Text styles={styles.text} onPress={setCont(cont + 1)}>
        {loading ? "Cargando..." : cont}
      </Text> */}
        <Text styles={styles.text} onPress={}>
        {loading ? "Cargando..." : users[0].name}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
