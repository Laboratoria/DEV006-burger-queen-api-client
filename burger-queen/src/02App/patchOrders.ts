import dayjs from "dayjs";

export function completeOrder(id: number){
    const token: string = localStorage.getItem("token")!;
    console.log(token);
    return(fetch(`http://localhost:8080/orders/${id}`,{
         method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
              },
      body: JSON.stringify({
        "status": "completado",
        "dateProcessed": dayjs().format("YYYY-MM-DD HH:mm:ss"),
      }),
      })
      .then(response=>{
        return response.json();
      })
      .catch(error=>{
        console.error("red error",error)
      })
    )
  }
