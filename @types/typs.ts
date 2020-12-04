export type BoardCard = {
    title: string;
    auth: string;
    imageAlt: string;
    imageUrl: string;
    summary: string;
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
