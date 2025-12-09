import React, { useState } from 'react'

const inputField = ({type, placeholder, icon, value, onChange, name}) => {

    // State to toggle password visibility
    const [isPasswordShown, setisPasswordShown] = useState(false);

  return (
    <div className="input-wrapper">
        <input type={isPasswordShown ? 'text' : type} placeholder={placeholder} value={value} onChange={onChange} name={name} className="input-field" required />
        <i class="material-symbols-rounded">{icon}</i>
        {type === 'password' && (
            <i onClick={() => setisPasswordShown(prevState => !prevState)} class="material-symbols-rounded eye-icon">{isPasswordShown ? 'visibility' : 'visibility_off'}</i>
        )}
    </div>
  )
}

export default inputField