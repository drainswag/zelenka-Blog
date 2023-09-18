import React, { useEffect, useState } from "react";
import './style.css'
import Header from "../../components/header/Header";
import ArticleBody from "../article/components/articleBody/ArticleBody";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // импортируйте стили редактора

function NewArticle() {
    const [title, setTitle] = useState<string>();
    const [urlImg, setUrlImg] = useState<string>();
    const [content, setContent] = useState<string>();

    function handleChangeContent(value: string) {
        setContent(value);
    }


    const handleChange = (event: any) => {
        const inputValue = event.target.value;
        if (inputValue.length <= 90) {
            setTitle(inputValue);
        }
    };

    function handleChangeUrl(event: any) {
        const inputValue = event.target.value;
        setUrlImg(inputValue)
    }


    const editorModules = {
        toolbar: [
            ['bold', 'italic', 'underline'],

        ],
        clipboard: {
            matchVisual: false
        }
    };

    const editorFormats = [
        'bold',
        'italic',
        'underline',
        'list'
    ];

    const editorConfig = {
        placeholder: 'Введите текст статьи...'
    };

    function getCurrentDate() {
        const currentDate = new Date();
      
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
      
        const formattedDate = `${year}-${month}-${day}`;
      
        return formattedDate;
      }


    const handleSubmit = async () => {
       
        try {
          const articleData = {
            title: title,
            date: getCurrentDate(),
            preview_image_url: urlImg,
            content: content,
          };
          console.log(articleData)
    
          const response = await fetch("localhost:8080/api/articles", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(articleData),
          });
    
          if (response.ok) {
            console.log("Article created successfully");
        
            setTitle("");
            setUrlImg("");
            setContent("");
          } else {
            console.error("Error creating article:", response.statusText);
          }
        } catch (error) {
          console.error("Error creating article:", error);
        }
      };

    return (

        <div className="art-wrappper">
            <Header />
            <div className="new-article-body">

                <button className="edit-button" onClick={handleSubmit}>
                    <p>Отправить</p>
                </button>
                <input
                    type="text"
                    value={title}
                    onChange={handleChange}
                    maxLength={90}
                    className="new-article-title"
                    placeholder="Название статьи"
                />

                <input
                    type="text"
                    value={urlImg}
                    onChange={handleChangeUrl}
                    className="new-article-photo"
                    placeholder="Ссылка на фото"
                />

                <ReactQuill
                    value={content}
                    onChange={handleChangeContent}
                    modules={editorModules}
                    formats={editorFormats}
                    {...editorConfig}
                />
            </div>

        </div>

    )
}

export default NewArticle