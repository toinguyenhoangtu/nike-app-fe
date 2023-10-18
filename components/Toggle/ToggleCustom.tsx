import { useEffect, useState } from "react";
import useToggle from "@hooks/useToggle";


interface toggleProp {
    setClassChange: any
}
export const ToggleCustom = ({ setClassChange }: toggleProp) => {
    const [transition, setTransition] = useState('transition-all')
    const { toggle, onChangeToggle } = useToggle();

    useEffect(() => {
        setClassChange(toggle ? 'lg:grid-cols-2' : 'lg:grid-cols-4');
    }, [toggle, setClassChange])
    const handleClick = () => {
        setTransition(
            prevTransition => prevTransition === 'transition-all' ? 'translate-x-8' : 'transition-all'
            );
        onChangeToggle();
    }
    useEffect(() => {
        setTransition
    }, [])
    return (
        <div className='relative z-[1]'>
            <div className='mb-0 bg-white md:mb-3 md:flex md:bg-transparent'>
                <div className='border-stroke-disable items-center border-b px-4 py-3 md:flex md:border-b-0 md:px-0 md:py-0 flex'>
                    <h2 className='text-gray-800 font-bold'>Danh sách sản phẩm</h2>
                </div>
                <div className='flex items-center px-4 py-3 md:ml-auto md:px-0 md:py-0'>
                    <button
                        className='border-stroke-default h-[32px] w-[64px] rounded-2xl border p-[1px] hidden md:ml-4 md:block'
                        onClick={handleClick}
                    >
                        <span className='relative isolate flex items-center justify-between'>
                            <span className={`bg-gray-300 absolute inline-block h-7 w-7 rounded-full transition-all ${transition}`}></span>
                            <span className='text-gray-700 z-10 p-1'>
                                <svg height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 11C8.32843 11 9 11.6716 9 12.5V16.5C9 17.3284 8.32843 18 7.5 18H3.5C2.67157 18 2 17.3284 2 16.5V12.5C2 11.6716 2.67157 11 3.5 11H7.5ZM16.5 11C17.3284 11 18 11.6716 18 12.5V16.5C18 17.3284 17.3284 18 16.5 18H12.5C11.6716 18 11 17.3284 11 16.5V12.5C11 11.6716 11.6716 11 12.5 11H16.5ZM7.5 2C8.32843 2 9 2.67157 9 3.5V7.5C9 8.32843 8.32843 9 7.5 9H3.5C2.67157 9 2 8.32843 2 7.5V3.5C2 2.67157 2.67157 2 3.5 2H7.5ZM16.5 2C17.3284 2 18 2.67157 18 3.5V7.5C18 8.32843 17.3284 9 16.5 9H12.5C11.6716 9 11 8.32843 11 7.5V3.5C11 2.67157 11.6716 2 12.5 2H16.5Z" fill="currentColor"></path></svg>

                            </span>
                            <span className='text-gray-700 z-10 p-1'>
                                <svg height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.14286 6.85714C7.14286 7.33053 6.7591 7.71429 6.28571 7.71429C5.81233 7.71429 5.42857 7.33053 5.42857 6.85714C5.42857 6.38376 5.81233 6 6.28571 6C6.7591 6 7.14286 6.38376 7.14286 6.85714ZM6.28571 11.1429C6.7591 11.1429 7.14286 10.7591 7.14286 10.2857C7.14286 9.81233 6.7591 9.42857 6.28571 9.42857C5.81233 9.42857 5.42857 9.81233 5.42857 10.2857C5.42857 10.7591 5.81233 11.1429 6.28571 11.1429ZM7.14286 13.7143C7.14286 14.1877 6.7591 14.5714 6.28571 14.5714C5.81233 14.5714 5.42857 14.1877 5.42857 13.7143C5.42857 13.2409 5.81233 12.8571 6.28571 12.8571C6.7591 12.8571 7.14286 13.2409 7.14286 13.7143ZM9.42857 6.57143C9.11298 6.57143 8.85714 6.82727 8.85714 7.14286C8.85714 7.45845 9.11298 7.71429 9.42857 7.71429H14C14.3156 7.71429 14.5714 7.45845 14.5714 7.14286C14.5714 6.82727 14.3156 6.57143 14 6.57143H9.42857ZM8.85714 10.5714C8.85714 10.2558 9.11298 10 9.42857 10H14C14.3156 10 14.5714 10.2558 14.5714 10.5714C14.5714 10.887 14.3156 11.1429 14 11.1429H9.42857C9.11298 11.1429 8.85714 10.887 8.85714 10.5714ZM9.42857 13.4286C9.11298 13.4286 8.85714 13.6844 8.85714 14C8.85714 14.3156 9.11298 14.5714 9.42857 14.5714H14C14.3156 14.5714 14.5714 14.3156 14.5714 14C14.5714 13.6844 14.3156 13.4286 14 13.4286H9.42857ZM2 4.28571C2 3.02335 3.02335 2 4.28571 2H15.7143C16.9767 2 18 3.02335 18 4.28571V15.7143C18 16.9767 16.9767 18 15.7143 18H4.28571C3.02335 18 2 16.9767 2 15.7143V4.28571ZM4.28571 3.14286C3.65453 3.14286 3.14286 3.65453 3.14286 4.28571V15.7143C3.14286 16.3455 3.65453 16.8571 4.28571 16.8571H15.7143C16.3455 16.8571 16.8571 16.3455 16.8571 15.7143V4.28571C16.8571 3.65453 16.3455 3.14286 15.7143 3.14286H4.28571Z" fill="currentColor"></path></svg>

                            </span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

