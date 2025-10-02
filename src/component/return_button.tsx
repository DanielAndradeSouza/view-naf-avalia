import { useNavigate } from "react-router-dom";

function ReturnButton({ path }: { path: string }) {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(path)}>
      Voltar
    </button>
  );
}

export default ReturnButton;
