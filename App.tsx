import { store } from './redux';
import { Provider } from 'react-redux';
import React from 'react';
import AppLayout from './layout/AppLayout';

export default function App() {
  return (
    <Provider store={store}>
      <AppLayout />
    </Provider>
  );
}
