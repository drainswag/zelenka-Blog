import React, { useEffect, useState } from "react";
import './style.css'
import Header from "../../components/header/Header";
import ArticleBody from "./components/articleBody/ArticleBody";
import { useParams } from "react-router-dom";
import { articleType } from "../main/components/types";
import { getArticleInfo } from "../../components/helpers";

function Article() {
    const { id } = useParams();
    const [article, setArticle] = useState<articleType>();

    const fetchData = async () => {
        if (id) {
            const result = await getArticleInfo(id);
            setArticle(result)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="art-wrappper">
            <Header />
            {article && <ArticleBody item={article} />}
        </div>
    )
}

export default Article;