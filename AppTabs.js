import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";

const Logo = () => <Text>Curso Udemy</Text>;
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text styles={styles.text}>Hola Mundo</Text>
      {/* <Button title="Ir a Detalle" onPress={() => navigation.push("Detalle")} /> */}
      <Button
        title="Ir a Detalle"
        onPress={() => navigation.navigate("Detalle", { user_id: 2 })}
      />
    </View>
  );
};
HomeScreen.navigationOptions = {
  // title: "Home",
  headerTitle: () => <Logo />,
  // headerRight: () => (
  //   <Button
  //     onPress={() => alert("Hola soy un botón")}
  //     title="Presione"
  //     color="#222"
  //   />
  // ),
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
const AppNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    Detalle: { screen: DetalleScreen },
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName == "Home") {
          iconName = `ios-information-circle${focused ? "" : "-outline"}`;
        } else {
          iconName = `ios-options`;
        }

        return <Ionicons name={iconName} size={20} tintColor={tintColor} />;
      },
      tabBarOptions: {
        activeTintColor:
          navigation.state.routeName == "Home" ? "#e91e63" : "orange",
        inactiveTintColor: "black",
        labelStyle: {
          fontSize: 16,
        },
        style: {
          backgroundColor: "#fec",
        },
      },
    }),
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
