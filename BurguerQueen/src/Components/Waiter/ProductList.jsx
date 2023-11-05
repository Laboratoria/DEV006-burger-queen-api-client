import React from 'react';
import { useState, useEffect } from 'react';
import { requestProduct } from '../../functions/request';
import signoMas from '../../assets/simboloMas.png'
import signoMenos from '../../assets/simboloMenos.png'

function ProductList({showBreakfast,addToSelectedProducts, decreaseFromSelectedProducts}){
    const [productsData, setProductsData] = useState([]);
    
    useEffect(()=>{
        async function fetchData() {
            try{
                const productsList = await requestProduct();

                setProductsData(productsList);
            } catch(error){
                console.log('Error al obtener los datos', error)
            }
            
        }
        fetchData();
    }, []);

    function renderProductList(){
        let filteredProducts 
        if(showBreakfast){
            filteredProducts= productsData.filter(product => product.type === 'Desayuno');
           
        } else{
            filteredProducts= productsData.filter(product => product.type === 'Almuerzo');
           
        }
        return filteredProducts.map(product => (

            <div className='lg:p-5 ' key={product.id}>
            <img src={product.image} alt={product.name}  className=' lg:w-44 lg:h-44 border-4 border-secondary rounded-sm shadow-lg lg:p-2 md:w-36 md:h-32 '/>
           <div className='flex lg:mt-5'> 
            <p className='lg:text-3xl font-retro2 lg:mr-6 md:text-xl md:ml-3'>{product.name}</p>
            <p className='lg:text-3xl font-retro2 md:text-xl md:ml-2'>${product.price}</p>
            </div>
            <button onClick={()=> {addToSelectedProducts(product)}}>
                <img className='lg:w-6 lg:h-5 lg:mr-12 lg:ml-8 lg:mt-5 hover:scale-125 md:w-6 md:h-4 md:mt-3 md:ml-8 md:mb-3'  src={signoMas} alt="mas" />
            </button>
            <span>{product.quantity}</span>
            <button onClick={()=> {decreaseFromSelectedProducts(product)}}>
                <img className='lg:w-5 lg:h-2 lg:mt-mtminus hover:scale-125 md:w-4 md:h-2 md:ml-8 md:mb-3' src={signoMenos} alt="menos" />
            </button>
            
        </div>
        
        ));
    }
   
    return (
        <div className='lg:grid lg:grid-cols-2 lg:gap-20 lg:mt-10'>
            {renderProductList()}
        </div>
        
    );
}

export {ProductList};