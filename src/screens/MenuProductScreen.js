//Importacion de modulos necesarios

import React, { useEffect, useState } from "react";

//text manda a llamar mas de un solo elemento
import { StyleSheet, Text, View, Image ,Dimensions, FlatList} from "react-native";
import { Input, Container, Item, Form, H1, Button, Header, Right, Left, Icon, Spinner, Card, CardItem, Body} from "native-base";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import backend from "../api/backend";
import getEnvVars from "../../enviroments";

const { apiKey,apiImageUrl } = getEnvVars();

//dimension poder ajustar ancho y alto de las imagenes
//width .,,, para estirarla a lo alto height * 0.30 tercio de pantalla 
//OBTENER LOS VALORES POR DESTRUCTURING:
const {width, height} = Dimensions.get("window");

//Creacion de variableas que contienen nuestra pantalla 

//variable contiene la pantalla renderizada 

//arrow function ==>
//H1 ESTILOS 
//image Para representacion de logo  
const MenuProductScreen = ({ navigation }) => {
    //maneja el estado de los productos
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(false);
    const [search, setSearch]= useState("");

    //promesas siempre deben ir dentro de un try catch

    const getProduct = async () => {
      try {
           //consulta la api de amazon product
           const response = await backend.get(`offers?min_number=5&country=US&type=LIGHTNING_DEAL&max_number=100`);

           setProduct(response.data); 
           
    } catch (error) {
        //error al momento de ejecutar la peticion a la api
        setError(true);
    }
  }

//Hook de efecto
   useEffect(() =>{
    getProduct();
   });

   if (!product ){
    return(
      <View style={{flex: 1, justifyContent : "center"}}>
      <Spinner color="red" />
      </View>
      )
  }

    return(
        <Container style={{backgroundColor: "#b90023"}}>
          <Header searchBar style={{backgroundColor: "#14BBDF"}} >
                <Item>
                    <Input placeholder="Buscar" value= {search} onChangeText={setSearch}/>
                </Item>
            <Button icon onPress={() => { navigation.navigate("resultadodebusqueda", {search})}}>
                <MaterialCommunityIcons name="shopping-search" size={24} color="black" /> 
            </Button>
        </Header>
            <H1 style={{marginTop: 10}}>PRODUCTO</H1>
            <FlatList
                data={product.offers}
                    keyExtractor={(item) => item.asin}
                    ListEmptyComponent={<Text>No se han encontrado prouctos </Text>}
                    renderItem={({ item }) => { 
                    return(
                     <View>
                       <Card style = {{backgroundColor: "transparent"}} >
                         <CardItem style={styles.CardStyle}   cardBody>
                            {
                                item.images.map((images)=>
                                <Image key={images.id} source={{uri: images}}  style={styles.productImage}></Image>
                                )  
                            }  
                         </CardItem>
                         <CardItem style={styles.CardStyle} >
                            <Text>{item.title}</Text>
                            <Text>{item.price}</Text>
                         </CardItem>
                       </Card>
                    </View>
                    )
              }}    
            />

            <Image source={require("../../assets/LOGOnet504MOVIL1.png")} 
            style={styles.imagenLogo}
            />
        </Container> 
    );
};

//Llamamos los estilos para nuestra aplicacion 

const styles = StyleSheet.create({
    container: {

        flex : 1 ,
        justifyContent: "center",
        alignItems: "center",
    },
    Input: {
        margin: 20,
    },
    imagenLogo: {
        width: 100,
        height: 100,
        //resizeMode: "center",
    },
    searchInput: {
        flex: 1,
        flexDirection: "row",
        marginTop :25,
        marginRight :15,
    },
    productImage: {
        width: width * 0.81,
        height: height * 0.35,
        margin:25,
        //resizeMode: "contain",
        //resizeMode: "center",
    },

    CardStyle: {
        marginHorizontal: 10,
        backgroundColor: "transparent",
        //resizeMode: "center",
    },

});
    

//exportacion de nuestra pantalla 

export default MenuProductScreen;

