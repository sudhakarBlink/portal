import { notification } from "antd";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
function useApiPost() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const Postdata = (url, auth, payload) => {
        setLoading(true);
        setError(null);
        let token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4ODg5NTQ1LCJpYXQiOjE3MjgyODQ3NDUsImp0aSI6ImI1NTFmMWRmOGNjYTRkMGNhOGM0ZWE1ZDAwMjhkNTg5IiwidXNlcl9pZCI6NDc3fQ.nzrCH4vY6WkO_luOqALqiCb7ZXMZXHEFCvhYMeVoDd4
 `
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth ? token : "",
            },
            body: JSON.stringify(payload)
        })
            .then((r) => r.json().then((data) => ({ status: r.status, body: data })))
            .then((result) => {
                setData(result);

                if (result.status === 200) {
                }
                if (result.status === 401 || result.status === 403) {
                    notification.warning({
                        message: "Auth failed",
                        description: "Kindly login or signup",
                        placement: "top",
                    });
                }
                if (result.status === 400) {

                }
                if (result.status === 405) {

                }

                if (result.status === 500) {

                }
            })
            .catch((err) => {
                notification.error({
                    message: "Api request failed",
                    description: "Kindly try again",
                    placement: "top",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return { data, loading, error, Postdata, setData, setLoading, setError };
}

export default useApiPost;
