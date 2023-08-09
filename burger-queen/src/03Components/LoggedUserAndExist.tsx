import { useNavigate } from "react-router-dom";
import exit from "../04Images/exit.png";

export const LoggedUserAndExist = () => {
  const userInfo: string = localStorage.getItem("userEmail")!;

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-end">
    <h1 className=" text-[1.5rem] text-darkBrown font-extrabold">{userInfo}</h1>
    <img src={exit} onClick={handleLogOut} className="w-[50px] h-auto"/>
  </div>
  );
};