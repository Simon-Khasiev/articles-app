import { Button } from "antd"
import { NavLink } from "react-router-dom"
import './NotFound.css'

export const NotFound = () => {
    return(
        <div className="box__notfound">
            <p>404 NOT FOUND</p>
            <NavLink to='/' style={{marginTop: '10px'}}>
                <Button>
                    back
                </Button>
            </NavLink>
        </div>
    )
}
