import { useNavigate } from "react-router-dom"

const BackButton = () => {

    const navigate = useNavigate()

    return (
        <div className="back-btn" role="button" onClick={() => navigate(-1)}>
            <i className='bx bx-arrow-back' ></i> Back
        </div>
    )

}

export default BackButton