import React, { useEffect, useState } from "react";
import { StyleSheet , Image, Dimensions} from "react-native";
import { Card, Content, H1, Spinner, Text } from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroments";


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
            console.log(response.data);
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
       <Content>
           <H1>{product.title}</H1>
           <Card cardBody>
            {
              product.images.map((images)=>(
              <Image key={images.id} source={{uri: images}}  style={styles.productImage}></Image>
             ))  
            }  
            <Text>Description: {product.description}</Text>
            <Text>Price: {product.current_price}</Text>
           </Card>
       </Content> 
    );



};



const styles = StyleSheet.create({

    productImage: {
        width: width * 0.81,
        height: height * 0.35,
        margin:25,
        //resizeMode: "contain",
        //resizeMode: "center",
    
    },
});

export default InformacionScreen;