import { useEffect, useState } from "react";
import Input from "../common/Input";
import PayPalButton from "./PayPalButton";
import OrderSummary from "./OrderSummary";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../hooks/useCheckout";

const CheckoutPage = () => {
  const { cart, isLoading } = useCart();
  const { createCheckout, payOrder, finalizeOrder } = useCheckout();

  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState<string | null>(null);

  const userEmail = JSON.parse(
    localStorage.getItem("userInfo") || "null",
  ).email;
  useEffect(() => {
    if (!cart || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, isLoading, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;
    const checkoutPayload = {
      checkoutItems: cart?.products || [],
      shippingAddress: {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
        phone: data.phone,
      },
      paymentMethod: "PayPal",
      totalPrice: cart?.totalPrice || 0,
    };

    console.log("Payload being sent:", checkoutPayload);

    createCheckout.mutate(checkoutPayload, {
      onSuccess: (response) => {
        setCheckoutId(response._id);
      },
    });
  };

  const handlePaymentSuccess = async (details: any) => {
    if (!checkoutId) return;

    try {
      await payOrder.mutateAsync({ id: checkoutId, details });

      await finalizeOrder.mutateAsync(checkoutId);

      navigate("/order-confirmation");
    } catch (error) {
      console.error("Checkout process failed:", error);
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <h1 className="text-3xl font-bold mb-10 uppercase tracking-tight">
              Checkout
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Details */}
              <section>
                <h2 className="text-lg font-semibold mb-4 text-gray-900">
                  Contact Details
                </h2>
                <Input
                  label="Email"
                  id="email"
                  type="email"
                  value={userEmail}
                  placeholder="admin@example.com"
                  readOnly
                />
              </section>
              {/* Delivery Details */}
              <section>
                <h2 className="text-lg font-semibold mb-4 text-gray-900">
                  Delivery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First name"
                    id="firstName"
                    name="firstName"
                    required
                  />
                  <Input
                    label="Last name"
                    id="lastName"
                    name="lastName"
                    required
                  />
                </div>

                <Input label="Address" id="address" name="address" required />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="City" id="city" name="city" required />
                  <Input
                    label="Postal Code"
                    id="postalCode"
                    name="postalCode"
                    required
                  />
                </div>

                <Input label="Country" id="country" name="country" required />

                <Input
                  label="Phone"
                  id="phone"
                  type="tel"
                  name="phone"
                  required
                />
              </section>
              {!checkoutId ? (
                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 font-bold rounded-sm hover:bg-gray-800 transition-all uppercase text-sm tracking-widest mt-6"
                >
                  {!createCheckout.isPending
                    ? "Continue to Payment"
                    : "Processing..."}
                </button>
              ) : (
                <div>
                  <h3 className="text-lg mb-4">Pay with Paypal</h3>
                  <PayPalButton
                    onApprove={handlePaymentSuccess}
                    amount={cart.totalPrice || 0}
                  />
                </div>
              )}
            </form>
          </div>

          <OrderSummary ordersData={cart} isLoadingOrders={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
