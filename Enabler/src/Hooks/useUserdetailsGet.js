
import { useState } from 'react';
import { useStore } from "store/store";
import { useNavigate } from 'react-router-dom';
function useUserdetailsget(endpoint, initialData = null) {
    const { setAlertbox, Modalconfig, setmodalscreen, Apiconfig } = useStore();
    const API_URL = Apiconfig.config[Apiconfig.workspace].quiz_api_3
    const Navigate = useNavigate()


    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getData = (url) => {
        setLoading(true);
        setError(null);
        if (localStorage.getItem('DL-ACCESS-TOKEN') || localStorage.getItem('DL-REFRESH-TOKEN')) {
            fetch(url || endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('DL-ACCESS-TOKEN')}`
                },
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
                                Navigate('/', { replace: true });
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
                        setAlertbox({
                            type: 'error',
                            message: 'Oops! ',
                            description: result.body?.message,
                            placement: 'top'
                        })
                        let Duplicateconfig = {
                            ...Modalconfig?.config,
                            loading: {
                                is_open: false,
                            },
                        };
                        setmodalscreen(Duplicateconfig);
                    }
                })
                .catch((err) => {
                    setAlertbox({
                        type: 'error',
                        message: 'Oops! ',
                        description: err?.message,
                        placement: 'top'
                    })
                    setError(err);
                    let Duplicateconfig = {
                        ...Modalconfig?.config,
                        loading: {
                            is_open: false,
                        },
                    };
                    setmodalscreen(Duplicateconfig);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

    };

    return { data, loading, error, getData, setData, setLoading, setError };
}

export default useUserdetailsget;
