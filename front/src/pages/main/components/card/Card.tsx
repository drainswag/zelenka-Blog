import React from "react";
import './style.css'
import { articleType } from "../types";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SlBubble } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../store/hooks";
import { BsTrash } from "react-icons/bs";
import { RiEdit2Line } from "react-icons/ri";
// BsTrash RiEdit2Line

function Card({ item }: { item: articleType }) {

    const isAdmin = useAppSelector((state) => state.isAdmin.flag)
    return (
        <div className="article-preview">
            <Link to={`/article/${item.id}`} className="card" >
                <img src={item.preview_image_url}></img>
                <div className="card-info">
                    <div className="card-info-first-line">
                        <p>{item.category}</p>
                        <p>{item.createdAt}</p>
                        {/* <div className="comment">
                            <SlBubble color="white" size={20} />
                            <p>{item.comm}</p>

                        </div> */}

                    </div>
                    <p className="card-title">{item.title}</p>
                </div>
            </Link>
            {isAdmin &&
                <div className="settings">
                    <div className="settings-icon">

                        <BsTrash color="white" size={30} onClick={() => console.log('хуй')} />
                    </div>
                    <Link to={`/editArticle/${item.id}`} className="settings-icon">
                        <RiEdit2Line color="white" size={30} onClick={() => console.log('пизда')} />
                    </Link>
                </div>}
        </div>
    )
}

export default Card