// 베스트 셀러 paths enum
export enum Paths {
    WEEK = "0",
    MONTHLY = "2",
    YEARS = "3",
}

// 스테디 셀러 카드
export type BoardCard = {
    id: number;
    title: string;
    imageUrl: string;
    imageAlt: string;
    auth: string;
    summary: string;
    url: string;
};

// 메인 페이지 작가인터뷰
export type Interview = {
    title: string;
    detail: string;
    imageUrl: string | undefined;
    id: number;
    url: string;
};

// 검색
export type BookData = {
    title: string;
    description: string;
    image: string;
    author: string;
    isbn: string;
};

// 게시글 작성 시
export type WriteText = {
    title: string;
    content: string;
    regDate?: string;
    password?: string;
    selectedBook?: SelectedBook;
    rating?: string;
    id?: string | string[];
};

// 자유 게시글
export type FreeBoard = {
    title: string;
    regDate: string;
    content: string;
    userId: string;
    thumb: string;
    _id: string;
    count: number;
    num: number;
    password: string;
};

export type Board = {
    num: number;
    title: string;
    text: string;
    img: string;
    user: string;
    createdDate: string;
};

// 리뷰 작성 시 책 검색&책 선택

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

// 리뷰 게시글

export type ReviewPost = {
    _id: string;
    title: string;
    content: string;
    regDate: string;
    creator: string;
    userId: string;
    password?: string;
    rating?: string;
    selectedBook: {
        title: string;
        author: string;
        image: string;
        isbn: string;
    };
};

// 유저 타입

export type SignWriteText = {
    userId: string;
    password: string;
    verifyPassword?: string;
    nickname?: string;
};

export type User = {
    id: string;
    nickname: string;
    email: string;
    board: FreeBoard[];
    review: ReviewPost[];
};

export type onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
export type onSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
) => void;
export type onFormChange = (
    e: React.FormEvent<HTMLInputElement | HTMLFormElement>
) => void;
