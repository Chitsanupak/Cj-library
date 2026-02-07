import axios from "axios"
import jwtDecode from "jwt-decode"
import React,{ useState } from "react";
import { useNavigate } from "react-router-dom"

const AutContext = React.createContext();

function AutProvider(props) {
    const [state,setState] = useState({
        loading: null,
        error: null,
        user: null
    })

    const navigate = useNavigate();

    const login = async (data) => {
        const reslt = await axios.post("http://localhost:4000/auth/login", data);
        const token = result.data.token;
        localStorage.settem("token",token);
        const userDataFromToken = jwtDecode(token);
        setState({...state, user: userDataFromToken});
        navigate("/")
    }

}



