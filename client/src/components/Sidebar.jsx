import useSettings from "../hooks/useSettings"


const Sidebar = () => {

    const settings = useSettings();

    console.log(settings);

    return (
        <div className="sidebar" style={{ backgroundColor: settings.background_colour }}>
            <p>Sidebar Content</p>
        </div>
    )

}

export default Sidebar