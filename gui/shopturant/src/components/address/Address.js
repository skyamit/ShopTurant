import './Address.css'
function Address(props) {
    return (
        <div className="b-1 p-2 m-2 singleAddressDiv">
            <div className='singleAddressNameDiv'>{props.data.name}</div>
            <div>{props.data.line1}, {props.data.line2}, {props.data.city}, {props.data.state}, {props.data.country}</div>
            <div  className='singleAddressContactDiv'>{props.data.mobileNo}, {props.data.email}</div>
        </div>
    );
}

export default Address;