import { NavLink as Link } from "react-router-dom";
import useSettings from "../hooks/useSettings"
import useAuth from "../hooks/useAuth";


const Sidebar = () => {

    const settings = useSettings();
    const { firstname, lastname } = useAuth();

    return (
        <div className="sidebar">
            <div className="d-flex flex-column">
                <div className="sidebar_logo">
                   { settings.logo ?  <img src={settings.logo} alt="logo" /> : <h3 className="mb-0">SSCAR CMS</h3>  }
                </div>
                <Link to="/" className="sidebar_link">
                    Dashboard
                </Link>
                <Link to="/posts" className="sidebar_link">Posts</Link>
                <Link to="/drivers" className="sidebar_link">Drivers</Link>
                <Link to="/categories" className="sidebar_link">Categories</Link>
                <Link to="/media" className="sidebar_link">Media Library</Link>
                <Link to="/settings" className="sidebar_link">Settings</Link>
            </div>

            <div className="sidebar_footer d-flex flex-column">
                <div className="user_info d-flex align-items-center justify-content-between" role="button">
                    <img className="user_image" src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png" alt="avatar" />
                    <div className="user_info_name">
                        <p className="mb-0">{firstname} {lastname}</p>
                    </div>
                    <i className='bx bx-log-out-circle'></i>
                </div>
            </div>
        </div>
    )

}

export default Sidebar