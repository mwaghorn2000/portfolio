export interface BlogPost {
    _id: string;
    title: string;
    content: string;
    author: string;
    likes: number;
    datePublished: Date;
}