import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //ao dar submit será pego o cadastro de admin criado no backend e rapassará para  em api/user/admin
    useEffect(() => {
        if (setToken) {
            localStorage.setItem('token', setToken);
        } else {
            localStorage.removeItem('token'); // Remove o token do localStorage ao fazer logout
        }
    }, [setToken]);

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
            if (response.data.success) {
                setToken(response.data.token)

            } else {
                toast.error(response.data.message)
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    };

    return (
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
                <h1 className='text-2x1 font-bold mb-4'>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 min-w-72'>

                        <p className='text-sm font-medium text-gray-700 mb-2'>Endereço de Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='seu@email.com' required />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Senha</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='sua senha' required />
                    </div>
                    <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>Login</button>
                </form>
            </div>

        </div>
    )
}

export default Login