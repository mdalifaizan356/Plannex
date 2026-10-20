import React, { useState, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import {FaEnvelope, FaLock, FaArrowRight, FaBolt, FaEye, FaEyeSlash, FaShieldAlt} from "react-icons/fa";
import { toast, Bounce } from "react-toastify";
import { UserContext } from "../../ContextProvider/UserContextProvider";
import { signIn } from "../../lib/api/authApi";

const SignIn = () => {
  const navigate = useNavigate();
  const { fetchUser } = useContext(UserContext);
  const [formData, setFormData] = useState({Email: "", Password: ""});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    try {
      setSubmitting(true);
      const response = await signIn({Email: formData.Email.trim(), Password: formData.Password,});
      if (response.status === 200) {
        const { token, user } = response.data;
        if (token) {
          localStorage.setItem("token", token);
        }
        await fetchUser();
        toast.success(`Login Successful! Welcome ${user?.Name || ""}`, { transition: Bounce });
        navigate("/dashboard");
      }
    }
    catch (error) {
      console.error("Error during Login:", error);
      toast.error(error.response?.data?.message || "Login failed! Please check your credentials.", { transition: Bounce });
    }
    finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {minHeight: "50px", borderRadius: "12px", border: "1px solid #e2e5f0", backgroundColor: "#f9faff", fontSize: "14px", boxShadow: "none"};
  const labelStyle = {fontSize: "13px", fontWeight: "600", color: "#30364b", marginBottom: "9px"};
  const iconStyle = {color: "#7772ee", flexShrink: 0};

  return (
    <div style={{minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 12px", background: "radial-gradient(circle at top left, #e4e6ff, transparent 40%), radial-gradient(circle at bottom right, #dceaff, transparent 35%), #f5f6fc", fontFamily: "Inter, system-ui, sans-serif"}}>
      <Container style={{ maxWidth: "470px" }}>
        <div className="bg-white" style={{padding: "clamp(26px, 5vw, 42px)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 24px 70px rgba(36,42,90,0.12)"}}>
          <div className="text-center mb-4">
            <span className="d-inline-flex align-items-center gap-2" style={{padding: "7px 12px", borderRadius: "30px", background: "#f0efff", color: "#5b50e9", fontSize: "10px", fontWeight: "800", letterSpacing: "1px", marginBottom: "16px"}}>
              <FaShieldAlt />WELCOME BACK
            </span>
            <p style={{color: "#85899d", fontSize: "13px", lineHeight: "1.8", marginBottom: 0}}>
              Sign in to continue managing your tasks <br className="d-none d-sm-block" /> and projects.
            </p>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label style={labelStyle}>Email address</Form.Label>
              <div className="d-flex align-items-center gap-3 px-3">
                <FaEnvelope style={iconStyle} />
                <Form.Control type="email" name="Email" placeholder="you@example.com" value={formData.Email} onChange={handleChange} autoComplete="email" required style={inputStyle}/>
              </div>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label style={labelStyle}>Password</Form.Label>
              <div className="d-flex align-items-center gap-3 px-3">
                <FaLock style={iconStyle} />
                <Form.Control type={showPassword ? "text" : "password"} name="Password" placeholder="Enter your password" value={formData.Password} onChange={handleChange} autoComplete="current-password" required style={{...inputStyle, minWidth: 0}}/>
                <button type="button" onClick={() =>setShowPassword((prev) => !prev)} aria-label={showPassword ? "Hide password" : "Show password"} style={{border: "none", background: "transparent", color: "#85899d", padding: "4px"}}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </Form.Group>
          
            <div className="text-end mb-4 mt-3">
              <Link to="/forgetpass" style={{color: "#5b50e9", fontSize: "12px", fontWeight: "700", textDecoration: "none"}}>Forgot password?</Link>
            </div>
            <Button type="submit" disabled={submitting} className="w-100 d-flex align-items-center justify-content-center gap-2" style={{minHeight: "52px", border: "none", borderRadius: "12px", background: "linear-gradient(115deg,#756bff,#5045e8)", color: "#fff", fontSize: "13px", fontWeight: "750", boxShadow: "0 8px 20px rgba(99,91,255,0.22)", opacity: submitting ? 0.7 : 1}}>
              {submitting ? "Signing in..." : "Sign in"}{!submitting && <FaArrowRight />}
            </Button>
            <p className="text-center mt-4 mb-0" style={{color: "#85899d", fontSize: "12px"}}>
              Don't have an account?{" "}
              <Link to="/signup" style={{color: "#5b50e9", fontWeight: "800", textDecoration: "none"}}>Create account</Link>
            </p>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;