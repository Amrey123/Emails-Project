import { Link, NavLink } from "react-router-dom";

export function AppHeader() {
    return (
        <header className="app-header">
            <section className="container">
                <h1>Emails</h1>

                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/emails">Emails</NavLink>
                </nav>
            </section>
        </header>
    )
}
