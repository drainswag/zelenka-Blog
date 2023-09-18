import React from "react";
import './style.css'
import { useAppSelector } from "../../store/hooks";

function Header() {
    const isAdmin = useAppSelector((state)=>state.isAdmin.flag)
    return (
        <div className="header">
            <div className="header-wrapper">
                <div className="logo-wrapper">
                    <p>zelenka.com</p>
                </div>
                <nav className="menuContainer">
                    <ul className="menu">
                        {isAdmin && <li><a href='/newArticle' aria-current="page">Создать cтатью</a></li>}
                        
                    </ul>
                </nav>
            </div>

        </div>
    )
}

export default Header