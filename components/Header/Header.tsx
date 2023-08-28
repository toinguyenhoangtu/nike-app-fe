import { useState } from "react";
import Link from "next/link"
import Wrapper from "../Wrapper/Wrapper";
export const Header = (): JSX.Element => {

  const [show, setShow] = useState("translate-y-0");
  return (
    <header className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}>
      <Wrapper className='h-[60px] flex justify-between items-center'>
        
      </Wrapper>  
    </header>
  )
}
