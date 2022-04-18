import React from "react";

export const Footer = () => {
  return(
    <div >
      <footer className="page-footer #00897b blue darken-2">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Календарь ВКС</h5>
                <p className="grey-text text-lighten-4">Приложение разработано для организации ВКС</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Контакты</h5>
                <div>
                <a className="grey-text text-lighten-3" href="https://vk.com/gari1993niko" ><img src="https://img.icons8.com/fluency/48/000000/vk-circled.png" alt="VK.com"/></a>
                <a className="grey-text text-lighten-3" href="mailto:gari1993niko@gmail.com" ><img src="https://img.icons8.com/fluency/48/000000/gmail.png" alt="gmail.com"/></a>
                </div>
  
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2021 Copyright Text
            
            </div>
          </div>
        </footer>
    </div>
  );
}