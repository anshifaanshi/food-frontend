
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentSuccessPage = () => {
    const history = useHistory();
    const clientDomain = process.env.REACT_APP_CLIENT_DOMAIN;

    console.log("Client domain:", clientDomain);

    // Trigger success notification
    useEffect(() => {
        toast.success("Your order has been confirmed!");
        
        const timer = setTimeout(() => {
            history.push("/user/profile");
        }, 5000); // Redirect after 5 seconds

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [history]);

    return (
        <div>
            <h2>Order Successful</h2>
            <p>Your order has been confirmed. You will be redirected to your profile shortly.</p>
        </div>
    );
};

export default PaymentSuccessPage;
