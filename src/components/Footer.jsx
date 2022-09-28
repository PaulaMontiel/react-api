import React from "react";
import "./miApi.css";  

const Footer = () => {

    return (
        <footer className="footer bg-pinky d-flex justify-content-center p-3">
            <div className="container d-flex justify-content-center align-items-center"> 
                <h3 className="icon icons-home"><i className="fa-regular fa-moon gold-s"></i>Sakura Api From <i className="fa-brands fa-github-alt"></i>JessVel/sakura-card-captor-api<i className="fa-regular fa-star gold-s"></i></h3>
            </div>
        </footer>
    )
}

export default Footer;