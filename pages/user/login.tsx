import Wrapper from "@components/Wrapper/Wrapper"
import { submitLogin } from "@services/user/user";
import Link from "next/link"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.css';


const initCustomerFormData = {
    identifier: '',
    password: '',
    username: '',
    email: ''
};
const login = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<typeof initCustomerFormData>(initCustomerFormData);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const req = await submitLogin(formData);
            localStorage.setItem('NikeUser', req?.user?.username)
            router.push('/')
        } catch (error: any) {
            toast.error(error?.error.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Wrapper>
            <ToastContainer />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  md:h-[70vh] lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <img className="w-8 h-8 mr-2" src="/logo.svg" alt="logo" />
                    Nike
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login User
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    type="email"
                                    name="identifier"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={(event) =>
                                        setFormData((prev) => ({ ...prev, identifier: event.target.value }))
                                    }
                                    required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={(event) =>
                                        setFormData((prev) => ({ ...prev, password: event.target.value }))
                                    }
                                    required />
                            </div>
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Login
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already haven't an account? <Link href={"/user/resigter"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Resigter here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default login