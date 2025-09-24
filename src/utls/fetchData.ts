const URL = "http://localhost:8000";
function fetchData(path:string,request?:any){
    try{
    const response = fetch(`${URL}/${path}`,{
        method:"POST",
        body:JSON.stringify(request),
        headers: {"Content-Type":"application/json"}
    });
    console.log(response);
    }catch(error){
        console.log("Erro encontrado: ", error)
    }
}
export default fetchData;