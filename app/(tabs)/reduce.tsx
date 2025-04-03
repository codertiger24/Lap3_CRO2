// app/(tabs)/index.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice, createAction } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// Action dùng cho extraReducers
const RESET_COUNTER = createAction('RESET_COUNTER');

// Slice quản lý state counter
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 5 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
    multiply: (state) => { state.value *= state.value },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_COUNTER, (state) => {
      state.value = 5;
    });
  }
});

// Redux store
const store = configureStore({
  reducer: { counter: counterSlice.reducer }
});

// React component
const CounterApp = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state: any) => state.counter.value);

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>{counter}</Text>
      <Button title="Tăng biến đếm" onPress={() => dispatch(counterSlice.actions.increment())} />
      <Button title="Giảm biến đếm" onPress={() => dispatch(counterSlice.actions.decrement())} />
      <Button title="Mũ bình phương biến đếm" onPress={() => dispatch(counterSlice.actions.multiply())} />
      <Button title="Reset biến đếm" onPress={() => dispatch(RESET_COUNTER())} />
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <CounterApp />
    </Provider>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  counterText: {
    fontSize: 32,
    marginBottom: 20
  }
});