import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

const useRestApi = () => {
    const [controller, setController]: any = useState();
    const [response, setResponse]: any = useState();
    const [error, setResponseError]: any = useState('');

    const fetchApi = async (tid: string, configObj: any) => {
        try{
            const { axiosInstance, method, url, requestData = {} } = configObj;
            
            //JWT
            axiosInstance.defaults.headers.common.Authorization = '';

            const ctrl: any = new AbortController();
            setController(ctrl);
            let data: any = {};
            if (requestData instanceof FormData) {
                requestData.append('signal', ctrl.signal);
                data = requestData;
            } else {
                data = {
                    ...requestData,
                    signal: ctrl.signal,
                };
            }
            
            axiosInstance[`${method}`](url, data)
                                    .then((response: AxiosResponse) => {
                                        console.log(response.data)
                                        const returnData = { transactionId: tid, data: response.data.data };
                                        setResponse(returnData);
                                    })
                                    .catch((error: any) => {
                                        console.log('axos error : ', error)
                                        setResponseError(error);
                                    });
        } catch (error: any) {    
            console.log('useRestApi error : ', error)
            setResponseError(error);
        }
    };

    // clean up
    useEffect(() => {
        // useEffect cleanup function (memory-leak-and-useeffect)
        return () => {
            if (controller) {
                controller.abort();
            }
        };
    }, [controller]);
    
    return [response, error, fetchApi] as const;
};

export default useRestApi;