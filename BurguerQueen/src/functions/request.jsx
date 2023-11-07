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

        if(response.status === 200){
            return response.data;
            
        }
        console.log(data.accessToken)
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
      console.log(token)
      try{
    let response = await axios.get('http://localhost:8080/products',{
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` ,
      }, 
      
    })

    console.log('response',response);
    console.log('response.data',response.data)

    if(response.status === 200){
      return response.data;
    }
    console.log(response.data)
   }catch(error) {
    if(error.response){
      const status = error.response.status;
      if (status === 400) {
        throw new Error(error.response.data);
      } 
    }
   }
    }
    

export {requestGet, requestProduct};
