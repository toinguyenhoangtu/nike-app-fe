import { useState } from 'react'

const useToggle = () => {
    const [toggle, set_toggle] = useState(false);

    const onChangeToggle = () => {
        set_toggle(prev => !prev);
    }

    return {
        toggle,
        onChangeToggle
    }
}

export default useToggle;