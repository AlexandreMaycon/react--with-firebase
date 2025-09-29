import { useState } from "react";
import '../form.css';
import firebase from "../../../services/Firebase";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                navigate('/home');
            })
            .catch((error) => {
                setMessage('Usuário ou senha incorretos!');
            });
    }

    return (
        <div className="container-form">
            <h1>Login</h1>

            <form onSubmit={handleSubmit} className="form">
                <div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setMessage('')
                        }}
                        required
                    />
                </div>

                <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setMessage('')
                        }}
                        required
                    />
                </div>

                <button type="submit">Acessar</button>
            </form>
            {message && <p>{message}</p>}
            <p>Não possui uma conta? <a href="/register">Registre-se</a></p>
        </div>
    );
}