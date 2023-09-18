import React, { useEffect, useState } from "react";
import './style.css'
import Card from "../card/Card";
import { ResultData, articleType } from "../types";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import Pagination from "../../../../components/pagination/Pagination";
import { setPageCount } from "../../../../store/slices/pagination";

function Body() {

  const [articles, setArticles] = useState<articleType[]>([]);
  const page = useAppSelector((state) => state.paginationPages.currentPage)
  const dispatch = useAppDispatch()

  const sendRequest = async (url: string) => {
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

  const getArticles = async (page: number) => {
    let item: ResultData;
    const data = await sendRequest(`{}/api/ArticlesPagination/${page}`)
    // console.log(data)
    item = data
    return item;
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getArticles(page);
      console.log(result)
      setArticles(result.itemsArray)
      dispatch(setPageCount(result.pagesCount))
      // dispatch(getPageCount(result.pagesCount))
    }
    fetchData();
  }, [page])

  return (
    <div className="body">
      <div className="info-wrapper">
        {articles.map((item) =>
          <Card key={item.id} item={item} />
        )}
      </div>
      <Pagination />
    </div>
  )
}

export default Body