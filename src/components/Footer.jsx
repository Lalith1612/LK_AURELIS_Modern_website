export default function Footer({ onRequestEnquiry }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h2>LK AURELIS</h2>
            <p>An electric grand tourer engineered around silence, presence, and performance.</p>
          </div>

          <div className="footer-col">
            <h4>EXPLORE</h4>
            <ul>
              <li><a href="#top">Aurelis</a></li>
              <li><a href="#design">Design</a></li>
              <li><a href="#performance">Performance</a></li>
              <li><a href="#engineering">Engineering</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>TECHNOLOGY</h4>
            <ul>
              <li><a href="#architecture">800V Architecture</a></li>
              <li><a href="#interior">Cabin Sanctuary</a></li>
              <li><a href="#technology">Digital Cockpit</a></li>
              <li><a href="#safety">Safety System</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>INFORMATION</h4>
            <ul>
              <li><a href="#personalize">Configure</a></li>
              <li>
                <a
                  href="#enquiry"
                  onClick={(e) => {
                    e.preventDefault()
                    if (onRequestEnquiry) onRequestEnquiry()
                  }}
                >
                  Enquiry
                </a>
              </li>
              <li><a href="#top">Privacy Policy</a></li>
              <li><a href="#top">Legal Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 LK AURELIS. ALL RIGHTS RESERVED.</span>
          <span>ALL VEHICLE SPECIFICATIONS AND IMAGERY ARE CONCEPT FIGURES AND VISUALIZATIONS.</span>
        </div>
      </div>
    </footer>
  )
}
