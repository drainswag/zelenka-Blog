import { ResultData, articleType } from "../../pages/main/components/types";


export const sendRequest = async (url: string) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error("HTTP error: " + response.status);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { pagesCount: 0, itemsArray: [] };
  }
}

export const getArticles = async (page: number) => {
  let item: ResultData;
  const data = await sendRequest(`localhost:8080/api/ArticlesPagination/${page}`)
  item = data
  return item;
};

export const getArticleInfo = async (id: string) => {
  let item: articleType;
  const data = await sendRequest(`localhost:8080/api/articles/${id}`)
  item = data
  return item;
};