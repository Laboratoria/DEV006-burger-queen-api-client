export function PostOrders(orderData: object){
  const token: string = localStorage.getItem("token")!;
  console.log(token);
  return(fetch("http://localhost:8080/orders",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
            },
    body: JSON.stringify(orderData),
    })
    .then(response=>{
      return response.json();
    })
    .catch(error=>{
      console.error("red error",error)
    })
  )
}
console.log(PostOrders)