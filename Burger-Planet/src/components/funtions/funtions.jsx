import axios from "axios"; //realizar peticiones HTTP

export async function requestLogin(email, password) { // función asincrónica llamada que recibe dos parámetros: email y password.

    const loginData = {//objeto que contiene las propiedades email y password con los valores recibidos como parámetros.
        email: email,
        password: password,
    }

    try {
        const requestAxios = await axios.post("http://localhost:8080/login", loginData, { headers: { "content-type": "application/json", } })
        //solicitud POST a la URL "http://localhost:8080/login" enviando"loginData" como datos, y especificando el encabezado "content-type" como "application/json".
        if (requestAxios.status === 200) {
            // Si devuelve status de 200, retornamos los datos obtenidos en response.data.
            return requestAxios.data;
        }
        console.log(requestAxios);
    }
    catch (error) {
        console.log("TENEMOS ERROR", error)
    }
}