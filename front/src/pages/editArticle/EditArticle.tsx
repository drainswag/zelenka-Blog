import React, { useEffect, useState } from "react";
import './style.css'
import Header from "../../components/header/Header";
import { useParams } from "react-router-dom";

import { articleType } from "../main/components/types";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // импортируйте стили редактора
import { getArticleInfo } from "../../components/helpers";

function EditArticle() {
    const { id } = useParams();

    const [article, setArticle] = useState<articleType>();
    const [title, setTitle] = useState<string>();
    const [content, setContent] = useState<string>();


    const fetchData = async () => {
        if (id) {
            const result = await getArticleInfo(id);
            setArticle(result)
        }
    }

    useEffect(() => {
        fetchData();
    }, [id])


    useEffect(() => {
        if (article) {
            setTitle(article.title)
            setContent(article.content)
        }
    }, [article])


    function handleChangeContent(value: string) {
        setContent(value);
        console.log(value)
    }


    const handleChange = (event: any) => {
        const inputValue = event.target.value;
        if (inputValue.length <= 90) {
            setTitle(inputValue);
        }
    };


    const editorModules = {
        toolbar: [
            ['bold', 'italic', 'underline'],

        ],
        clipboard: {
            matchVisual: false
        }
    };

    const editorFormats = [
        'underline',
        'list'
    ];

    return (

        <div className="art-wrappper">
            <Header />
            <div className="edit-article-body">

                <button className="edit-button">
                    <p>Отправить</p>
                </button>
                <input
                    type="text"
                    value={title}
                    onChange={handleChange}
                    maxLength={90}
                    className="edit-article-title"
                />
                <ReactQuill
                    value={content}
                    onChange={handleChangeContent}
                    modules={editorModules}
                    formats={editorFormats}
                />
            </div>

        </div>

    )
}

export default EditArticle