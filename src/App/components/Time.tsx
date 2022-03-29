import React from "react"

interface timeProps {
    hour: number;
    minute: number;
    second: number;
}

export const Time: React.FC<timeProps> = ({hour, minute, second})=> {

    return (
        <React.Fragment>
            <div className="hr">
                <h3>{(hour < 10) ? "0" + hour: hour}</h3>
                <small>Hr</small>
            </div>
            <p>:</p>
            <div className="min">
                <h3>{(minute< 10) ? "0" + minute: minute}</h3>
                <small>Min</small>
            </div>
            <p>:</p>
            <div className="sec">
                <h3>{(second < 10) ? "0" + second: second}</h3>
                <small>Sec</small>
            </div>
        </React.Fragment>
    );

}