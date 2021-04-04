import React from 'react';
const classNames = require('classnames');

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
    id: string;
    label: string;
    checked?: boolean;
    onChecked: (any: any) => void;
}

const Checkbox: React.FunctionComponent<Props> = ({
    id,
    label,
    checked,
    onChecked
}) => {
    const classes = classNames(`Checkbox`,`has-space-x-0.5`);

    const handleChange = function() {
        onChecked({
            id,
            label,
            checked
        });
    }

    return (
            <div className="Checkbox__container space-x-0.5">
                <input type="checkbox" className={classes} checked={checked} id={id} onChange={handleChange}/>
                <span>{label}</span>
            </div>
    );
};

export default Checkbox;

Checkbox.defaultProps = {

};
