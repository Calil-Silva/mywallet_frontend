import styled from "styled-components";
import { RiArrowGoBackFill } from "react-icons/ri"
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { postEntry } from "../services/api.js"; 
import { getUserData, removeUserData } from "../services/loginPersistence.js";

export default function AddDebit() {
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();

    function postNewEntry (e) {
        e.preventDefault();
        const token = getUserData()?.token;
        postEntry(token, {
            date: new Date(),
            description,
            balance: value > 0 ? - value : value
        })
            .then(res => handleSuccess(res.data.message))
            .catch(err => handleError(err.response.status, err.response.data.message));
    };

    function handleSuccess(successMsg) {
        alert(successMsg);
        setValue("");
        setDescription("");
    };

    function handleError(errorCode, errorMsg) {
        if(errorCode === 401) {
            alert(errorMsg);
            removeUserData();
            history.push("/");
        } else {
            alert(errorMsg);
        }
    };

    return (
        <Body>
            <Header>
                Nova saída
                <Link to="/balances">
                    <RiArrowGoBackFill style= {{color: "white"}}/>
                </Link>
            </Header>
            <Form>
                <input type="number" placeholder="Valor" value={value} onChange={(e) => setValue(e.target.value)}/>
                <input type="text" placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <input type="submit" value="Salvar entrada" onClick={(e) => postNewEntry(e)}/>
            </Form>
        </Body>
    )
}

const Body = styled.div`
    padding: 25px 25px 10px;
`;

const Header = styled.div`
    height: 31px;
    font-size: 26px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Form = styled.form`
    input {
        height: 58px;
        width: calc(100vw - 50px);
        border: none;
        border-radius: 5px;
        outline: none;
        font-size: 20px;
        font-family: 'Raleway', sans-serif;
        margin-bottom: 13px;
        padding-left: 15px;
        ::placeholder {
            color: black;
            font-size: 20px;
            font-family: 'Raleway', sans-serif;
        }
    }

    input:last-child {
        font-weight: bold;
        background-color: #A328D6;
        color: #fff;
    }
`;