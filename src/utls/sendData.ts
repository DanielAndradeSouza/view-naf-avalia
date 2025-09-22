function sendData(request:any){
    const response = fetch("/Form",{
        method:"POST",
        body:JSON.stringify(request),
        headers: {"Content-Type":"application/json"}
    });
    console.log(response);
}
export default sendData;