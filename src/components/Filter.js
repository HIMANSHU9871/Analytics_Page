import React,{ useReducer, useState } from 'react'

const Filter = ({ tableColumns, showCol, setShowCol, tableHead, setTableHead, setShowSettings }) => {
    const [intialShowState, setIntialShowState] = useState(showCol)
    const [order, setOrder] = useState(tableHead);
    const [ignored, forceUpdate] = useReducer(x=>x+1, 0);
    // console.log(tableHead);
    const getKey = (str) => {
        let s = str.toLowerCase();
        return (s.replaceAll(/\s/g, ''));
    }
    const handleDragStart = (e,index)=>{
        // e.preventDefault();
        e.dataTransfer.setData("index", index);
        console.log("drag started", index);
    }
    const handleDragOver = (e)=>{
        e.preventDefault();
        console.log("draggable");
    }
    const handleDrop = (e,index)=>{
        console.log("you have droped at ", index);
        let transferedIndex = e.dataTransfer.getData("index");
        // console.log("before", tableHead[index], tableHead[transferedIndex]);
        let newOrder = order;
        let temp = newOrder[index];
        newOrder[index] = newOrder[transferedIndex];
        newOrder[transferedIndex] = temp;
        // console.log("before", tableHead[index], tableHead[transferedIndex]);
        setOrder(newOrder);
        console.log("tableHead", tableHead);
        console.log("tableColumns", tableColumns);
        console.log("order", order);
        forceUpdate();
        // setTableHead(tableColumns);
    }
    const handleShow = (key)=>{
        setIntialShowState({ ...intialShowState, clicks: !intialShowState[key] })
    }
    const handleApplyChanges = () => {
        setShowCol(intialShowState)
        setTableHead(order)
    }
    return (
        <div className='p-5 my-5 border-2 rounded-lg text-gray-700'>
            <h2 className='pb-5 font-medium'>Dimension and Metrics</h2>
            <div className='flex gap-3 flex-wrap'>
                {
                    order.map((curr, index) => {
                        const {name, id} = curr;
                        const key = getKey(name);
                        return (
                            <div key={id} className='flex border-2 rounded overflow-hidden bg-white w-36' onClick={() => {handleShow(key)}} draggable onDragStart={(e)=>{handleDragStart(e,index)}} droppable onDragOver={(e)=>{handleDragOver(e)}} onDrop={(e)=>{handleDrop(e,index)}}>
                                {
                                    (intialShowState[key] || (key === 'date' || key === 'app')) && <div className={`h-full w-2 bg-blue-500`}></div>
                                }
                                <div className='my-1 mx-3'>{name}</div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex gap-2 justify-end mt-5'>
                <button className='px-4 py-2 text-blue-500 bg-white border-2 hover:border-blue-600 hover:text-blue-600 transition-all ease-in-out duration-200 rounded-lg' onClick={()=>{setShowSettings(false)}}>Close</button>
                <button className='px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-all ease-in-out duration-300 rounded-lg' onClick={handleApplyChanges}>Apply Changes</button>
            </div>
        </div >
    )
}

export default Filter