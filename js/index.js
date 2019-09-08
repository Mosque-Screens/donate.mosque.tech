var stripe = Stripe('pk_live_P4tKSsMQGwGxhiAHaNslM6uN00lxfM8uaN');

var checkoutButton = document.getElementById('checkout-button-plan_FlksSXySJfyBAM');
var amount = document.getElementById('amount');
checkoutButton.addEventListener('click', function () {
  // When the customer clicks on the button, redirect
  // them to Checkout.

  try {
    var quantity = amount.value.length ? parseInt(amount.value) : 1;

    stripe.redirectToCheckout({
      items: [{plan: 'plan_FlksSXySJfyBAM', quantity: quantity}],

      // Do not rely on the redirect to the successUrl for fulfilling
      // purchases, customers may not always reach the success_url after
      // a successful payment.
      // Instead use one of the strategies described in
      // https://stripe.com/docs/payments/checkout/fulfillment
      successUrl: 'https://donate.mosque.tech/success.html',
      cancelUrl: 'https://donate.mosque.tech/canceled.html',
    })
    .then(function (result) {
      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer.
        var displayError = document.getElementById('error-message');
        displayError.textContent = result.error.message;
      }
    });

  } catch (error) {
    var displayError = document.getElementById('error-message');
    displayError.textContent = error.message;
    amount.classList.add('govuk-input--error');
  }
});