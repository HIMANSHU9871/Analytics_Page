import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import Filter from './Filter'
import Table from './Table'
import { AiFillSetting } from 'react-icons/ai'

const tableColumns = [
    { id: 'h-1', name: 'Date' },
    { id: 'h-2', name: 'App' },
    { id: 'h-3', name: 'Clicks' },
    { id: 'h-4', name: 'Ad Requests' },
    { id: 'h-5', name: 'Ad Response' },
    { id: 'h-6', name: 'Impression' },
    { id: 'h-7', name: 'Revenue' },
    { id: 'h-8', name: 'Fill Rate' },
    { id: 'h-9', name: 'CTR' }
];

const Analytics = () => {
    const [showCol, setShowCol] = useState({
        clicks: true,
        adrequests: true,
        adresponse: true,
        impression: true,
        revenue: true,
        fillrate: true,
        ctr: true
    })
    const [tableHead, setTableHead] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    useEffect(() => {
        setTableHead(tableColumns);
    }, [])
    // console.log(tableHead);
    const [date, setDate] = useState('2021-06-01')
    const analytics = useFetch(`http://go-dev.greedygame.com/v3/dummy/report?startDate=${date}&endDate=2021-06-04`);
    const appInfo = useFetch('http://go-dev.greedygame.com/v3/dummy/apps');

    if (analytics.loading || appInfo.loading) {
        return <div className="flex justify-center">loading...</div>
    }
    else {
        // console.log(analytics.data, appInfo.data);
        return (
            <div className='p-5'>
                <h1 className='text-xl font-medium'>Analytics</h1>
                <div className='flex justify-between mt-5 mb-2'>
                    <div className='border-2 px-4 py-2 rounded-lg hover:border-blue-600 transition-all ease-in-out duration-200'>
                        <input type="date" name="date" id="date" min='2021-06-01' max='2021-06-30' value={date} onChange={(e) => {
                            console.log(e);
                            setDate(e.target.value)
                        }} />
                    </div>
                    <div className='border-2 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:border-blue-600 transition-all ease-in-out duration-200'>
                        <AiFillSetting className='text-blue-500 h-5 w-5'></AiFillSetting>
                        <button className='font-medium text-gray-700 bg-white hover:border-blue-600 transition-all ease-in-out duration-200' onClick={() => (setShowSettings(true))}>Settings</button>
                    </div>
                </div>
                {
                    showSettings && <Filter tableColumns={tableColumns} showCol={showCol} setShowCol={setShowCol} tableHead={tableHead} setTableHead={setTableHead} setShowSettings={setShowSettings}></Filter>
                }
                <Table tableColumns={tableColumns} analytics={analytics.data} appInfo={appInfo.data} showCol={showCol} tableHead={tableHead}></Table>
            </div>
        )
    }
}

export default Analytics