import React from 'react';

const AboutMe: React.FC = () => {
    return (
        <div className="about-me py-[100px] w-2/5 m-auto subpixel-antialiased">
            <h1 className="py-3 text-xl font-extrabold text-center" >&lt;About Me</h1>
            <p className='text-justify'>
                lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dapibus, 
                elit vel vehicula ornare, justo metus iaculis ligula, imperdiet consequat 
                ligula nulla vitae nisi. Duis erat nulla, vestibulum quis pellentesque quis, 
                blandit sit amet erat. Interdum et malesuada fames ac ante ipsum primis in 
                faucibus. Nam a est condimentum, ornare risus a, condimentum mauris. Aliquam 
                scelerisque ac purus a aliquet. Aenean nec nisl quis risus cursus fermentum. 
                Cras risus elit, scelerisque sit amet ultricies eget, rutrum in est. Fusce 
                fermentum lorem at urna viverra, eget tempor nunc congue.

                Donec sit amet sagittis urna. Vestibulum sit amet erat nec velit porttitor 
                dapibus id sed ex. In sed augue eu ipsum tincidunt fringilla. Curabitur commodo, 
                felis eu vehicula accumsan, tortor ante efficitur purus, vitae feugiat justo lacus 
                eu elit. Donec eget sapien ultricies diam porttitor vehicula ut eu nunc. Cras nec 
                libero ultricies, semper nunc eget, pulvinar augue. Donec eu magna ac nulla rutrum 
                egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere 
                cubilia curae; Morbi nec viverra est, non aliquam sem.
            </p>
            <div className="self-photo"></div>
        </div>
    );
}

export default AboutMe