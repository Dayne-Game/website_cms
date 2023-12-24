const Title = ({ title, subtitle, children }) => {

    return (
        <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column">
                <h2 className="mb-0">{title}</h2>
            </div>

            <div className="d-flex align-items-center">
                {children}
            </div>
        </div>
    )

}

export default Title