import React from "react";
import classes from "./InputSearch.module.css"

function InputSearch(props) {
    return (
        <div className={classes.inputWrapper}>
            <input className={classes.input} {...props} />
            <label className={classes.icon}>
                <i className="fa-solid fa-magnifying-glass"></i>
            </label>
        </div>
    )
}

export default InputSearch;