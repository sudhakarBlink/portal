
import { useState } from 'react';
import { useStore } from "store/store";
import { useNavigate } from 'react-router-dom';
function useApiPut(endpoint, initialData = null) {
    const Navigate = useNavigate()
    const { setAlertbox, Modalconfig, setmodalscreen, CustomTheme, Apiconfig } = useStore();
    const { API_URL } = Apiconfig.config[Apiconfig.workspace].quiz_api_3;

    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postData = (payload, auth) => {

        // if (localStorage.getItem('DL-QUIZ-REFRESH') || localStorage.getItem('DL-QUIZ-ACCESS')) {
        setLoading(true);
        setError(null);
        let header_auth = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('DL-ACCESS-TOKEN')
        }
        let header_unauth = {
            'Content-Type': 'application/json',
        }
        fetch(endpoint, {
            method: 'PUT',
            headers: auth ? header_auth : header_unauth,
            body: JSON.stringify(payload),
        })
            .then((r) => r.json().then((data) => ({ status: r.status, body: data })))
            .then((result) => {
                setData(result);

                if (result.status === 200) {
                }
                if (result.status === 401 || result.status === 403) {
                    fetch(`${API_URL}token/refresh`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            refresh: localStorage.getItem('DL-REFRESH-TOKEN')
                        }),
                    })
                        .then((r) => r.json().then((data) => ({ status: r.status, body: data })))
                        .then((res) => {
                            if (res.status === 200) {
                                localStorage.setItem("DL-ACCESS-TOKEN", res?.body?.access);
                                setAlertbox({
                                    type: 'warning',
                                    message: 'Oops!',
                                    description: 'Kindly try again',
                                    placement: 'top'
                                })
                            } else {
                                let Duplicateconfig = {
                                    ...Modalconfig?.config,
                                    loading: {
                                        is_open: false,
                                    },
                                };
                                setmodalscreen(Duplicateconfig);
                                setAlertbox({
                                    type: 'warning',
                                    message: 'Unauthorized user',
                                    description: 'Kindly login in your account',
                                    placement: 'top'
                                })
                                Navigate('/', { replace: true });
                            }
                        }).catch((err) => {
                            let Duplicateconfig = {
                                ...Modalconfig?.config,
                                loading: {
                                    is_open: false,
                                },
                            };
                            setmodalscreen(Duplicateconfig);
                            setAlertbox({
                                type: 'error',
                                message: 'Oops! ',
                                description: err?.message,
                                placement: 'top'
                            })
                            Navigate('/', { replace: true });
                        })
                }
                if (result.status === 400) {
                    let Duplicateconfig = {
                        ...Modalconfig?.config,
                        loading: {
                            is_open: false,
                        },
                    };
                    setmodalscreen(Duplicateconfig);
                    setAlertbox({
                        type: 'warning',
                        message: 'Warning ',
                        description: result?.body?.message || "Something went wrong",
                        placement: 'top'
                    })
                }
                if (result.status === 405) {
                    let Duplicateconfig = {
                        ...Modalconfig?.config,
                        loading: {
                            is_open: false,
                        },
                    };
                    setmodalscreen(Duplicateconfig);
                    setAlertbox({
                        type: 'warning',
                        message: 'Warning ',
                        description: 'Method not allowed',
                        placement: 'top'
                    })
                }

                if (result.status === 500) {

                    let Duplicateconfig = {
                        ...Modalconfig?.config,
                        loading: {
                            is_open: false,
                        },
                    };
                    setmodalscreen(Duplicateconfig);
                    setAlertbox({
                        type: 'error',
                        message: 'Oops! ',
                        description: result.body?.message,
                        placement: 'top'
                    })
                }
            })
            .catch((err) => {
                let Duplicateconfig = {
                    ...Modalconfig?.config,
                    loading: {
                        is_open: false,
                    },
                };
                setmodalscreen(Duplicateconfig);
                setAlertbox({
                    type: 'error',
                    message: 'Oops! ',
                    description: err?.message,
                    placement: 'top'
                })
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
        // }

    };

    return { data, loading, error, postData, setData, setLoading, setError };
}

export default useApiPut;
