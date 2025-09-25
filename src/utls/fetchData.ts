// fetchData.ts
export default async function fetchData(url: string) {
  try {
    const response = await fetch(`http://localhost:8000/${url}`);
    console.log(response.body);
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.status}`);
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error(error);
    return []; 
  }
}
