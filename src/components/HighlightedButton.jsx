import React from "react";

const HighlightedButton = ({text}) => {
    return(
        <button className="bg-gradient-to-t from-[#abecd0] to-[#fbed96] rounded p-1" >{text}</button>
    )
}

export default HighlightedButton;