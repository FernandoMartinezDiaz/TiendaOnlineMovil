//Importacion de modulos necesarios

import React, { useEffect, useState } from "react";

//text manda a llamar mas de un solo elemento
import { StyleSheet, Text, View, Image ,Dimensions, FlatList} from "react-native";
import { Input, Container, Item, H1, Button, Header, Spinner, Card, CardItem} from "native-base";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import backend from "../api/backend";
import getEnvVars from "../../enviroments";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SocialIcon } from 'react-native-elements';

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
    const [searchError, setSearchError]= useState(false);

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

  
  const handlerSearch = () => {
    if (!search) setSearchError(true);
    else {
         navigation.navigate("resultadodebusqueda", {search});
      setSearch("");
      setSearchError(false);
    }
  };

//Hook de efecto
   useEffect(() =>{
    getProduct();
   }, []);

   if (!product ){
    return(
      <View style={{flex: 1, justifyContent : "center"}}>
      <Spinner color="red" />
      </View>
      )
  }

    return(
        <Container style={{backgroundColor: "#b90023"}}>
          <Header searchBar style={{backgroundColor: "#1034A6"}} androidStatusBarColor="#004e64" >
                <Item style={{ flex: 3 }}>
                    <Input placeholder={
                        searchError ? "Ingresa un valor de búsqueda" : "Buscar..."
                        }
                            placeholderTextColor={searchError ? "red" : "gray"}
                            value={search}
                            onChangeText={setSearch}
                    />
                </Item>
            <Button icon onPress={ handlerSearch } style={styles.searchButton}>
                <MaterialCommunityIcons name="shopping-search" size={24} color="black" /> 
            </Button>
        </Header>
            <H1 style={{margin : 10 }}>PRODUCTOS EN OFERTAS</H1>
            <FlatList
                data={product.offers}
                    keyExtractor={(item) => item.asin}
                    ListEmptyComponent={<Text>No se han encontrado productos</Text>}
                    renderItem={({ item }) => { 
                    return(
                     <View>
                       <TouchableOpacity onPress={() => navigation.navigate("productinfo" ,{id: item.asin})}>
                            <Card style = {{backgroundColor: "transparent"}} >
                                <CardItem style={styles.CardStyle}   cardBody>
                                    {
                                        item.images.map((images,index) => (
                                        <Image key={images.id} source={{uri: images}}  style={styles.productImage}></Image>
                                        ))  
                                    }  
                                </CardItem>
                                <CardItem style={styles.CardStyle} >
                                    <Text>{item.title}</Text>
                                </CardItem>
                                <CardItem>
                                    <Text >  Price: {item.prices.current_price}$</Text>
                                </CardItem>
                            </Card>
                      </TouchableOpacity>
                    </View>
                    )
              }}    
            />

            <Image source={require("../../assets/LOGOnet504MOVIL1.png")} 
            style={styles.imagenLogo}
            />
            

            <SocialIcon style={styles.iconos} 
                type='facebook'
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
        flexDirection: "column",
        marginTop :10,
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

    searchButton: {
        flex: 1,
        backgroundColor: "#14BBDF",
        marginLeft: 10,
        height: 40,
    },

    iconos: {
        marginLeft: 350,
    
    }



});
    

//exportacion de nuestra pantalla 

export default MenuProductScreen;

