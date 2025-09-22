function sendData(request:any){
    try{
    const response = fetch("/Form",{
        method:"POST",
        body:JSON.stringify(request),
        headers: {"Content-Type":"application/json"}
    });
    console.log(response);
    }catch(error){
        console.log("Erro encontrado: ", error)
    }
}
export default sendData;