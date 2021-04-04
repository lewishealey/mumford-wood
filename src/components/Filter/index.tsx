import React, { useState, useEffect } from 'react';

type checkboxItem = {
    name: string;
    key: string;
    label: string;
}

export interface Props {
    onFilter: any;
    checkboxes: checkboxItem[];
}

  export const Filter: React.FC<Props> = ({ onFilter, checkboxes }) => {
    const [checkedItems, setCheckedItems] = useState({}); //plain object as state

    const handleChange = (event) => {
        setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });
    }

    useEffect(() => {
        onFilter(checkedItems);
    }, [checkedItems]);

    return (
        <div className="flex space-x-1">
            {
                checkboxes.map(item => (
                    <div className="flex items-center space-x-0.5" key={item.key}>
                        <input type="checkbox" id={item.name} name={item.name} checked={checkedItems[item.name]} onChange={handleChange}/>
                        <label htmlFor={item.name}>{item.label}</label>
                    </div>
                ))
            }
        </div>
    );
  }

  export default Filter;
