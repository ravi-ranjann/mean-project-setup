import { Link } from "react-router-dom";


const DashHeader = () => {

    const content = (
        <header className="dash-header">
            <div className="dash-header__container">
                <Link className="dash-header__title">Notes</Link>
                <nav className="dash-header__nav">
                    {/* add nav buttoons here */}
                </nav>
            </div>
        </header>
    )

    return content;
}

export default DashHeader;