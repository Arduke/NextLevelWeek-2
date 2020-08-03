import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import "./style.css"


const TeacherItem = () => {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars2.githubusercontent.com/u/23370502?s=460&u=e90105ccb424867e8579d4a54bc09227e7c92eaf&v=4" alt="Carlos Eduardo"/>
                <div>
                    <strong>Carlos Eduardo</strong>
                    <span>Quimica</span>
                </div>
            </header>

            <p>
                BLABLABLABLABLABLABLABLABLABLA
            </p>

            <footer>
                <p>
                    Preço/Hora
                    <strong>R$ 80,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp icone"/>
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem;