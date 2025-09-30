// fetchData.ts
export default async function fetchData(url: string, header?:RequestInit,answer?:any) {
  try {
    const response = await fetch(`http://localhost:8000/${url}`,header);
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data; 
  } catch (error) {
    console.error(error);
    return []; 
  }
}
