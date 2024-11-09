import {useEffect, useState} from "react";
import {callApi, Method} from "../utils/call_api.ts";

export default function VerifyEmail() {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        verify();
    }, [token]);

    async function verify() {
        console.log(token)
        const response = await callApi('/auth/verify-email', {
            token
        }, Method.POST);

        if (!response.data || response.data.error) return console.log(response.data.error);

        setSuccess(true);
    }

    if (success) {
        return <div>Email verified successfully</div>
    }
}