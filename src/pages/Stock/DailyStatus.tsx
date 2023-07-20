import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import useFetchStockDailyStatus, { StockDailyStatusType } from '../../api/FetchStockDailyStatus';

const DailyStatus = () => {
    const dispatch = useDispatch();
    const rowData: StockDailyStatusType[] = [];
    useEffect(() => {
        dispatch(setPageTitle('일별 현황'));
    });
    const [recordsData, setRecordsData] = useState(rowData);
    const [search, setSearch] = useState('');
    const [responseData, requestError, { callApiStockDailyStatus }] = useFetchStockDailyStatus();

    const formatNumber = (number: string) => {
        if (number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return '';
    };

    const formatDate = (date: string) => {
        if (date && date.length == 8) {
            return date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');;
        }
        return '';
    };


    useEffect(() => {
        callApiStockDailyStatus('20230629', '20230630');
    }, []);

    useEffect(() => {
        if (!responseData) {
            return;
        }
        // console.log(`responseData[${responseData.transactionId}]:`, responseData);
        switch (responseData.transactionId) {
            case 'getStockDailyStatus':
                setRecordsData(responseData.data);
                break;
            default:
        }
    }, [responseData]);

    return (
        <div className="space-y-6">
            {/* Skin: Hover  */}
            <div className="panel">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">일별 현황</h5>
                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover table-bordered"
                        records={recordsData}
                        columns={[
                            { accessor: 'ticker', title: '종목코드', textAlignment: 'center', render: ({ ticker }) => <div  className="flex items-center justify-center">{ticker}</div> },
                            { accessor: 'stock_name', title: '주식명', textAlignment: 'center', render: ({ stock_name }) => <div  className="flex items-center justify-center">{stock_name}</div> },
                            { accessor: 'change_price_rate', title: '변동율', textAlignment: 'center', render: ({ change_price_rate }) => <div  className="flex items-center justify-center">{change_price_rate}</div> },
                            { accessor: 'price', title: 'Price', textAlignment: 'center', render: ({ price }) => <div  className="text-right">{formatNumber(price)} 원</div> },
                            { accessor: 'trading_volume', title: '거래량', textAlignment: 'center', render: ({ trading_volume }) => <div  className="flex items-center justify-center">{formatNumber(trading_volume)}</div> },
                            { accessor: 'trading_amount', title: '거래대금(백만)', textAlignment: 'center', render: ({ trading_amount }) => <div  className="flex items-center justify-center">{formatNumber(trading_amount)}</div> },
                            { accessor: 'trading_date', title: '거래일', textAlignment: 'center', render: ({ trading_date }) => <div  className="flex items-center justify-center">{formatDate(trading_date)}</div> },
                        ]}
                    />
                </div>
            </div>

        </div>
    );
};

export default DailyStatus;
