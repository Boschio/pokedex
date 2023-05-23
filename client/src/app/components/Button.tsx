

export default function Button({ text, link, target }: any) {
    
    return (
        <div className='join-button flex justify-center my-4 min-w-[90px]'>
            <a className='text-white font-bold px-3 py-2 border-2 border-white bg-slate-700 hover:text-orange-400 hover:border-orange-400  rounded-md' href={link} target={target}>
                {text}
            </a>
        </div>
    )
}