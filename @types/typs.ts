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
