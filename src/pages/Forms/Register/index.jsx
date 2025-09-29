import { useState } from "react";
import firebase from "../../../services/Firebase";
import '../form.css';

const INITIAL_FORM_STATE = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    birthDate: ''
};

export const Register = () => {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const resp = await firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password);

        await firebase.firestore().collection("usuario").doc(resp.user.uid).set({
            nome: formData.name,
            sobrenome: formData.lastName,
            data_nascimento: formData.birthDate
        })
        
        setFormData(INITIAL_FORM_STATE);
    }

    return (
        <div className="container-form">
            <h1>Register</h1>

            <form onSubmit={handleSubmit} className="form">
                <div>
                    <input
                        type="text"
                        id="name"
                        placeholder="Nome"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                    />
                </div>

                <div>
                    <input
                        type="text"
                        id="lastName"
                        placeholder="Sobrenome"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        required
                    />
                </div>

                <div>
                    <input
                        type="date"
                        id="birthDate"
                        placeholder="Data de Nascimento"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                        required
                    />
                </div>

                <div>
                    <input
                        type="email"
                        id="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                </div>

                <div>
                    <input
                        type="password"
                        id="password"
                        placeholder="Senha"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                        minLength={6}
                    />
                </div>
                <button type="submit">Cadastrar</button>
                <p>Já possui uma conta? <a href="/">Faça login</a></p>
            </form>
        </div>
    );
};
