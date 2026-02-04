import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


type PayPalButtonProps = {
  amount: number;
  onApprove: (details: any) => Promise<void>;
};

const PayPalButton = ({ amount, onApprove }: PayPalButtonProps) => {
    console.log("Current Client ID:", import.meta.env.VITE_PAYPAL_CLIENT_ID);
    return (
      <PayPalScriptProvider
        options={{
          clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID!,
          currency: "USD",
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(_data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: amount.toFixed() || "0.01",
                  },
                },
              ],
            });
          }}
          onApprove={async (_data, actions) => {
            if (actions.order) {
              const details = await actions.order.capture();
              await onApprove(details);
            }
          }}
          onError={(err) => {
            console.error("PayPal Error:", err);
          }}
        />
      </PayPalScriptProvider>
    );
};

export default PayPalButton;
