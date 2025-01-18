import { useNavigate } from "react-router-dom";
import HighlightedButton from "./HighlightedButton";
import {endpoints} from "../operations/apis"
import { createPaymentOrder } from "../operations/payment";

const DealsDashBoard = ({deals}) => {
    const navigate = useNavigate();
    const moreDetailsHandler = (orderId) => {
        navigate(`/order/${orderId}`);
    }
    console.log(deals);
    // background: #C9CCD3;
    // background-image: linear-gradient(-180deg, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%);
    // background-blend-mode: lighten;

    const PaymentHandler = async({deal}) => {

        const response = await createPaymentOrder(deal?.amount);
        console.log(response);
        const options = {
            key: process.env.RAZORPAY_KEY,
            amount: deal.price,
            currency: "INR",
            name: deal?.order?.crop || "Crop Name",
            description: deal?.order?.crop || "Crop Name",
            image: deal?.order?.coverPhoto || "https://ist.blogs.inrae.fr/agronomy/wp-content/uploads/sites/14/2019/08/crop-diversification-640x404.jpg",
            order_id: response?.data?.order.id,
            callback_url: endpoints.PAYMENT_VERIFICATION + `/${deal._id}`,
            prefill: {
                name: deal?.buyer?.firstName + deal?.buyer?.lastName,
                email: deal?.buyer?.lastName ,
                contact: deal?.buyer?.mobileNo | "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }
    return(
        <div>
            <h2>Deals: </h2>
            <div className="flex flex-row flex-wrap gap-9">
            {
                deals && deals.length > 0 ? (
                    deals.map((deal) => (
                        <div key={deal._id} className="bg-[#abecd6] bg-blend-lighten p-5 rounded">
                            <div className="crop">Crop: {deal.order.crop}</div>
                            <div className="area">Area: {deal.order.area}</div>
                            <div className="price">Price: ₹{deal.price}</div>
                            <div className="user">Buyer: {deal.buyer.firstName} {deal.buyer.lastName}</div>
                            <div className="user">Seller: {deal.seller.firstName} {deal.seller.lastName}</div>
                            <HighlightedButton text="More Details" onClick={() => moreDetailsHandler(deal.order._id)}
                                className="items-center self-center"/>
                            {
                                deal.ongoing && 
                                <div>
                                    <button onClick={() => PaymentHandler({deal})}>Pay Now</button>
                                    <p>Farmer has Accepted Your Bid. Pay 10% amount of Your deal before {deal.createdAt.getTime() + 24 *60*60*1000}. Otherwise the Deal will be cancelled</p>
                                </div>
                            }
                        </div>
                    ))
                )
                : (
                    <div>You don't have any deal till now</div>
                )
            }
            </div>
        </div>
    );
}

export default DealsDashBoard;