import React from "react";
import Banner from "../../Component/Informasi/Banner/banner";
import Navbar from "../../Component/Navbar/navbar";

const Detail = () => {
    return (
        <div className="m-0 p-0 bg-white">
            <div className="bg-slate-100">
                <Navbar />
                <Banner />
            </div>
        </div>
    );
}

export default Detail;