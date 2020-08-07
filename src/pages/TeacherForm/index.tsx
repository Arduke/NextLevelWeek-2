import React, {useState, FormEvent} from 'react';
import {useHistory} from 'react-router-dom';
import "./style.css"
import PageHeader from '../../component/PageHeader';
import Input from '../../component/Input';
import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../component/Textarea';
import Select from '../../component/Select';
import api from '../../services/api';

const TeacherForm = () => {
    //seria mais adequado usar um componente baseado em classe devido a gigantesca quantidade de campos e variaveis a serem criadas
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [cost, setCost] = useState('');
    const [subject, setSubject] = useState('');
    const history = useHistory();

    const [scheduleItems, setScheduleItems] = useState([
            {week_day: 0, from: '', to: ''},
        ]);
 
    
    function addNewScheduleItem () {
        setScheduleItems([...scheduleItems, {week_day: 0, from: '', to: ""}])
    }
    

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updateSchedule = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            } 
            return scheduleItem;
        })

        setScheduleItems(updateSchedule);
    }

    function handleCreateClass(e:FormEvent){
        e.preventDefault();
        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule:scheduleItems
        }).then(() => {
            alert('cadastro realizado');
            history.push('/');
        }).catch(()=> {
            alert('erro no cadastro');
        })
    }
    return (
        <div id="page-teacher-form" >
            <PageHeader 
                title="Que bom que você quer dar aulas"
                description="O primeiro passo é preencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input 
                            name="name" value={name} 
                            onChange={(e)=> {setName(e.target.value)}} 
                            label="Nome completo"/>
                        
                        <Input 
                            name="avatar" value={avatar} 
                            onChange={(e)=> {setAvatar(e.target.value)}} 
                            label="Avatar"/>
                        
                        <Input 
                            name="whastapp" value={whatsapp} 
                            onChange={(e)=> {setWhatsapp(e.target.value)}} 
                            label="WhatsApp"/>

                        <Textarea 
                            name="bio" value={bio} 
                            onChange={(e)=> {setBio(e.target.value)}} 
                            label="Biografia"/>
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select 
                            name="subject" 
                            label="Matéria"
                            value={subject}
                            onChange={(e)=> {setSubject(e.target.value)}}
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
                        <Input 
                            name="cost" 
                            label= "Custo da sua hora por aula"
                            value={cost}
                            onChange={(e)=> {setCost(e.target.value)}}
                            />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponiveis
                            <button onClick={addNewScheduleItem} type="button"> 
                                + Novo Horário 
                            </button>
                        </legend>
                        
                        {scheduleItems.map((scheduleItem,index)  => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select 
                                        name="week_day" 
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={e=> setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            {value: '0', label: "domingo"},
                                            {value: '1', label: "segunda-feita"},
                                            {value: '2', label: "terça-feira"},
                                            {value: '3', label: "quarta-feira"},
                                            {value: '4', label: "quinta-feira"},
                                            {value: '5', label: "sexta-feira"},
                                            {value: '6', label: "sabado"},
                                        ]}    
                                    />
                                    <Input
                                        onChange={(e)=> setScheduleItemValue(index, 'from', e.target.value)}
                                        name='from' 
                                        value={scheduleItem.from}
                                        label='Das' 
                                        type="time"/>
                                    <Input
                                        onChange={(e)=> setScheduleItemValue(index, 'to', e.target.value)}
                                        name="to" 
                                        label="Até" 
                                        value={scheduleItem.to}
                                        type="time"/>
                                </div>
                            )
                        } )}
                    </fieldset>
                    
                    <footer>
                        <p>
                            <img src={warningIcon} alt= "Aviso importante"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>  
    )
}

export default TeacherForm;