import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { host } from "../../../Utils/APIRoutes";
import { useNavigate } from "react-router-dom";
const Checkout = ({ booking }) => {
  const [cardError, setCardError] = useState("");
  const [Success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { price, email, patient_name, _id } = booking;
  const [clientSecret, setClientSecret] = useState("");
  const navigateD = useNavigate();
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${host}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);
  const handleSubmit = async (event) => {
    setProcessing(true);
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("");
    }
    setSuccess("");
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: patient_name,
            email: email,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const payment = {
        price,
        transactionid: paymentIntent.id,
        email,
        bookingID: _id,
      };
      fetch(`${host}/payment`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("payment data", data);
          if (data.status === "Success") {
            setSuccess("Payment Completed");
            setTransactionId(paymentIntent.id);
            toast.success("Payment Confirmed");
            setNavigate(true);
          }
        });
    }
    console.log("paymentIntent", paymentIntent);
    setProcessing(false);
  };
  useEffect(() => {
    if (navigate === true) {
      navigateD("/dashboard");
    }
  }, [navigate, navigateD]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-sm mt-4"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      <p className="text-red-600">{cardError}</p>
      {Success && (
        <div>
          <p className="text-green-500"> {Success}</p>
          <p>
            Transaction id
            <span className="text-green-400">{transactionId}</span>
          </p>
        </div>
      )}
    </>
  );
};
export default Checkout;
