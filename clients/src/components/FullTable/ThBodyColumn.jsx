import React, { useRef } from "react";
import classes from "./FullTable.module.css";

function ThBodyColumn({ sort, children, index, arr }) {
    const refTh = useRef({})

    let currentMousePosition,
        widthColumn;
    function mouseDownHandler(event) {
        currentMousePosition = event.clientX;
        widthColumn = refTh.current.offsetWidth;
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
    }
    function mouseMoveHandler(event) {
        const dx = event.clientX - currentMousePosition;
        if (widthColumn + dx < 55 || widthColumn + dx > 200) return;
        refTh.current.style.width = `${widthColumn + dx}px`;
        console.log(refTh.current.style.width)
    }
    function mouseUpHandler() {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
    }

    return (
        <th className={index + 1 < arr.length ? classes.headTh : classes.headThLast} onClick={e => sort(e.target.dataset.type, e.target.cellIndex)} data-type="number" >
            {children}
            <div className={classes.headThWrapper} ref={refTh}></div>
            {index + 1 < arr.length &&
                <div
                    className={classes.resizerFirst}
                    onMouseDown={mouseDownHandler}>
                </div>
            }
        </th>
    )
}

export default ThBodyColumn;