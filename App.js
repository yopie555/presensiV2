import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/store/index';

import { checkLogin } from './src/actions/authAction';

import SplashScreen from './src/screens/Splash'
import LoginScreen from './src/screens/Login'
import HomepageScreen2 from './src/screens/Homepage2'
import HistoryScreen from './src/screens/History'
import RiwayatScreen from './src/screens/Riwayat'
import PresensiScreen from './src/screens/Presensi'
import PresensiScreen2 from './src/screens/Presensi2'
import ResetScreen from './src/screens/Reset'
import PanduanScreen from './src/screens/Panduan'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootHome = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomepageScreen2"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#DAC34D',
        tabBarInactiveTintColor: '#FFF',
        tabBarStyle: {
          backgroundColor: '#264384',
          // borderTopWidth: 1,
          // borderColor: 'white',
        },
      }}
    >
      <Tab.Screen
        name="Presensi"
        component={HomepageScreen2}
        options={{
          tabBarLabel: 'Presensi',
          tabBarIcon: ({ color, size }) => (
            <Icon name="chart-histogram" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color, size }) => (
            <Icon name="history" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

// const App = () => {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="SplashScreen" component={SplashScreen} />
//           <Stack.Screen name="LoginScreen" component={LoginScreen} />
//           <Stack.Screen name="HomepageScreen" component={RootHome} />
//           <Stack.Screen name="RiwayatScreen" component={RiwayatScreen} />
//           <Stack.Screen name="PresensiScreen" component={PresensiScreen} />
//           <Stack.Screen name="PresensiScreen2" component={PresensiScreen2} />
//           <Stack.Screen name="ResetScreen" component={ResetScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// };

// export default App

const AuthScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="PanduanScreen" component={PanduanScreen} />
    </Stack.Navigator>
  )
}

const UserScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomepageScreen" component={RootHome} />
      <Stack.Screen name="RiwayatScreen" component={RiwayatScreen} />
      <Stack.Screen name="PresensiScreen" component={PresensiScreen} />
      <Stack.Screen name="PresensiScreen2" component={PresensiScreen2} />
      <Stack.Screen name="ResetScreen" component={ResetScreen} />
    </Stack.Navigator>
  )
}

const App = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkLogin());
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user.auth == "" && (
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
        )}
        {user.auth != "" && (
          <Stack.Screen name="UserScreen" component={UserScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// export default App;
export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};