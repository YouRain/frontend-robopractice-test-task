import React, { useRef } from "react";
import classes from "./FullTable.module.css";
import { getHeadTableCenter } from "../supportfunc/headTableCenter";
import ThFirstColumn from "./ThFirstColumn";
import ThLastColumn from "./ThLastColumn";
import ThBodyColumn from "./ThBodyColumn";

function FullTable({ users, sort, firstRow, lastRow }) {

    const refTable = useRef({});

    function transformDate(duration) {
        const hours = ("0" + new Date(duration).getUTCHours()).slice(-2);
        const minutes = ("0" + new Date(duration).getUTCMinutes()).slice(-2);
        if (new Date(duration).getUTCHours() || new Date(duration).getUTCMinutes()) {
            return hours + ":" + minutes;
        } else {
            return 0;
        }
    }

    function sumDuration(accumValue) {
        let hours = Math.floor(accumValue / 1000 / 3600);
        let minutes = ("0" + Math.round((accumValue / 1000 / 3600 - hours) * 60)).slice(-2);
        return hours + ":" + minutes;
    }

    return (
        <div className={classes.outerTableWrapper}>
            <div className={classes.innerTableWrapper} ref={refTable}>
                <table className={classes.table}>
                    <thead className={classes.thead}>
                        <tr className={classes.headRow}>

                            <ThFirstColumn refTable={refTable} sort={sort} />
                            {users[0] !== undefined &&
                                getHeadTableCenter(users[0].duration.length).map((item, index, arr) =>
                                    <ThBodyColumn key={index} refTable={refTable} sort={sort} index={index} arr={arr}>{item} </ThBodyColumn>
                                )
                            }
                            <ThLastColumn refTable={refTable} sort={sort} />
                        </tr>
                    </thead>
                    <tbody>
                        {users.slice(firstRow, lastRow)
                            .map((user) =>
                                <tr key={user.id} className={classes.bodyRow}>
                                    <th className={[classes.headFirstColumn, classes.bodyFirstColumn].join(" ")}>
                                        <div>{user.fullName}</div>
                                    </th>
                                    {user.duration.map((duration, index) =>
                                        <td key={duration + index} className={classes.bodyTd}>{transformDate(duration)}</td>
                                    )}
                                    <th className={[classes.headLastColumn, classes.bodyLastColumn].join(" ")}>{sumDuration(user.totalDuration)}</th>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FullTable;