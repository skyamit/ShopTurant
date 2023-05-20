import React, {useState} from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [showPayment, setShowPayment] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://google.com/',
      },
    });


    if (error) {
      setErrorMessage(error.message);
    } else {
    }
  };

  const close = ()=>{
    setShowPayment(false);
  }
  return (
    <div>
        {
            showPayment && (
        <div className='checkout'>
            <div className='close' >
                <img className='iconCloseUser pointer' src="/cancel.png" alt="close" onClick={close}/>
            </div>
            <form onSubmit={handleSubmit} className='p-3'>
            <PaymentElement />
            <button disabled={!stripe} className='btn btn-success btn-sm btn-block p-1 m-2' >Submit</button>
            {/* Show error message to your customers */}
            {errorMessage && <div>{errorMessage}</div>}
            </form>
        </div>
            )
        }
    </div>
  )
};

export default CheckoutForm;