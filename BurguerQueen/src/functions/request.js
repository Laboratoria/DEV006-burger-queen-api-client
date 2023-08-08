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
          if(status >=400 && status<=500){
            throw new Error(error.response.data);
          }
        }
        console.log(error)
        // throw Error ('Error en la solicitud de almacenamiento de orden')
      }
    }
    

export {requestGet, requestProduct, requestPostOrder};
