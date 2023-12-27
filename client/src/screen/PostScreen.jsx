import BackButton from "../components/BackButton"
import Title from "../components/Title"
import useTitle from "../hooks/useTitle"

const PostScreen = () => {

    useTitle("Posts")

    return (
        <div>
            <BackButton />
            <Title title="Posts">
                <button className="btn btn-primary button-icon btn-sm text-uppercase"><i className='bx bx-plus' ></i> Create new entry</button>
            </Title>
            <p className="text-muted mb-0">0 entries found</p>

            <div className="table_container">
                <div className="d-flex align-items-center">
                    <div class="input-group table_search_container">
                        <span class="input-group-text" id="basic-addon1"><i className='bx bx-search' ></i></span>
                        <input type="text" className="form-control table_search" />
                    </div>
                </div>

                <div className="table_background">

                    <p>Hello</p>

                    {/* <div className="d-flex justify-content-center">
                        <div className="d-block text-center">
                            <p className="text-muted mb-2">No Content</p>
                            <button className="btn btn-outline-primary btn-sm text-uppercase button-icon"><i className='bx bx-plus' ></i> Create new entry</button>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default PostScreen