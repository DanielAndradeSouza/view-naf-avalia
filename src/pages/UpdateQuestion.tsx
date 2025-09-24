import "../index.css";
import LogoImg from "../component/logo_img";
import { useState } from "react";
function UpdateQuestion(question:any){
    const [text,setText] = useState("");
    const [order,setOrder] = useState();
    const [options,setOptions] = useState([""]);
    return (
        <div>
            <LogoImg></LogoImg>
            <div className="conteiner">
                <input type="text" content={question.text} onChange={(e) => setText(e.target.value)}/>
                <select name="type" id="type" content={question.type}>
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio</option>
                </select>
            </div>
        </div>
    )
}
export default UpdateQuestion;