
export interface articleType {
    category: string,
    content: string,
    createdAt: number,
    id: string,
    preview_image_url: string,
    title: string
}

export interface ResultData {

    pagesCount: number;
    itemsArray: articleType[];

}
