import "../index.css";
import "../styles/Form.css"
import LogoImg from "../component/logo_img";
import { useState } from "react";
function CreateQuestion(){
    const [text,setText] = useState("");
    const [order,setOrder] = useState();
    const [options,setOptions] = useState([""]);
    return (
        <div>
            <LogoImg></LogoImg>
            <div className="conteiner">
                <div className="questions">
                <input type="text" onChange={(e) => setText(e.target.value)}/>
                <select name="type" id="type">
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio</option>
                </select>
                </div>
            </div>
        </div>
    )
}
export default CreateQuestion;