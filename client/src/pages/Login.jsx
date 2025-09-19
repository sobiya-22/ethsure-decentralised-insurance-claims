import { useAccount } from "wagmi";

 const Login = () => {
  const { address, isConnected } = useAccount();

  return (
    <div>
      {isConnected ? <p className="text-white">Connected: {address}</p> : <p>Not connected</p>}
    </div>
  );
};
export default Login;