import avatar from '../../images/avatar.png';

function LoggedIn() {
    return (
        <div className='myProfile pl-2' >
            <img src={avatar} className="profileImage  pl-2" alt="cart" />
            <div className='userDetails' >
                <h6 className='helloUser'>Hello, Amit</h6>
                <h6 className='userOption'>Accounts & Details</h6>
            </div>
        </div>
    );
}

export default LoggedIn;