import { LoginForm } from "@/components/Admin/LoginForm";

const Login = () => {
    
    return(
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
            <LoginForm hasSignUp={true} login_type="vendor" />
        </div>
    </div>
    )
}


export default Login;