export default function ConfigureHeader({ onNavigate }) {
  return (
    <header className="config-header">
      <div className="container config-header-inner">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault()
            onNavigate('/')
          }}
          className="config-brand"
        >
          LK AURELIS
        </a>

        <div className="config-header-title">
          <span>DIGITAL SHOWROOM</span>
          <strong>CONFIGURE YOUR AURELIS</strong>
        </div>

        <a
          href="/"
          onClick={(e) => {
            e.preventDefault()
            onNavigate('/')
          }}
          className="config-back-link"
        >
          <span>←</span> BACK TO AURELIS
        </a>
      </div>
    </header>
  )
}
