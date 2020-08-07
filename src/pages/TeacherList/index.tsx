import React, { useState, FormEvent } from 'react';
import "./style.css";
import PageHeader from '../../component/PageHeader';
import TeacherItem, { Teacher } from '../../component/TeacherItem';
import Input from '../../component/Input';
import Select from '../../component/Select';
import api from '../../services/api';

const TeacherList = () => {
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');
    const [teachers, setTeachers] = useState([]);

    async function searchTeacher(e: FormEvent){
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        })
        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os Proffys disponiveis.">
                <form onSubmit={searchTeacher} id="search-teachers">
                    <Select
                        value={subject}
                        onChange={(e)=> {setSubject(e.target.value)}}
                        name="subject" 
                        label="Matéria"
                        options={[
                            {value: 'Artes', label: "Artes"},
                            {value: 'Biologia', label: "Biologia"},
                            {value: 'Ciencia', label: "Ciência"},
                            {value: 'Matemática', label: "Matemática"},
                            {value: 'História', label: "História"},
                            {value: 'Português', label: "Português"},
                            {value: 'Educação Fisica', label: "Educação Física"},
                        ]}    
                    />
                    <Select
                        name="week_day" 
                        label="Dia da semana"
                        value={week_day}
                        onChange={(e)=> {setWeekDay(e.target.value)}}
                        options={[
                            {value: '1', label: "Segunda"},
                            {value: '2', label: "Terça"},
                            {value: '3', label: "Quarta"},
                            {value: '4', label: "Quinta"},
                            {value: '5', label: "História"},
                            {value: '6', label: "Sabado"},
                            {value: '0', label: "Domingo"},
                        ]}    
                    />
                    <Input 
                        value={time}
                        onChange={(e)=> {
                            setTime(e.target.value)}}
                        type="time" 
                        name="time" 
                        label="Hora"/>
                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher}/>
                })}
            </main>
        </div>
    )
}

export default TeacherList;