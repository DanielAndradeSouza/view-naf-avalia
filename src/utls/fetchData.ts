// fetchData.ts
export default async function fetchData(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, options);

    const isJson = response.headers.get("content-type")?.includes("application/json");
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      const errorMessage = data
        ? Object.values(data).join("\n") 
        : `Erro HTTP ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error("Erro no fetchData:", error);
    throw error; 
  }
}
