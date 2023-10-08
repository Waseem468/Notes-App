import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/register.css"

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        password: '',
        confirmPassword: ''
    })
    const [loder, setLoder] = useState(false)
    const [errorText, setErrorText] = useState('');

    //Validation for user registration

    function doValidate() {
        const { name, email, contact, password, confirmPassword } = formData
        if (!name) {
            toast.error('name can not be blank')
        }
        else if (!email) {
            toast.error('email can not be blank')
        }
        else if (/\d+/.test(name)) {
            toast.error('Name should contain small case and upper case alphabets')
        }
        else if (!email.includes('@')) {
            toast.error('email should contain @')
        }
        else if (!password) {
            toast.error('password can not be blank')
        }
        else if (!confirmPassword) {
            toast.error('confirmPassword can not be blank')
        }
        else if (password !== confirmPassword || confirmPassword !== password) {
            toast.error('password and confirm password must be same')
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
                toast.error("password is empty");
            } else if (!uppercasepassword) {
                toast.error("At least one Uppercase");
            } else if (!lowercasepassword) {
                toast.error("At least one Lowercase");
            } else if (!digitspassword) {
                toast.error("At least one digit");
            } else if (!specialCharpassword) {
                toast.error("At least one Special Characters");
            } else if (!minLengthpassword) {
                toast.error("At least minumum 8 characters");
            }

            return ''
        }
    }

    let name, value
    function handleInputs(e) {
        name = e.target.name;
        value = e.target.value;
        setFormData({ ...formData, [name]: value })
    }

    //fuction for register user

    const postData = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = formData;
        const errorMessage = doValidate()
        if (errorMessage) {
            setErrorText(errorMessage)
            console.log('Validation failed! can not submit form.')
        }
        else {
            setLoder(true)
            const res = await fetch('http://localhost:5000/user/register', {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    name, email, password, confirmPassword
                })
            });
            const data = await res.json();
            if (data.status === 'Failed') {
                toast.error("User Allready Exists")
                console.log("user already exist")
            }
            else if(data.status==='success') {
                toast.success("Registration Successfull");
                console.log("Registration Successfull");
                window.alert("Registration Successfull")
                setErrorText("")
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                navigate('/')
            }
        }
    }

    return (
        <div className="home">
            <div className="register-login-form" id="form">
                <form method="POST" className="form-container">
                    <h2 className="register-heading">Register Your Account</h2>
                    <div className='register-login-admin'>
                        <input onChange={handleInputs}
                            value={formData.name}
                            type="text"
                            name="name"
                            placeholder="name"
                        />
                    </div>
                    <div className='register-login-admin'>
                        <input onChange={handleInputs}
                            value={formData.email}
                            type="email"
                            name="email"
                            placeholder="email"
                        />
                    </div>
                    <div className='register-login-admin'>
                        <input onChange={handleInputs}
                            value={formData.password}
                            type="text"
                            name="password"
                            placeholder="password"
                        />
                    </div>
                    <div className='register-login-admin'>
                        <input onChange={handleInputs}
                            value={formData.confirmPassword}
                            type="text"
                            name="confirmPassword"
                            placeholder="confirm password"
                        />
                    </div>
                    <div className="register-button">
                        <Link to={'/'}>
                            <div type="submit" className="signin" >Signin</div></Link>
                        <button type="submit" className="register-btn2" onClick={postData}>
                            Register
                        </button>
                    </div>
                </form>

            </div>
            <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                theme="light"
            />
        </div>
    )
}

export default Register
