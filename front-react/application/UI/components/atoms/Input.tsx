import React, { FC } from "react";

type InputProps = {
    id: string;
    name: string;
    value: number;
    checked: any;
    onChange: (event: { target: { value: any; }; }) => void;
};

const Input: FC<InputProps> = ({ id, name, value, checked, onChange }) => {
    return (
        <div>
            <label htmlFor={name} className="text-black mx-1">{value}</label>
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
        </div>
    );
}

export default Input;
