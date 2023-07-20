import axiosInstanceDefault from "./common/AxiosDefault";
import useRestApi from "./common/RestApi";

export type StockDailyStatusType = {
    cnt: string;
    ticker: string;
    stock_name: string;
    change_price_rate: string;
    per: string;
    price: string;
    trading_volume: string;
    trading_amount: string;
    trading_date: string;
};

const useFetchStockDailyStatus = () => {
    const [responseData, requestError, useApi] = useRestApi();

    const callApiStockDailyStatus = (fromDate: string, toDate: string) => {
        useApi('getStockDailyStatus', {
            axiosInstance: axiosInstanceDefault,
            method: 'get',
            url: `/daily-status.php?from_date=${fromDate}&to_date=${toDate}&stock_name=`,
            requestData: {},
        });
    };

    return [responseData, requestError, { callApiStockDailyStatus }];
}

export default useFetchStockDailyStatus;