import React, { useEffect } from "react";
import './style.css'
import Header from "../../components/header/Header";
import Body from "./components/body/Body";
import { useAppDispatch } from "../../store/hooks";
import { setFlag } from "../../store/slices/isAdmin";
import PopUp from "./components/popUp/PopUp";

function Main({ isAdmin }: { isAdmin: boolean }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setFlag(isAdmin))
    }, [isAdmin])

    return (
        <>
            {/* {isAdmin && <PopUp />} */}
            <div className="wrapper">
                <Header />
                <Body />

            </div>
        </>

    )
}

export default Main