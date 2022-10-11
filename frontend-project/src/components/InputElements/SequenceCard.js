import React from "react";
import '../../App.css';

const SequenceCard = (props) => {
    const sequence = props.sequence;

    // Create Commands list
    let commands = sequence.Commands.map((val, idx) => {
        let _destinationX = `_destinationX-${val.index}`;
        let _destinationY = `_destinationY-${val.index}`;
        let CommandType = `CommandType-${val.index}`;

        return (
        <div className='row' key={idx}>
            <div className="col-2">
                <h5>CMD {idx+1}</h5>
            </div>
            <div className="col-2">
                <label>_destinationX</label> <br />
                <input className="seqInput" type="number" placeholder="_destinationX" name="_destinationX" value={val._destinationX} data-id={idx} id={_destinationX} onChange={(e) => props.onChange(e)} />
            </div>
            <div className="col-2">
                <label>_destinationY</label> <br />
                <input className="seqInput" type="number" placeholder="_destinationY" name="_destinationY" value={val._destinationY} data-id={idx} id={_destinationY} onChange={(e) => props.onChange(e)} />
            </div>
            <div className="col-2">
                <label>Type</label> <br />
                <select name='CommandType' 
                        onChange={(e) => props.onChange(e)} value={val.CommandType}
                        data-id={idx} id={CommandType}
                        aria-label="Select command type">
                    <option value="conscious.DataHolderWalkCommand, conscious">Walk</option>
                    <option value="conscious.DataHolderWaitCommand, conscious">Wait</option>
                </select>
            </div>
            <div className="col-2 p-2">
                {idx === 0 ? (
                    <button
                    onClick={(e) => props.add(e)}
                    type="button"
                    className="btn btn-primary text-center"
                    >
                    {/* <i className="fa fa-plus-circle" aria-hidden="true" /> */}
                        <h3>+</h3>
                    </button>
                ) : ( <></>
                )}
                <button
                    className="btn btn-danger"
                    onClick={(e) => props.delete(e, val)}
                    >
                    {/* <i className="fa fa-minus" aria-hidden="true" /> */}
                        <h3>-</h3>
                </button>

            </div>
            --------------------------------------------------------------------------------------------------------------------------------------------------------
        </div>
        )
    });

    if(commands.length === 0) {
        commands = <button
                onClick={() => props.add()}
                type="button"
                className="btn btn-primary text-center"
                >
                    <h5>+</h5>
                {/* <i className="fa fa-plus-circle" aria-hidden="true" /> */}
            </button>
    }

    return (
        <div className='card'>
            <div className='card-body'>
                <h3>
                    Sequence
                </h3>
                {commands}
            </div>
        </div>
    )
};

export default SequenceCard;