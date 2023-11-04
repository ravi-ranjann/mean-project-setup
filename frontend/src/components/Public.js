import { Link } from "react-router-dom";

const Public = () => {
    const content = (
<section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Ravi R.!</span></h1>
            </header>
            <main className="public__main">
                <p>Located in Beautiful Downtown Bengaluru City, Ravi provides a trained staff ready to meet your tech repair needs.</p>
                <address className="public__addr">
                    Ravi Ranjan<br />
                    ABC XYZ<br />
                    Bengaluru City, KA 123456<br />
                    <a href="tel:+911234567890">(+91) 123-456-7890</a>
                </address>
                <br />
                <p>Owner: Ravi</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>
    )
    return content;
}

export default Public;