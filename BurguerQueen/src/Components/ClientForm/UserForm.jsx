
function UserForm({setUserOpenModal, handleAddUser}) {

   
    const OnSubmit = async (e) => {
       e.preventDefault();
       setUserOpenModal(false);
       const email = e.target.email.value;
       const password = e.target.password.value;
       const role = e.target.role.value;
       console.log(email,password,role)
      await handleAddUser({email, password, role});    
   }

   const onCancel = () => {
    setUserOpenModal(false)
   }
   return (
       <>
        <div className=" bg-tertiary lg:w-hForm lg:h-3/4 relative md:w-h md:h-1/3">
       <button className="absolute top-0 right-0 p-1 font-extrabold text-2xl bg-btn2 w-9"  type="button" onClick={onCancel}>X</button>
       <form className="flex flex-col" onSubmit={OnSubmit}>
      <label className="font-retro2 color-black text-center text-3xl font-extrabold mt-10" htmlFor="emailUsuario">Email del Usuario:</label>
     <input className="lg:w-4/6 lg:h-14 lg:ml-32 lg:mt-4 text-center font-retro2 text-lg md:w-5/6 md:h-14 md:ml-14" type="text"  name="email" id="emailUsuario"  />
     <label className="font-retro2 color-black text-center text-3xl font-extrabold mt-10" htmlFor="contraseñaUsuario">Contraseña</label>
     <input className="lg:w-4/6 lg:h-14 lg:ml-32 lg:mt-4 text-center font-retro2 text-lg md:w-5/6 md:h-14 md:ml-14"  type="password" name="password" id="contraseñaUsuario" />
     <label className="font-retro2 color-black text-center text-3xl font-extrabold mt-10" htmlFor="roleUsuario">Role asignado</label>
     <input className="lg:w-4/6 lg:h-14 lg:ml-32 lg:mt-4 text-center font-retro2 text-lg md:w-5/6 md:h-14 md:ml-14"  type="text" name="role" id="roleUsuario" />
      
      <div className="Flex md:mt-5 ">
       <button className=" border-4 border-black rounded-md lg:w-40 lg:h-16 text-2xl lg:mt-4 lg:ml-40 font-extrabold bg-btn1 hover:scale-125 md:w-44 md:h-14 md:ml-14" type="submit">Añadir</button>
       <button className=" border-4 border-black rounded-md lg:w-40 lg:h-16 text-2xl lg:mt-4 font-extrabold lg:ml-40 bg-btn2 hover:scale-125 md:w-44 md:h-14 md:ml-20" type="button" onClick={onCancel} >Cancelar</button>

       </div>
       </form>
       </div>
       </>
   );
}
export {UserForm};