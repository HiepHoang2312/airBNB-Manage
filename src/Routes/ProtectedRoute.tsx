import { useSelector } from "react-redux";
import { RootState } from "configStore";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}
const ProtectedRoute = ({ children }: Props) => {
  //kiểm tra xem user đã đăng nhập hay chưa
  const { user } = useSelector((state: RootState) => state.login);
  if (!user) {
    //chưa đăng nhập
    return <Navigate to={"/"} />;
  }
  return children;
};

export default ProtectedRoute;
