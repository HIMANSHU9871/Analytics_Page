import React, { useEffect, useState } from 'react'


const Table = ({ tableColumns, tableHead, analytics, appInfo, showCol }) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const appNames = new Map();
    for (let app of appInfo.data) {
        const { app_id, app_name } = app;
        appNames.set(app_id, app_name);
        // console.log(app_id, app_name);
    }
    const getDate = (date) => {
        const year = date.substring(0, 4);
        const month = date.substring(6, 7);
        const day = date.substring(8, 10);
        return (`${day} ${months[parseInt(month) - 1]} ${year}`);
    }
    const addCommas = (num) => {
        return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }
    const getKey = (str) =>{
        let s = str.toLowerCase();
        return (s.replaceAll(/\s/g, ''));
    }
    return (
        <div className='overflow-auto'>
            {/* {tableHead.map((curr, index) => {
                const { id, name } = curr;
                const key = getKey(name);
                return (<span className='mx-2' key={key}>{name}</span>)
            })} */}
            <table className='text-center w-full text-gray-700'>
                <thead>
                    <tr>
                        {
                            tableHead.map((curr, index) => {
                                const {id, name}  = curr;
                                const key = getKey(name);
                                return ((showCol[key] || (key==='date' || key==='app')) && <th className='p-4 border-2 font-medium text-lg' key={id}>{name}</th>)
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        analytics.data.map((curr, index) => {
                            const { app_id, clicks, date, impressions, requests, responses, revenue } = curr;
                            return (
                                <tr className='text-gray-600' key={`${app_id}${date}`}>
                                    <td className='p-2 border-2'>{getDate(date)}</td>
                                    <td className='p-2 border-2'>{appNames.get(app_id)}</td>
                                    {
                                        showCol.clicks && <td className='p-2 border-2'>{addCommas(clicks)}</td>
                                    }
                                    {
                                        showCol.adrequests && <td className='p-2 border-2'>{addCommas(requests)}</td>
                                    }
                                    {
                                        showCol.adresponse && <td className='p-2 border-2'>{addCommas(responses)}</td>
                                    }
                                    {
                                        showCol.impression && <td className='p-2 border-2'>{addCommas(impressions)}</td>
                                    }
                                    {
                                        showCol.revenue && <td className='p-2 border-2'>${revenue.toFixed(2)}</td>
                                    }
                                    {
                                        showCol.fillrate && <td className='p-2 border-2'>{((responses * 100) / requests).toFixed(2)}%</td>
                                    }
                                    {
                                        showCol.ctr && <td className='p-2 border-2'>{((clicks * 100) / impressions).toFixed(2)}%</td>
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table