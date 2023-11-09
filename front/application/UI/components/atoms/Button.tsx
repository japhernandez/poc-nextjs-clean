import React, {ReactNode} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

type ButtonProps<T> = {
    onClick: (data: T) => void; // Function that is executed when the button is clicked.
    data: T | null; // Data passed to the onClick function.
    children: ReactNode; // Button content, which can be any React element.
    isLoading?: boolean; // Optional: controls whether the button is in loading mode (default is false).
};

/**
 * Generic Button component
 *
 * @param onClick
 * @param children
 * @param data
 * @param isLoading
 * @constructor
 * @author John Piedrahita
 *
 * @version 1.0.0
 * @licence MIT
 */
const Button = <T, >({onClick, children, data, isLoading}: ButtonProps<T>) => {

    /**
     * Handles the click on the button if it's not in loading mode and there's data.
     */
    const handleButtonClick = () => {
        if (!isLoading && data) {
            onClick(data);
        }
    };

    return (
        <button
            type="submit"
            onClick={handleButtonClick}
            className={`bg-blue-500 text-white rounded p-2 hover-bg-blue-600 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
            {isLoading ? (
                <FontAwesomeIcon icon={faSpinner} spin/>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
