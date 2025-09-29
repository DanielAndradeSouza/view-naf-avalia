import "../index.css";
import LogoImg from "../component/logo_img";
import { useState } from "react";
function CreateQuestion(){
    const [text,setText] = useState("");
    const [type, setType] = useState("");
    const [options,setOptions] = useState([""]);
    return (
        <div>
            <LogoImg></LogoImg>
            <div className="conteiner">
                <div className="questions">
                    <label htmlFor="text">Cabeçalho</label>
                <input type="text" onChange={(e) => setText(e.target.value)}/>
                <select name="type" id="type" onChange={(e) => setType(e.target.value)}>
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio</option>
                </select>
                <button>Criar Nova Resposta</button>
                <button>Registrar</button>
                </div>
            </div>
        </div>
    )
}
export default CreateQuestion;