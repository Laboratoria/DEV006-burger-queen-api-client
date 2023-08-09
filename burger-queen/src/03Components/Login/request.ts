type Role = "administrador" | "mesero" | "cocina"

type User ={
  email: string
  id: number
  role: Role
}
type LoginResponse = {
  accessToken: string
  user: User 
}
async function requestGet(user: string, password: string): Promise<LoginResponse> {
  const loginData = {
    email: user,
    password: password,
  };

  try {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const data = await response.json();
      //return data.token;
      return data;
    } else {
      throw new Error("Error en la solicitud de inicio de sesión");
    }
  } catch (error) {
    throw new Error("Error en la solicitud de inicio de sesión");
  }
}

export { requestGet };