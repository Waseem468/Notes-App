import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import "../../styles/login.css";

const Login = () => {
    const Navigater = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [loder, setLoder] = useState(false);

    const PostData = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Email can not be blank')
        }
        else if (!email.includes("@")) {
            toast.error("Enter Valid Email !")
        }
        else if (password === "") {
            toast.error("Password is required")
        }
        else if (password.length < 8) {
            toast.error("password is too short atleast 8 charecter")
        }
        else if (password) {
            const uppercaseRegExp = /(?=.*?[A-Z])/;
            const lowercaseRegExp = /(?=.*?[a-z])/;
            const digitsRegExp = /(?=.*?[0-9])/;
            const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
            const minLengthRegExp = /.{8,}/;
            const passwordLength = password.length;
            const uppercasepassword = uppercaseRegExp.test(password);
            const lowercasepassword = lowercaseRegExp.test(password);
            const digitspassword = digitsRegExp.test(password);
            const specialCharpassword = specialCharRegExp.test(password);
            const minLengthpassword = minLengthRegExp.test(password);

            if (passwordLength === 0) {
                return toast.error("password is empty");
            } else if (!uppercasepassword) {
                return toast.error("At least one Uppercase");
            } else if (!lowercasepassword) {
                return toast.error("At least one Lowercase");
            } else if (!digitspassword) {
                return toast.error("At least one digit");
            } else if (!specialCharpassword) {
                return toast.error("At least one Special Characters");
            } else if (!minLengthpassword) {
                return toast.error("At least minumum 8 characters");
            }

        }
        setLoder(true)

        fetch("https://note-app-5o9g.onrender.com/user/login", {

            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email, password })
        }).then(res => res.json()).then(res => {
            if (res.status === "Successfully login") {
                toast.success("Hello User WelCome to our website")

                localStorage.setItem("User-token", JSON.stringify(res.token));
                localStorage.setItem("User-Id", JSON.stringify(res.userId))
                Navigater("/landing")
            } else if (res.status === "fail") {
                setLoder(false)
                toast.error("Please Enter Correct Details")
                setError("User Details Not Match")
            }
        })
    };
    return (
        <div className='login'>
            <form method="POST" onSubmit={PostData}>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="email" placeholder='enter your email'
                        required onChange={(e) => setEmail(e.target.value)} value={email}
                        name="email" />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='enter your password'
                        required value={password} onChange={(e) => setPassword(e.target.value)}
                        name="password" />
                </div>
                <div className="remember-forget">
                    <label ><input type="checkbox" />Remember me</label>
                    <a href="#">Forgot password?</a>
                </div>
                <button type="submit" className='login-btn'>Login</button>
                <div className="register-link">
                    <Link to={"/register"}>
                        <p>Don't have an account? <span>Register</span></p>

                    </Link>
                </div>
            </form>
            <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                theme="colored"
            />
        </div>
    )
}

export default Login
