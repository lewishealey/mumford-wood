import React, { useState, useEffect } from 'react';
import Checkbox from '@components/Checkbox';
const classNames = require('classnames');

type CheckboxItem = {
    id: string | any;
    label: string;
    checked: boolean;
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
    items: any;
    onChecked: (any: object) => void;
}

const Checklist: React.FunctionComponent<Props> = ({
    items,
    onChecked,
}) => {
    const classes = classNames(`flex`,`space-x-1`);
    const [checkedItems, setCheckedItems] = useState(items);

    const handleChange = (checkbox: CheckboxItem) => {
        let isChecked;

        switch(checkedItems[checkbox.id]?.checked) {
            case undefined :
                isChecked = true;
                break;
            case false :
                isChecked = true;
                break;
            case true :
                isChecked = false;
                break;
        }

        const updatedCheckbox = {
            label: checkbox.label,
            id: checkbox.id,
            checked: isChecked
        }
        setCheckedItems({...checkedItems, [checkbox.id]: updatedCheckbox });
    }

    useEffect(() => {
        let checkedArray = [];
        Object.keys(checkedItems).map((key, i) => {
            if(checkedItems[key].checked) {
                checkedArray.push(checkedItems[key].id);
            }
        });
        onChecked(checkedArray);
    }, [checkedItems]);

    return (
        <>
            <div className={classes}>
                {checkedItems && Object.keys(checkedItems).map((key, i) => {
                    return <Checkbox
                            label={checkedItems[key].label}
                            id={checkedItems[key].id}
                            checked={checkedItems[key].checked}
                            onChecked={handleChange}
                        />
                })}
            </div>
        </>
    );
};

export default Checklist;
