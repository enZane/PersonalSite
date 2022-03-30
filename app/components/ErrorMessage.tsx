export default function ErrorMessage({ message, id }) {
    return (
        <p className="transition-all ease-in-out delay-150 mt-1 text-xs text-red-600" id={`${id}-error`}>
            {message}
        </p>
    )
}