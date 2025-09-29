import { useEffect, useState } from "react";
import firebase from "../../services/Firebase";
import "./home.css";

export const Home = () => {
    const [userData, setUserData] = useState({
        nome: '',
        sobrenome: '',
        data_nascimento: ''
    });

    const getData = async () => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if(user){
                const id = user.uid;
                const userData = await firebase.firestore().collection("usuario").doc(id).get();
                setUserData(userData.data());
            }
        });
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="home">
            <h1>Bem-vindo(a), {userData.nome}!</h1>
            <div className="user-card">
                <p><strong>Nome:</strong> {userData.nome}</p>
                <p><strong>Sobrenome:</strong> {userData.sobrenome}</p>
                <p><strong>Data de Nascimento:</strong> {userData.data_nascimento}</p>
            </div>
        </div>
    );
}