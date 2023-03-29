
function NotLoggedIn() {
return (
        <div className='profile pl-2' >
            <div className='hello'>
                Hello,
            </div>
            <div className='links'>
                <a href="#" className='linkText'>Login</a>
                <h6 className='linkText'>Or</h6>
                <a href="#" className='linkText'>Signup</a>
            </div>
        </div>
    );
}

export default NotLoggedIn;