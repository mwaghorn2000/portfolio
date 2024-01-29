import React from "react";

const Footer: React.FC = () => {
    return (
        <>
            <div className="footer m-auto text-center inset-x-0 bottom-0 fixed bg-white py-3">
                <p>Check my projects out on GitHub here! -&gt; <a href="https://github.com/mwaghorn2000" target="_blank"><i className="devicon-github-original colored text-2xl"></i></a></p>
            </div>
        </>
    );
}

export default Footer;