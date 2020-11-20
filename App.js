
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MenuProductScreen from "./src/screens/MenuProductScreen" ;
import ProductSearchResults from './src/screens/ProductSearchResults';


const Stack = createStackNavigator();

export default function App(){ 
  return (
  <NavigationContainer> 
    <Stack.Navigator initialRouteName="ListaDeProductos">
      <Stack.Screen name="ListaDeProductos" component={MenuProductScreen} />
      <Stack.Screen name="resultadodebusqueda" component={ProductSearchResults} /> 
    </Stack.Navigator>
  </NavigationContainer>
  )

   

}
