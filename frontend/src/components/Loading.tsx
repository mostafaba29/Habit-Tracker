interface LoadingProps{
    loadingMessage:string
}
export default function Loading({loadingMessage}:LoadingProps) {
    return (
        <div className="flex justify-center items-center h-screen w-full bg-zinc-950">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-lime-500"></div>
            <p className="text-lime-500 text-xl font-semibold ml-4">{loadingMessage}</p>
        </div>
    )
}