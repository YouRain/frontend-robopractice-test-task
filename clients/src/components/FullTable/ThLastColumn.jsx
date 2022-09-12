import React, { useRef } from "react";
import classes from "./FullTable.module.css";

function ThLastColumn({ sort, refTable }) {
    const refTh = useRef({});

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
        if (widthColumn - dx < 80 || widthColumn - dx > 800) return;
        refTable.current.style.marginRight = `${widthColumn - dx}px`;
        refTable.current.style.setProperty("--width-last-column", `${widthColumn - dx}px`);
        console.log(widthColumn - dx);
    }
    function mouseUpHandler() {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
    }

    return (
        <th className={classes.headLastColumn} onClick={e => sort(e.target.dataset.type, null)} data-type="string" ref={refTh}>
            <div data-type="total" >Monthly Total</div>
            <div
                className={classes.resizerLast}
                onMouseDown={mouseDownHandler}>
            </div>
        </th>
    )
}

export default ThLastColumn;