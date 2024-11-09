// loading overlay using tailwindcss

export default function Loading({enabled = true}) {
    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${enabled ? "visible" : "hidden"}`}>
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100"></div>
        </div>
    );
}