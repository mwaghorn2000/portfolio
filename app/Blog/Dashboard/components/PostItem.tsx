import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface PostItemProps {
    title: string;
    _id: string;
    handleDeletePost:(_id: string) => void; 
}

const PostItem: React.FC<PostItemProps> = ({
    title,
    _id,
    handleDeletePost
}) => {
    const router = useRouter();

    const [displayWarning, setDisplayWarning] = useState<boolean>(false);

    const handleUpdate = () => {
        router.push(`/Blog/Dashboard/${_id}`)
    }

    const handleDelete = () => {
        handleDeletePost(_id);
    }



    return (
        <>
            <div className={`w-[95%] md:w-2/3 mx-auto border-lime-500 border-2 my-3 p-[20px] rounded-xl flex justify-between`}>
                <h1 className="text-l md:text-xl font-bold">{title}</h1>
                <div>
                    <button className="bg-lime-400 rounded-xl p-1 md:p-2 md:w-[91px] mr-[4px]" onClick={handleUpdate} >Update</button>
                    <button className="bg-red-600 rounded-xl p-1 text-white md:p-2 md:w-[91px]"onClick={handleDelete} >Delete</button>
                </div>
            </div>
        </>
    )
}

export default PostItem;