import axios from "axios";
import { requestGet, requestPostOrder, requestProduct } from "./functions/request";
import 'jest-localStorage-mock'

 jest.mock("axios");




// TEST PARA REQUESTGET
describe('requestGet function', ()=>{
    it('It should send a login request and return response data', async ()=>{
        //Defino los datos de prueba 
        const user= 'valentina.prueba@gmail.com';
        const password= 'valentina123';

        const loginData = {
            email: user, 
            password: password,
        };
        const dataReturn = {
         responseData: {
         accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbGVudGluYS5wcnVlYmFAZ21haWwuY29tIiwiaWF0IjoxNjkxMTY2ODMzLCJleHAiOjE2OTExNzA0MzMsInN1YiI6IjQifQ.HrbEKrGwsrQfylEqlyDYPH9_3NqRpNA3wt3a8jg-acY",
         user: "valentina.prueba@gmail.com",
         role: "waiter",
         id: "4"
          }
          };
          //Configurar mock de axios que simule una respuesta exitosa
          axios.post.mockResolvedValueOnce({data:dataReturn,status:200});

          //Llamar a la función que se testea
          const result = await requestGet(user,password);
          //Verficar que se haya llamado a axios.post con los parámetros esperados
          expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:8080/login',
            loginData,
            {
                headers: {
                    "Content-Type": "application/json",
                   },
            }
          );
         expect(result).toEqual(dataReturn)
    });

    //Test para error 400
    it('should throw message "cannot find user" when status response id 400 and it corresponds to that error', async ()=>{
       axios.post = jest.fn().mockRejectedValueOnce({
        response: {
            status: 400,
            data: 'cannot find user',
        },
       });
       await expect(requestGet('usuario','contraseña')).rejects.toThrow('cannot find user');
    });

    it('should throw message "Email and password are required" cwhen status response id 400 and it corresponds to that error', async ()=>{
        axios.post = jest.fn().mockRejectedValueOnce({
         response: {
             status: 400,
             data: "Email and password are required",
         },
        });
        await expect(requestGet('usuario','contraseña')).rejects.toThrow("Email and password are required");
     });
     it('should throw message "Incorrect password" when status response id 400 and it corresponds to that error', async ()=>{
        axios.post = jest.fn().mockRejectedValueOnce({
         response: {
             status: 400,
             data: "Incorrect password",
         },
        });
        await expect(requestGet('usuario','contraseña')).rejects.toThrow("Incorrect password");
     });
     it('should throw message "Email and password are required" when status response id 400 and it corresponds to that error', async ()=>{
        axios.post = jest.fn().mockRejectedValueOnce({
         response: {
             status: 400,
             data: "Email and password are required",
         },
        });
        await expect(requestGet('usuario','contraseña')).rejects.toThrow("Email and password are required");
     });
     it('should throw message "Error en la solicitud de inicio de sesión"when the error is not controlled', async ()=>{
        axios.post = jest.fn().mockRejectedValueOnce(new Error('Network error'));

        await expect(requestGet('usuario','contraseña')).rejects.toThrow("Error en la solicitud de inicio de sesión");
     });
});

//TEST PARA REQUEST PRODUCT
describe('requestProduct function', ()=>{
    it('Should return product data when logging into the waiter view and status response is 200', async ()=>{
        //Defino los datos de prueba 
        // const loginData = {
        //     email: user, 
        //     password: password,
        //     role: 'waiter'
        // };
        const token = localStorage.getItem('token'); 
        const dataReturnProducts = {
                "name": "Agua",
                "price": 2,
                "image": "https://github.com/ValenParaguatey/DEV006-burger-queen-api-client/blob/main/BurguerQueen/src/assets/agua.png?raw=true",
                "type": "Desayuno",
                "dateEntry": "2022-03-05 15:14:10",
                "id": 1    
          };

          //Configurar mock de axios que simule una respuesta exitosa
          axios.get.mockResolvedValueOnce({data:dataReturnProducts,status:200});

          //Llamar a la función que se testea
          const resultProducts = await requestProduct();
          //Verficar que se haya llamado a axios.post con los parámetros esperados
          expect(axios.get).toHaveBeenCalledWith(
            'http://localhost:8080/products',
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                   },
            }
          );
         expect(resultProducts).toEqual(dataReturnProducts)
    });

    it('should throw message "jwt expired" when status response id >=400 and <=500 and it corresponds to that error', async ()=>{
        axios.get = jest.fn().mockRejectedValueOnce({
         response: {
             status: 401,
             data: "jwt expired",
         },
        });
        await expect(requestProduct()).rejects.toThrow("jwt expired");
     });

     it('should throw message "Missing authorization header" when status response id >=400 and <=500 and it corresponds to that error', async ()=>{
        axios.get = jest.fn().mockRejectedValueOnce({
         response: {
             status: 403,
             data: "Missing authorization header",
         },
        });
        await expect(requestProduct()).rejects.toThrow("Missing authorization header");
     });

     it('should throw message "Error al mostrar los productos" when the error is not controlled', async ()=>{
        axios.get = jest.fn().mockRejectedValueOnce(new Error('Network error'));

        await expect(requestProduct()).rejects.toThrow('Error al mostrar los productos');
     });
});; 
 
//TEST PARA REQUEST PRODUCT ORDER
describe('requestPostOrder function', () => {
  
  beforeEach(() => {
    localStorage.clear();
    axios.post.mockReset()
  });

 

  const clientInfo = "John Doe";
  const clientTable = 5;
  const selectedProducts = ["Burger", "Fries"];
 const token = localStorage.getItem('token');  // Replace this with your actual token or mock it using jest.mock

 
  it('should send a post request to create an order and return response data', async () => {
    const orderData = {
      clientName: clientInfo,
      tableNumber: clientTable,
      products: selectedProducts,
    };

    const responseData = { orderId: '12345', status: 'success' };

    axios.post.mockResolvedValueOnce({ data: responseData, status: 200 });

    const result = await requestPostOrder(clientInfo, clientTable, selectedProducts,token);
    console.log('AQUIII', result)
    console.log(token)

    expect(result).toEqual(responseData);

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/orders',
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization":  `Bearer ${token}`,
        },
        
      }
    );
   });



  it('should throw a generic error when status response is not between 400 and 500', async () => {
    axios.post.mockRejectedValueOnce({
      response: { status: 503, data: 'Error en la solicitud de almacenamiento de orden' },
    });

    await expect(requestPostOrder(clientInfo, clientTable, selectedProducts,token)).rejects.toThrow(
      'Error en la solicitud de almacenamiento de orden'
    );

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/orders',
      {
        clientName: clientInfo,
        tableNumber: clientTable,
        products: selectedProducts
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  });
});

//   it('should throw an error with the response data when status response is between 400 and 500', async () => {
//     const responseData = { message: 'Invalid data' };
//     const status = 400;

//     axios.post.mockRejectedValueOnce({
//       response: {
//         status,
//         data: responseData,
//       },
//     });

//     await expect(requestPostOrder(clientInfo, clientTable, selectedProducts, token)).rejects.toEqual(responseData);
//     expect(axios.post).toHaveBeenCalledWith(
//       'http://localhost:8080/orders',
//       {
//         clientName: clientInfo,
//         tableNumber: clientTable,
//         products: selectedProducts,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//   });