import axios from 'axios'

async function requestGet(user,password){
    const loginData = {
        email: user, 
        password: password,
    };
    try{
        let response = await axios.post('http://localhost:8080/login',loginData,{
       headers: {
        "Content-Type": "application/json",
       },
        });
        console.log('Response Data:', response.data)
        if(response.status === 200){
            return response.data;       
        }
    }  catch (error) {
        if (error.response) {
         
          const status = error.response.status;
          if (status === 400) {
            throw new Error(error.response.data);
          } 
        }
      
        throw new Error('Error en la solicitud de inicio de sesión');
      }
    }


    async function requestProduct(){   
      const token = localStorage.getItem('token'); 
      try{
    let response = await axios.get('http://localhost:8080/products',{
      headers:{
        "Content-Type": "application/json",
         "Authorization": `Bearer ${token}` ,
      }, 
      
    })

    if(response.status === 200){
      return response.data;
      
    }
   }catch(error) {
    if(error.response){
      const status = error.response.status;
      if (status >=400 && status<=500) {
        throw new Error(error.response.data);
      } 
    }
    throw new Error('Error al mostrar los productos');
   }
    }

    async function requestPostOrder(clientInfo,clientTable,selectedProducts,token) {

      const orderData={
        clientName: clientInfo,
        tableNumber: clientTable,
        products: selectedProducts,
      }
      try{
        const response = await axios.post('http://localhost:8080/orders',orderData, {
          headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` ,
          },
        });
        if(response.status === 200) {
          return response.data;
        }
        console.log('ESTA ES LA DATA DE ORDEN' + response.data)
      } catch(error) {
        if(error.response) {
          const status = error.response.status;
          if( status>=400 ){
            throw new Error(error.response.data);
          }
        }
        console.log(error)
        // throw Error ('Error en la solicitud de almacenamiento de orden')
      }
    };

    async function requestGetOrders(){
      const token = localStorage.getItem('token');
      try{
    let response = await axios.get('http://localhost:8080/orders',{
      headers:{
        "Content-Type": "application/json",
         "Authorization": `Bearer ${token}` ,
      },
    })
    if(response.status === 200){
      console.log(response.data)
      return response.data;
    }
   }catch(error) {
    if(error.response){
      const status = error.response.status;
      if (status >=400) {
        throw new Error(error.response.data);
      }
    }
    throw new Error('Error al mostrar ordenes');
   }
      };


      async function requestGetUser(){   
        const token = localStorage.getItem('token'); 
        try{
      let response = await axios.get('http://localhost:8080/users',{
        headers:{
          "Content-Type": "application/json",
           "Authorization": `Bearer ${token}` ,
        }, 
        
      })
  
      if(response.status === 200){
        return response.data;
      }
     }catch(error) {
      if(error.response){
        const status = error.response.status;
        if (status >=400 && status<=500) {
          throw new Error(error.response.data);
        } 
      }
      throw new Error('Error al mostrar los usuarios');
     }
      }

      //Función añadir usuario a la Api
      async function requestAddNewUser(newUser){   
        const token = localStorage.getItem('token'); 
        try{
      let response = await axios.post('http://localhost:8080/users',newUser,{
        headers:{
          "Content-Type": "application/json",
           "Authorization": `Bearer ${token}` ,
        }, 
        
      });
      return response.data;
    }catch(error){
      if(error.response){
        const status = error.response.status;
        if (status >= 400 && status <= 500) {
          throw new Error(error.response.data);
        }
        console.log(response.data) 
      }
      throw new Error('Error al agregar usuario');
    }
    
  
     };

     async function requestAddNewProduct(newProduct){   
      const token = localStorage.getItem('token'); 
      try{
    let response = await axios.post('http://localhost:8080/products',newProduct,{
      headers:{
        "Content-Type": "application/json",
         "Authorization": `Bearer ${token}` ,
      }, 
      
    });
    return response.data;
  }catch(error){
    if(error.response){
      const status = error.response.status;
      if (status >= 400 && status <= 500) {
        throw new Error(error.response.data);
      }
      console.log(response.data)
    }
    throw new Error('Error al agregar usuario');
  }

   };

   //Función para eliminar Productos
   async function requestDeleteProduct(productId){   
    const token = localStorage.getItem('token'); 
    try{
  let response = await axios.delete(`http://localhost:8080/products/${productId}`,{
    headers:{
       "Authorization": `Bearer ${token}` ,
    }, 
    
  });
  return response.data;
}catch(error){
  if(error.response){
    const status = error.response.status;
    if (status >= 400 && status <= 500) {
      throw new Error(error.response.data);
    }
    console.log(response.data)
  }
  throw new Error('Error al eliminar el usuario');
}

 };

       //Función para eliminar Usuarios
   async function requestDeleteUser(userId){   
    const token = localStorage.getItem('token'); 
    try{
  let response = await axios.delete(`http://localhost:8080/users/${userId}`,{
    headers:{
       "Authorization": `Bearer ${token}` ,
    }, 
    
  });
  return response.data;
}catch(error){
  if(error.response){
    const status = error.response.status;
    if (status >= 400 && status <= 500) {
      throw new Error(error.response.data);
    }
    console.log(response.data)
  }
  throw new Error('Error al eliminar el usuario');
}

 };

 //Función para actualizar datos de producto
 async function requestUpdateProduct(productId,updatedData){
  const token = localStorage.getItem('token'); 
  try{
    const response = await axios.put(`http://localhost:8080/products/${productId}`,updatedData, {
      headers: {
        "Authorization": `Bearer ${token}` ,
      },
    });
    return response.data;
  }catch(error){
    if(error.response){
      const status = error.response.status;
      if(status >=400 && status <=500){
        throw new Error(error.response.data);
      }
      console.log(response.data);
  }
  throw new Error('Error al actuallizar productos');
 }
}

 //Función para actualizar datos de usuario
 async function requestUpdateUser(userId,updateData){
  const token = localStorage.getItem('token'); 
  try{
    const response = await axios.put(`http://localhost:8080/users/${userId}`,updateData, {
      headers: {
        "Authorization": `Bearer ${token}` ,
      },
    });
    return response.data;
  }catch(error){
    if(error.response){
      const status = error.response.status;
      if(status >=400 && status <=500){
        throw new Error(error.response.data);
      }
      console.log(response.data);
  }
  throw new Error('Error al actuallizar usuarios');
 }
}

 //NUEVAS FUNCIONES
 async function sendOrderToDatabase(orderId, clientInfo, clientTable, selectedProducts, token) {
  const orderData = {
    clientName: clientInfo,
    tableNumber: clientTable,
    products: selectedProducts,
   
  };
  try {
    const response = await axios.patch(`http://localhost:8080/orders/${orderId}`, orderData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    console.log('ESTA ES LA DATA DE ORDEN', response.data);
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status >= 400) {
        throw new Error(error.response.data);
      }
    }
    console.log(error);
  }
}
//
async function requestGetCompletedOrders(){
  const token = localStorage.getItem('token');
  try{
let response = await axios.get('http://localhost:8080/orders',{
  headers:{
    "Content-Type": "application/json",
     "Authorization": `Bearer ${token}` ,
  },
})
if(response.status === 200){
  return response.data;
}
}catch(error) {
if(error.response){
  const status = error.response.status;
  if (status >=400) {
    throw new Error(error.response.data);
  }
}
throw new Error('Error al mostrar ordenes');
}
  };
    
    

export {requestGet, requestProduct, requestPostOrder, requestGetOrders, requestGetUser, requestAddNewUser, requestAddNewProduct, requestDeleteProduct, requestDeleteUser,sendOrderToDatabase, requestGetCompletedOrders,requestUpdateProduct,requestUpdateUser};
