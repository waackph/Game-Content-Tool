import React from "react";
import '../../App.css';

// ***
// The Sequence Card is an input component to create a sequence of commands 
// the player protagonist must follow in a sequence state.
// ***

const SequenceCard = (props) => {
    const sequence = props.sequence;

    // Create Commands list
    let commands = sequence.Commands.map((val, idx) => {
        let DestinationX = `DestinationX-${val.index}`;
        let DestinationY = `DestinationY-${val.index}`;
        let MillisecondsToWait = `MillisecondsToWait-${val.index}`;
        let CmdSoundFilePath = `CmdSoundFilePath-${val.index}`;
        let DoorId = `DoorId-${val.index}`;
        let CommandType = `CommandType-${val.index}`;

        let waitCmdVars = (<></>);
        let walkCmdVars = (<></>);
        let doorActionCmdVars = (<></>);
        if(val.CommandType === 'conscious.DataHolderWaitCommand, conscious'){
            waitCmdVars = (
                <>
                    <div className="col-2">
                        <label>Ms to wait</label> <br />
                        <input className="seqInput" type="number" placeholder="MillisecondsToWait" name="MillisecondsToWait" value={val.MillisecondsToWait} data-id={idx} id={MillisecondsToWait} onChange={(e) => props.onChange(e)} />
                    </div>
                    <div className="col-2">
                        <label>Sound Path</label> <br />
                        <input className="seqInput" type="text" placeholder="CmdSoundFilePath" name="CmdSoundFilePath" value={val.CmdSoundFilePath} data-id={idx} id={CmdSoundFilePath} onChange={(e) => props.onChange(e)} />
                    </div>
                </>
            );
        }
        else if(val.CommandType === 'conscious.DataHolderWalkCommand, conscious'){
            walkCmdVars = (
                <>
                    <div className="col-2">
                        <label>DestinationX</label> <br />
                        <input className="seqInput" type="number" placeholder="DestinationX" name="DestinationX" value={val.DestinationX} data-id={idx} id={DestinationX} onChange={(e) => props.onChange(e)} />
                    </div>
                    <div className="col-2">
                        <label>DestinationY</label> <br />
                        <input className="seqInput" type="number" placeholder="DestinationY" name="DestinationY" value={val.DestinationY} data-id={idx} id={DestinationY} onChange={(e) => props.onChange(e)} />
                    </div>
                </>
            );
        }
        else if(val.CommandType === 'conscious.DataHolderDoorActionCommand, conscious'){
            doorActionCmdVars = (
                <>
                    <div className="col-2">
                        <label>DoorId</label> <br />
                        <input className="seqInput" type="number" placeholder="DoorId" name="DoorId" value={val.DoorId} data-id={idx} id={DoorId} onChange={(e) => props.onChange(e)} />
                    </div>
                </>
            );
        }

        return (
        <div className='row' key={idx}>
            <div className="col-2">
                <h5>CMD {idx+1}</h5>
            </div>
            <div className="col-2">
                <label>Type</label> <br />
                <select name='CommandType' 
                        onChange={(e) => props.onChange(e)} value={val.CommandType}
                        data-id={idx} id={CommandType}
                        aria-label="Select command type">
                    <option value="conscious.DataHolderWalkCommand, conscious">Walk</option>
                    <option value="conscious.DataHolderWaitCommand, conscious">Wait</option>
                    <option value="conscious.DataHolderDoorActionCommand, conscious">DoorAction</option>
                    <option value="conscious.DataHolderAnimateCommand, conscious">Animate</option>
                    <option value="conscious.DataHolderVanishCommand, conscious">Vanish</option>
                    <option value="conscious.DataHolderSayCommand, conscious">Say</option>
                </select>
            </div>

            { waitCmdVars }
            { walkCmdVars }
            { doorActionCmdVars }

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