import { useNavigate } from "react-router-dom";
import HighlightedButton from "./HighlightedButton";

const DealsDashBoard = ({deals}) => {
    const navigate = useNavigate();
    const moreDetailsHandler = (orderId) => {
        navigate(`/order/${orderId}`);
    }
    console.log(deals);
    // background: #C9CCD3;
    // background-image: linear-gradient(-180deg, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%);
    // background-blend-mode: lighten;
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