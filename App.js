import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import RestaurantScreen from './src/screens/RestaurantScreen';
import { Provider } from 'react-redux';
import { store } from './store';
import BasketScreen from './src/screens/BasketScreen';
import PreparingScreen from './src/screens/PreparingScreen';
import DeliveryScreen from './src/screens/DeliveryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>

      
      <TailwindProvider>
      <Stack.Navigator>
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='RestaurantScreen' component={RestaurantScreen} />
        <Stack.Screen name='BasketScreen' component={BasketScreen} 
          options={{presentation:'modal',headerShown:false}}
        />
        <Stack.Screen name="PreparingScreen" component={PreparingScreen} options={{presentation:'fullScreenModal',headerShown:false}} />
        <Stack.Screen name="DeliveryScreen" component={DeliveryScreen} options={{presentation:'fullScreenModal',headerShown:false}} />
      </Stack.Navigator>
        </TailwindProvider> 
        </Provider>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
