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
            <div className="border-lime-600 rounded-xl my-[10px] border-[2px] p-3 hover:bg-slate-100">
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