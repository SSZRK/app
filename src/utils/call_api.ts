enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

const callApi = async (url: string,
                       data: any,
                       method: Method = Method.GET,
                       headers: any = {
                           'Content-Type': 'application/json',
                       }
) => {
    const BASE_URL = import.meta.env.VITE_API_URL;

    if (method === Method.GET) {
        const response = await fetch(`${BASE_URL}${url}`, {
            method,
            headers
        });
        return {
            data: await response.json(),
            status: response.status,
        };
    } else {
        const response = await fetch(`${BASE_URL}${url}`, {
            method,
            headers,
            body: JSON.stringify(data),
        });
        return {
            data: await response.json(),
            status: response.status,
        };
    }
}

export {callApi, Method};