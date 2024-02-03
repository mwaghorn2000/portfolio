interface ThumbnailContentProp {
    title: string;
    author: string;
    datePublished: Date;
    likes: number;
}

export const PostThumbNail: React.FC<ThumbnailContentProp> = ({
    title,
    author,
    datePublished,
    likes
}) => {
    return (
        <>
            <div className="border-b-lime-600 border-t-0 border-x-0  last:border-none border-[2px] p-3 hover:bg-slate-100 first:rounded-t-2xl last:rounded-b-2xl">
                <div className="inline-block w-2/3">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <h3>{author}</h3>
                </div>
                <div className="inline-block text-right w-1/3">
                    <p>Likes: {likes}</p>
                </div>
                
            </div>
        </>
    )
}