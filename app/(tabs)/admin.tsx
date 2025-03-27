import React from "react";
import { View, Text, StyleSheet, FlatList, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DATA = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

type ItemProps = {
  text: string;
  translateY: Animated.AnimatedInterpolation<string | number>; // ✅ Sửa kiểu dữ liệu
};

const Item = ({ text, translateY }: ItemProps) => {
  return (
    <Animated.View
      style={[
        styles.item,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={styles.itemText}>{text}</Text>
    </Animated.View>
  );
};

const HomeScreen = () => {
  const scrollY = new Animated.Value(0);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingVertical: 20 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [-1, 0, index * 100, (index + 2) * 100];
          const translateY = scrollY.interpolate({
            inputRange,
            outputRange: [30, 20, 10, 0],
            extrapolate: "clamp",
          });

          return <Item text={item} translateY={translateY} />;
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  item: {
    backgroundColor: "#77d9e9",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});
