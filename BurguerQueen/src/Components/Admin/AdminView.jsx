import LogoBQ from '../../assets/LogoBQ.png';
import { requestAddNewUser, requestAddNewProduct, requestGetUser } from '../../functions/request'
import { useState, useEffect } from 'react'
import { Modal } from '../Modal/Modal';
import { UserForm } from '../ClientForm/UserForm';
import { ProductForm } from '../ClientForm/ProductForm';
import { ViewProducts } from './viewProducts'
import { ViewUsers } from './viewUsers'
import { Link } from 'react-router-dom';


function AdminView() {
  const [openUserModal, setUserOpenModal] = useState(false);
  const [openProductModal, setProductOpenModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [productData, setProductData] = useState([])

  
  useEffect(() => {
    async function fetchData() {
        try {
            const ViewUsers = await requestGetUser();
            setUserData([...userData, ...ViewUsers]);
        } catch (error) {
            console.log('Error al obtener los datos', error)
        }
    }
    fetchData();
}, []);


  const handleAddUser = async ({ email, password, role }) => {
    console.log(email, password, role)
    const newUser = {
      email: email,
      password: password,
      role: role
    };
    try {
      const response = await requestAddNewUser(newUser);
      setUserData([...userData, response.user]);
      console.log('Nuevo usuario creado:', response);
      console.log(userData)
    } catch (error) {
      console.log('Error', error)
    }
  }
  const handleAddNewProduct = async ({ name, price, image, type }) => {
    const newProduct = {
      name: name,
      price: price,
      image: image,
      type: type

    };
    try {
      const response = await requestAddNewProduct(newProduct);
      setProductData([...productData, response]);
      console.log('producto creado', response);
    } catch (error) {
      console.log('Error', error);
    }
  }


  return (
    <section className=' bg-black text-white '>
      <nav className=' bg-primary lg:h-28 flex justify-between text-black sm:w-full sm:h-20 font-bold'>
        <div className='  lg:h-24 lg:w-28 sm:h-32  sm:w-44   '>
          <img className='' src={LogoBQ} alt="logo" />
        </div>

        <ul className=' flex lg:h-16 mt-8 lg:w-hForm mr-36 sm:h-9 sm:w-80 sm:ml-24 sm:justify-around bg-blue '>
        <Link to='/ReadyToServe' className='lg:mb-20 sm:mb-24 border-red-600 lg:text-3xl font-retro2 lg:mr-20 md:text-lg md:-ml-36'>Ordenes Listas</Link>
          
          <li className='lg:mb-20 sm:mb-24 border-red-600 lg:text-3xl font-retro2 lg:mr-20 md:text-lg'>Historial de Ordenes</li>
        </ul>
      </nav>
      <div className='Buttons border-black flex lg:justify-evenly lg:mt-14 md:mt-10 md:justify-between'>
        <button onClick={() => setUserOpenModal(true)} className='lg:mr-60 font-bold border-4 border-secondary rounded-sm shadow-lg hover:scale-125 lg:p-4 lg:text-xl font-retro1 md:ml-3'>Nuevo Usuario</button>
        {openUserModal && (
          <Modal>
            <UserForm setUserOpenModal={setUserOpenModal} handleAddUser={handleAddUser} />
          </Modal>
        )}
        <button onClick={() => setProductOpenModal(true)} className='border-4 border-tertiary rounded-sm shadow-lg lg:-mr-4 lg:p-4 font-bold lg:text-xl font-retro1 hover:scale-125'>Nuevo Producto</button>
        {openProductModal && (
          <Modal>
            <ProductForm setProductOpenModal={setProductOpenModal} handleAddNewProduct={handleAddNewProduct} />
          </Modal>
        )}
      </div>
      <section className='lg:grid lg:grid-cols-2 lg:gap-20 lg:mt-7'>
        <article className='lg:mt-10 lg:ml-9'>
          <ViewUsers userData={userData} setUserData={setUserData} />
        </article>
        <article className='lg:mt-7 lg:mr-12'>
          <ViewProducts productData={productData} setProductData={setProductData} />
        </article>
      </section>

    </section >

  )
}
export { AdminView };