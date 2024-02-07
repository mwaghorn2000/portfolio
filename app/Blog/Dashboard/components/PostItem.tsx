import { useRouter } from 'next/navigation';

interface PostItemProps {
    title: string;
    _id: string
}

const PostItem: React.FC<PostItemProps> = ({
    title,
    _id,
}) => {
    const router = useRouter();

    const handleUpdate = (e: any) => {
        router.push(`/Blog/Dashboard/${_id}`)
    }

    const handleDelete = (e: any) => {

    }

    return (
        <>
            <div className='w-[95%] md:w-2/3 mx-auto border-lime-500 border-2 my-3 p-[20px] rounded-xl flex justify-between'>
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