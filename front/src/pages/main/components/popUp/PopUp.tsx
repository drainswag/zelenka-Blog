import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import "./style.css"

function PopUp() {
    const popupRef = useRef<HTMLDivElement>(null);
    const inputLoginRef = useRef<HTMLInputElement>(null);
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const [login, setLogin] = useState<string>();
    const [password, setPassword] = useState<string>();
    const dispatch = useDispatch();

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (login && password && inputLoginRef.current && inputPasswordRef.current && popupRef.current)
                if (login.length < 3 || login.includes(' ')) {
                    inputLoginRef.current.value = ''
                    inputLoginRef.current.placeholder = 'incorrect value'
                    inputPasswordRef.current.value = ''
                    inputPasswordRef.current.placeholder = 'incorrect value'
                }else{
                    popupRef.current.style.display = 'none';
                    console.log(login, password)
                    //вот тут отпраляю данные
                }
           

        }
    };

    return (
        <div className="popup-bg" ref={popupRef}>
            <div className="popup">

                <input
                    type="text"
                    ref={inputLoginRef}
                    onKeyPress={handleKeyPress}
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                    placeholder="login..."
                    minLength={3}
                    maxLength={16}
                    pattern="^[a-zA-Z0-9]"
                    required
                />
                <input
                    type="password"
                    ref={inputPasswordRef}
                    onKeyPress={handleKeyPress}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="password..."
                    minLength={6}
                    maxLength={20}
                    required
                />
            </div>
        </div>
    );
}

export default PopUp;