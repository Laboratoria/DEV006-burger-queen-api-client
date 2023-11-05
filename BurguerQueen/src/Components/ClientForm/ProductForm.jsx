function ProductForm({setProductOpenModal,handleAddNewProduct}) {

   
    const OnSubmit = async (e) => {
       e.preventDefault();
       setProductOpenModal(false)
       const name = e.target.name.value;
       const price = e.target.price.value;
       const image = e.target.image.value;
       const type = e.target.type.value;
      await handleAddNewProduct({name,price,image, type}) ;
   }

   const onCancel = () => {
    setProductOpenModal(false)
   }
   return (
       <>
        <div className=" bg-tertiary lg:w-hForm lg:h-4/5 relative md:w-h md:h-1/3">
       <button className="absolute top-0 right-0 p-1 font-extrabold text-2xl bg-btn2 w-9"  type="button" onClick={onCancel}>X</button>
       <form className="flex flex-col" onSubmit={OnSubmit}>
      <label className="font-retro2 color-black text-center text-2xl font-extrabold mt-7" htmlFor="nombreProducto">Producto:</label>
     <input className="lg:w-4/6 lg:h-11 lg:ml-32 lg:mt-4 text-center font-retro2 text-lg md:w-5/6 md:h-14 md:ml-14" type="text" name="name"  id="nombreProducto"  />
     <label className="font-retro2 color-black text-center text-2xl font-extrabold mt-10" htmlFor="precio">Precio:</label>
     <input className="lg:w-4/6 lg:h-11 lg:ml-32 lg:mt-4 text-center font-retro2 text-lg md:w-5/6 md:h-14 md:ml-14"  type="text" name="price" id="price" />
     <label className="font-retro2 color-black text-center text-2xl font-extrabold mt-10" htmlFor="categoria">Categoría:</label>
     <input className="lg:w-4/6 lg:h-11 lg:ml-32 lg:mt-4 text-center font-retro2 text-lg md:w-5/6 md:h-14 md:ml-14"  type="text" name="type" id="categoria" />
     <label className="font-retro2 color-black text-center text-2xl font-extrabold mt-10" htmlFor="image">URL de la imagen:</label>
     <input className="lg:w-4/6 lg:h-11 lg:ml-32 lg:mt-4 text-center font-retro2 text-lg md:w-5/6 md:h-14 md:ml-14"  type="text" name="image" id="image" />
      <div className="Flex md:mt-5 ">
       <button className=" border-4 border-black rounded-md lg:w-40 lg:h-16 text-2xl lg:mt-2 lg:ml-40 font-extrabold bg-btn1 hover:scale-125 md:w-44 md:h-14 md:ml-14" type="submit">Añadir</button>
       <button className=" border-4 border-black rounded-md lg:w-40 lg:h-16 text-2xl lg:mt-2 font-extrabold lg:ml-40 bg-btn2 hover:scale-125 md:w-44 md:h-14 md:ml-20" type="button" onClick={onCancel} >Cancelar</button>
 
       </div>
       </form>
       </div>
       </>
   );
}
export {ProductForm};