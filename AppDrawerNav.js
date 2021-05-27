import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "react-navigation-drawer";

const Logo = () => <Text>Curso Udemy</Text>;
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text styles={styles.text}>Hola Mundo</Text>
      {/* <Button title="Ir a Detalle" onPress={() => navigation.push("Detalle")} /> */}
      <Button title="Ir a Detalle" onPress={() => navigation.openDrawer()} />
    </View>
  );
};
HomeScreen.navigationOptions = {
  headerTitle: () => <Logo />,
  drawerIcon: ({ tintColor }) => {
    return (
      <Ionicons name="ios-information-circle" size={25} color={tintColor} />
    );
  },
  headerStyle: {
    backgroundColor: "#f00",
  },
};
const DetalleScreen = ({ navigation }) => {
  const [cont, setCont] = useState(0);
  const incrementar = () => setCont(cont + 1);
  useEffect(() => {
    navigation.setParams({ incrementar });
  }, [cont]);
  return (
    <View style={styles.container}>
      <Text styles={styles.text}>Hola Detalle Screen {cont}</Text>
      <Button title="Regresar" onPress={() => navigation.navigate("MiModal")} />
    </View>
  );
};
DetalleScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam("title", "Cargando..."),
    headerRight: () => (
      <Button
        onPress={navigation.getParam("incrementar")}
        title="Mas 1"
        color="#555"
      />
    ),
  };
};
const AppNavigator = createDrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Detalle: { screen: DetalleScreen },
  },
  {
    initialRouteName: "Home",
  }
);

const RootStack = createStackNavigator(
  {
    Main: AppNavigator,
    MiModal: () => <Text>Un modal</Text>,
  },
  {
    mode: "modal",
    headerMode: "none",
  }
);
export default createAppContainer(RootStack);
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
