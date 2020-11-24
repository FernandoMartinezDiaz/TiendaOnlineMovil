
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MenuProductScreen from "./src/screens/MenuProductScreen" ;
import ProductSearchResultsScreen from "./src/screens/ProductSearchResultsScreen";
import InformacionScreen from "./src/screens/InformacionScreen";



const Stack = createStackNavigator();

export default function App(){ 
  return (
  <NavigationContainer> 
    <Stack.Navigator initialRouteName="ListaDeProductos">
      <Stack.Screen 
         name="ListaDeProductos" 
         component={MenuProductScreen} 
         options={{
          headerShown: false,
          }} />
      <Stack.Screen 
        name="resultadodebusqueda" 
        component={ProductSearchResultsScreen} 
        options={{
            title: "Búsqueda",
            headerStyle: {
              backgroundColor: "#1034A6",
            },
            headerTintColor: "#fff",
          }} />
      <Stack.Screen 
        name = "productinfo" 
        component={InformacionScreen} 
        options={{ title: "Información" ,
        headerStyle: {
          backgroundColor: "#1034A6",
        },
        headerTintColor: "#fff" ,
         }}/>
    </Stack.Navigator>
  </NavigationContainer>
  )

   

}
