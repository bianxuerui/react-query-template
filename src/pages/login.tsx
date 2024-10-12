import { useState } from "react";
import { useLogin } from "../hooks/api";
import { useQueryClient } from 'react-query';
import App from "../App";

const Login = () => {
    const queryClient = useQueryClient();
    const [username, setusername] = useState<string>('')
    const [password, setPassword] = useState<number>()

    const { data, refetch } = useLogin({ username, password });

    if (data.data) {
        queryClient.invalidateQueries();
        // 跳转到app页面
        return <App />
    }

    return <>
        <div>用户名：<input value={username} onChange={(e) => setusername(e.target.value)} /></div>
        <div>密码：<input value={password} onChange={(e) => setPassword(Number(e.target.value))} /></div>
        <button onClick={() => refetch()}>登录</button>
    </>
}

export default Login;