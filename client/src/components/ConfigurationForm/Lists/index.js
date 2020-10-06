import React, { useEffect, useState } from "react";
import { Multiselect } from 'multiselect-react-dropdown';
import { CONFIG } from '../../../environment'

const ListDropDown = ({boardData, onSelect1, onRemove1}) => {
    const [selectedValue, setSelectedValue] = useState([])
    const [filter, setFilter] =useState([])

    useEffect(() => {

      callApiData()

    },[boardData])

    const callApiData = () => {
        boardData.map((items) => {
            fetch(`${CONFIG.API_PATH}/api/listOfboards/${items.id}`)
                .then(res => res.json())
                .then((data) => {
                    setFilter([...filter, ...data])
                })
                .catch(console.log)
        })
    }

    const option = filter.map((item) => {
        return {
            name: item.name,
            id: item.id
        }
    })

    return (

        <div>
            <Multiselect
                options={option} // Options to display in the dropdown
                selectedValues={selectedValue.length > 0 ? selectedValue : JSON.parse(localStorage.getItem("SelectList"))} // Preselected value to persist in dropdown
                onSelect={onSelect1} // Function will trigger on select event
                onRemove={onRemove1} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                id="Board"
            />
        </div>

    );
}

export default ListDropDown;