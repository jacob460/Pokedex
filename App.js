import { useFonts } from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Home from './screens/Home';
import Details from './screens/Details';
import Favorites from './screens/Favorites';
import List from './screens/List';
import Settings from './screens/Settings';
import CustDrawer from './components/CustDrawer';
import { NavigationContainer } from '@react-navigation/native';
import { store, persistor } from './store/redux/store';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const RenderDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustDrawer {...props}/>}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Pokemon List" component={List} />
        <Drawer.Screen name="Favorites" component={Favorites} />
        <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
);
}




export default function App() {

  const [loaded, error] = useFonts({
    'PixeloidMono' : require('./assets/fonts/PixeloidMono-d94EV.ttf'),
  });

  if(!loaded && !error)
    {
      return null;
    }

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="AppHome">   
          <Stack.Screen name="AppHome" component={RenderDrawer} options={{headerShown: false}}/>
          <Stack.Screen name="List" component={List} options={{headerShown: false}}/>
          <Stack.Screen name="Details" component={Details} />
          </Stack.Navigator>  
        </NavigationContainer>
      </PersistGate>
    </Provider>
    
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
