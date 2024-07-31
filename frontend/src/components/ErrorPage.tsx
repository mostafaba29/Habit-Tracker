import {ExclamationTriangleIcon} from '@heroicons/react/24/outline';

interface ErrorPageProps{
    errorMessage:string
}
export default function ErrorPage({errorMessage}:ErrorPageProps){
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-zinc-950">
      <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
      <p className="text-lime-500 text-lg">{errorMessage}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-6 px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition-colors"
      >
        Try Again
      </button>
    </div>
    )
}