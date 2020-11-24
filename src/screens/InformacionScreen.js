import React, { useEffect, useState } from "react";
import { StyleSheet , Image, Dimensions} from "react-native";
import { Card, Content, H1, H2, H3, Spinner, Text } from "native-base";
import backend from "../api/backend";
import { Rating } from "react-native-ratings"



const {width, height} = Dimensions.get("window");

const InformacionScreen = ({ route, navigation }) => {
    const{id} = route.params;
    const[product, setProduct] = useState(null);
    const[error, setError] = useState(false);

    //obtener la informacion de el producto
        const getProductInfo = async() => {
        try { 
            //consulta la api de amazon product
            const response = await backend.get(`product?country=US&asin=${id}`);
            setProduct(response.data);
        } catch (error) {
            setError(true);
        }
    };

 
    useEffect(() => {
        getProductInfo();
    }, []);

    if (!product){
        return(
            <Content>
                <Spinner />
            </Content>
        );
    }

    return(
       <Content style={styles.contenido}>
           <H1 style={{ color: 'white' }}>{product.title}</H1>
           <Card style = {{backgroundColor: "transparent"}} cardBody>
            {
              product.images.map((images)=>(
              <Image key={images.id} source={{uri: images}}  style={styles.productImage}></Image>
             ))  
            }
            <H2 style = {styles.h2}> Description: </H2>  
            <Text>{product.description} </Text>
            <Text style={[styles.bigBlue]} >Price: {product.prices.current_price}$</Text>
            <H3 style= { styles.h3 }> Rating: {product.reviews.stars} </H3>
            <Rating
                showRating={false}
                ratingCount={5}
                startingValue={product.reviews.stars}
                readonly={true}
                imageSize={15}
                style={{ margin : 5 }}
              />
           </Card>
       </Content> 
    );



};



const styles = StyleSheet.create({

    productImage: {
        width: width * 0.81,
        height: height * 0.35,
        margin:25,
        resizeMode: "contain"
        //resizeMode: "center",
    
    },

    contenido:{
        backgroundColor: "#b90023",
    },

    h2:{
        marginTop:10,
        marginBottom:10,

    },

    bigBlue: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },

    h3:{
        textAlign: "center",
        marginTop: 8,
        fontWeight: 'bold',

    }
});

export default InformacionScreen;