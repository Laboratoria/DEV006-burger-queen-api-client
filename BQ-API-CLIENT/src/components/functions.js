import axios from 'axios';

export async function login(email, password) {
    const { data } = await axios.post('http://localhost:8080/login', {
        email,
        password,
    });
    return data;
};

export async function getProducts(token) {
    const response = await axios.get('http://localhost:8080/products', {
        headers: {
            Authorization: "Bearer " + token
        }
    });
    const products = response.data;
    return products;
};

export function filterByProduct(products, type) {
    const filteredProducts = products.filter((product) =>
        product.type === type
    );
    return filteredProducts
}

export async function createOrderApi(orderData, token) {
    const response = await axios.post('http://localhost:8080/orders', orderData,{
        headers: {
            Authorization: "Bearer " + token
        }
    });
    
    return response.data;
}