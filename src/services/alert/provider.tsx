import {ReactNode, useState} from "react";
import {AlertContext} from "./context";

interface Alert {
    id: string;
    type: 'info' | 'error' | 'success' | 'warning';
    title: string;
    message: string;
}

export default function AlertProvider({ children }: { children: ReactNode }) {
    const [alerts, setAlerts] = useState<Array<Alert>>([]);

    const addAlert = (type: 'info' | 'error' | 'success' | 'warning', title: string, message: string, timeout = 5000) => {
        const id = new Date().getTime().toString();
        setAlerts([...alerts, { id, type, title, message }]);

        setTimeout(() => {
            closeAlert(id);
        }, timeout);
    };

    const closeAlert = (id: string) => {
        setAlerts(alerts.filter((alert) => alert.id !== id));
    };

    return (
        <AlertContext.Provider value={null}>
            {children}
            <div className="">
                {alerts.map((alert) => (
                    <div key={alert.id} className={`alert ${alert.type}`}>
                        {alert.message}
                    </div>
                ))}
            </div>
        </AlertContext.Provider>
    );
}