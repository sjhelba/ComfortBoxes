import React from 'react';


export default function Pay () {
  return (
    <form action="/charge" method="post" id="payment-form">
    <div className="form-row">
      <label htmlFor="card-element">
        Credit or debit card
      </label>
      <div id="card-element">
  {/* Stripe Element will be inserted here. --> */}
      </div>

      {/* Used to display form errors */}
      <div id="card-errors" role="alert"></div>
    </div>

    <button>Submit Payment</button>
  </form>
  );
}

