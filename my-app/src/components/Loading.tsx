
export function Loading({className = ''}: {className?: string}) {

    return (
        <svg
            className={`animate-spin m-auto w-5 h-5 rounded-full border-2 border-white border-t-transparent ${className}`}
            viewBox="0 0 24 24"
        ></svg>
    )
}