import { useNavigate } from "react-router-dom";
import { VscArrowLeft } from "react-icons/vsc";
function ReturnButton({ path }: { path: string }) {
  const navigate = useNavigate();

  return (
    <button className="return-button" onClick={() => navigate(path) }>
      <VscArrowLeft></VscArrowLeft>
    </button>
  );
}

export default ReturnButton;
