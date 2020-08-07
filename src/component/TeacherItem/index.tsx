import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import "./style.css"
import api from '../../services/api';

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {
    
    function createNewConnection () {
        api.post("connection", {
            user_id: teacher.id,
        })
    }
    
    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name}/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>
                {teacher.bio}
            </p>

            <footer>
                <p>
                    Preço/Hora
                    <strong>R${teacher.cost}</strong>
                </p>
                <a target="_blanck" onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`}>
                    <img src={whatsappIcon} alt="Whatsapp icone"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem;