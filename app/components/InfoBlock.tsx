export default function InfoBlock({ children, color, className }) {
    const green = 'bg-green-100  ring-green-800 border-green-700 text-green-900'
    const blue = 'bg-blue-100 ring-blue-800 border-blue-700 text-blue-900'
    return (
        <div className={`${className} py-5 px-5 rounded-md border ${color === 'green' ? green : blue}`}>
            {children}
        </div>
    )
}