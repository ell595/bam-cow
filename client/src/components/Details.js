import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Heading, Text, Flex, Grid, Image, GridItem, Box, Button} from '@chakra-ui/react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react';

import { parse } from 'dotenv';


const Details = ({id}) => {
    const { product_id } = useParams();
    const [product, setProduct] = useState("");

    const addToCart = async () => {

        try {
            console.log(id)
            const body = {id, product_id};
            const response = await fetch(`http://localhost:3000/cart/`, {
               method: "POST", 
               headers: {"Content-Type": "application/json"},
               body: JSON.stringify(body)
           });

           const parseRes = response.json();
           console.log(response.status);

        } catch (err) {
            console.error(err.message);
        }
    };


    const getProduct = async () => {
        try {
            const response = await fetch(`http://localhost:3000/products/id?id=${product_id}`, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });

            const parseRes = await response.json();
            console.log(parseRes);
            setProduct(parseRes);
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getProduct();
    },[]);


    return (
        <Fragment>
            <Flex className="jumbotron" align="center" justify="space-center" flexDir="column">
                <Heading display="block">{product.name}</Heading>
            </Flex>
            <Flex align="center" justify="space-around">
            <Container maxW="container.xl" m={6} centerContent w="100%">
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                <GridItem colSpan={2}>
                    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
                        <Image src={`../images/${product.img}`} alt={`${product.name} Candle`} boxSize="100%" maxHeight={"600px"}></Image>
                    </Box>
                </GridItem>
                <GridItem colSpan={1}>
                    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" height="50%">
                        <Flex flexDir="column" align="center" justify="space-between" height="100%">
                            <Text as="b" color="#33594b" fontSize="4xl">{product.price}</Text>
                            <Text as="b" color="#33594b" fontSize="2xl">In Stock</Text>
                            <Button onClick={addToCart} variant="solid" color="#f19953" w="100%">Add to Cart</Button>
                        </Flex>
                    </Box>
                </GridItem>
                <GridItem colSpan={3}>
                    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Accordion MaxW="100%">
                        <AccordionItem>
                            <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left'>
                                    Product Details
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Text>{product.description}</Text>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left'>
                                Customer Reviews
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                            No one has left a reivew yet!
                            </AccordionPanel>
                        </AccordionItem>
                        </Accordion>
                    </Box>
                </GridItem>
            </Grid>
            </Container>
            </Flex>
        </Fragment>
    );
};

export default Details;