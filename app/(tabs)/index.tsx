import React, { useState } from "react";
import { View, Button, StyleSheet, Animated, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const MoveScreen = () => {
  const [position] = useState(new Animated.Value(100));

  const moveBox = () => {
    const randomY = Math.floor(Math.random() * (height - 200)) + 50;

    Animated.timing(position, {
      toValue: randomY,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Button title="MOVE" onPress={moveBox} />
      <Animated.View style={[styles.box, { top: position }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
    backgroundColor: "#f5f5f5",
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: "blue",
    position: "absolute",
    top: 100,
  },
});

export default MoveScreen;
