import React, { useRef } from "react";
import classes from "./FullTable.module.css";

function ThFirstColumn({ sort, refTable }) {
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
        if (widthColumn + dx < 80 || widthColumn + dx > 800) return;
        refTable.current.style.marginLeft = `${widthColumn + dx}px`;
        refTable.current.style.setProperty("--width-first-column", `${widthColumn + dx}px`);
    }
    function mouseUpHandler() {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
    }

    return (
        <th className={classes.headFirstColumn} onClick={e => sort(e.target.dataset.type, null)} data-type="string" ref={refTh}>
            <div data-type="string" >User</div>
            <div
                className={classes.resizerFirst}
                onMouseDown={mouseDownHandler}>
            </div>
        </th>
    )
}

export default ThFirstColumn;