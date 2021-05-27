import { StatusBar } from "expo-status-bar";
import React, { useReducer } from "react";
import { StyleSheet, Text, View } from "react-native";

const initialState = {
  cont: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "incrementar": {
      return { cont: state.cont + 1 };
    }
    case "decrementar": {
      return { cont: state.cont - 1 };
    }
    default: {
      return state;
    }
  }
};
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <View style={styles.container}>
      <Text
        styles={styles.text}
        onPress={() => dispatch({ type: "incrementar" })}
      >
        +
      </Text>
      <Text styles={styles.text}>{state.cont}</Text>
      <Text
        styles={styles.text}
        onPress={() => dispatch({ type: "decrementar" })}
      >
        -
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
