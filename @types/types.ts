export type BoardCard = {
    title: string;
    auth: string;
    imageAlt: string;
    imageUrl: string;
    summary?: string;
    url: string;
    id: number;
};

export enum Paths {
    WEEK = "0",
    MONTHLY = "2",
    YEARS = "3",
}

export type Interview = {
    title: string;
    detail: string;
    imageUrl: string | undefined;
    id: number;
    url: string;
};

export type Board = {
    num: number;
    title: string;
    text: string;
    img: string;
    user: string;
    createdDate: string;
};

export type BookData = {
    title: string;
    description: string;
    image: string;
    author: string;
    isbn: string;
};

export type SearchResults = {
    title: string;
    description: string;
    link: string;
    image: string;
    author: string;
    publisher: string;
    pubdate: string;
    isbn: string;
};

export type SelectedBook = {
    image: string;
    title: string;
    author: string;
    isbn: string;
};
