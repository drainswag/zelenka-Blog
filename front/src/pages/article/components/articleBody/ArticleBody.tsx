import React from "react";
import './style.css'
import { IoTimeOutline } from "react-icons/io5";
import { SlBubble } from "react-icons/sl";
import { articleType } from "../../../main/components/types";

function ArticleBody({item}:{item: articleType}) {
    return (
        <div className="article-body">
            <div className="article-info-wrapper">
                <div className="article-info">
                    <div className="info-property">
                        <div className="icon">
                            <IoTimeOutline color="gray" />
                            <p>{item.createdAt}</p>
                        </div>
                        
                    </div>
                    <h1 className="article-title">{item.title}</h1>
                </div>
                <div className="image">
                <img src={item.preview_image_url} />
                </div>
                <div className="content">
                    <p>{item.content}</p>
                </div>
            </div>

        </div>
    )
}

export default ArticleBody;

