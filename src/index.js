import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
// import store from '.././src/ReduxToolkit/store'
import store from './Redux/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      //refetchOnWindowFocus giúp khi mà chuyển qua tab web khác, rồi quay lại web của chúng ta thì nó không gọi lại api (những api query)
    },
  },
})
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
