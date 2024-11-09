import {CheckCircle, Warning, XCircle} from "@phosphor-icons/react";

export type AlertProps = {
    title: string;
    message: string;
    type: 'error' | 'success' | 'warning';
};

export default function Alert({alertData, closeNotification}: {
    alertData: AlertProps | null,
    closeNotification: () => void
}) {
    if (alertData !== null)
        return (
            <div onClick={closeNotification} role="alert"
                 className={`rounded absolute left-2 top-2 max-w-md border-s-4 select-none cursor-pointer shadow-2xl p-4 ${alertData.type === 'error' ? 'border-red-500 bg-red-50' : ''} ${alertData.type === 'success' ? 'border-green-500 bg-green-50' : ''} ${alertData.type === 'warning' ? 'border-yellow-500 bg-yellow-50' : ''}`}>
                <div
                    className={`flex items-center gap-2 ${alertData.type === 'error' ? 'text-red-800' : ''} ${alertData.type === 'success' ? 'text-green-800' : ''} ${alertData.type === 'warning' ? 'text-yellow-800' : ''}`}>
                    {alertData.type === 'error' && (<XCircle size={20}/>)}
                    {alertData.type === 'success' && (<CheckCircle size={20}/>)}
                    {alertData.type === 'warning' && (<Warning size={20}/>)}

                    <strong className="block font-medium"> {alertData.title} </strong>
                </div>

                <p className={`mt-2 text-sm ${alertData.type === 'error' ? 'text-red-700' : ''} ${alertData.type === 'success' ? 'text-green-700' : ''} ${alertData.type === 'warning' ? 'text-yellow-700' : ''}`}>
                    {alertData.message}
                </p>
            </div>
        );
}