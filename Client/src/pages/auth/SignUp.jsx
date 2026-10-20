import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {FaUser, FaEnvelope, FaPhone, FaLock, FaShieldAlt, FaArrowRight, FaCheckCircle, FaEye, FaEyeSlash, FaBolt} from "react-icons/fa";
import { toast, Bounce } from "react-toastify";
import { EmailVerification, userRegiteration } from "../../lib/api/authApi";
import "bootstrap/dist/css/bootstrap.min.css";

const SignUp = () => {
  const [formData, setFormData] = useState({Name: "", Email: "", PhNo: "", Password: "", OTP: ""});
  const [otpSent, setOtpSent] = useState(false);
  const [otpSentEmail, setOtpSentEmail] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

   
  useEffect(() => {
    if (otpSent && formData.Email.trim() !== otpSentEmail) {
      setOtpSent(false);
      setFormData((prev) => ({ ...prev, OTP: "" }));
    }
  }, [formData.Email, otpSent, otpSentEmail]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleOtpRequest = async () => {
    const email = formData.Email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.warning("Please enter a valid email address.");
      return;
    }
    try {
      setOtpLoading(true);
      const response = await EmailVerification({Email: email});
      if (response.status === 200) {
        setOtpSentEmail(email);
        setOtpSent(true);
        toast.success("OTP sent successfully!", {transition: Bounce});
      }
    }
    catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP. Please try again.", { transition: Bounce });
    }
    finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpSent || otpSentEmail !== formData.Email.trim()) {
      toast.warning("Please verify your email first.");
      return;
    }
    if (formData.Password.length < 8) {
      toast.warning("Password must contain at least 8 characters.");
      return;
    }
    try {
      setSubmitting(true); 
      const response = await userRegiteration({...formData, Name: formData.Name.trim(), Email: formData.Email.trim(), PhNo: formData.PhNo.trim()});
      if (response.status === 200) {
        localStorage.setItem("Email", response.data.Email || formData.Email.trim());
        toast.success("Account created successfully!", {transition: Bounce});
        navigate("/signin");
      }
    }
    catch (error) {
      toast.error(error.response?.data?.message || "Signup failed. Please check your details.", { transition: Bounce });
    }
    finally {
      setSubmitting(false);
    }
  };

  const isFormValid =
    formData.Name.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email.trim()) &&
    formData.PhNo.trim() !== "" &&
    formData.Password.length >= 8 &&
    formData.OTP.trim() !== "" &&
    otpSent &&
    otpSentEmail === formData.Email.trim();

  const inputStyle = {minHeight: "48px", borderRadius: "12px", border: "1px solid #e2e5f0", backgroundColor: "#f9faff", fontSize: "14px", boxShadow: "none"};
  const labelStyle = {fontSize: "13px", fontWeight: "600", color: "#30364b", marginBottom: "8px"};
  const iconStyle = {color: "#7772ee", flexShrink: 0};

  return (
    <div
      style={{minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 12px", marginTop:"32px", background:"radial-gradient(circle at top left, #e4e6ff, transparent 40%), radial-gradient(circle at bottom right, #dceaff, transparent 35%), #f5f6fc", fontFamily: "Inter, system-ui, sans-serif"}}>
      <Container style={{ maxWidth: "500px" }}>
        <div className="bg-white" style={{padding: "clamp(24px, 5vw, 42px)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 24px 70px rgba(36,42,90,0.12)"}}>
          <div className="text-center mb-4">
            <span className="d-inline-flex align-items-center gap-2" style={{padding: "7px 12px", borderRadius: "30px", background: "#f0efff", color: "#5b50e9", fontSize: "10px", fontWeight: "800", letterSpacing: "1px", marginBottom: "15px"}}>
              <FaShieldAlt />CREATE YOUR ACCOUNT
            </span>
            <p className="mb-0" style={{color: "#85899d", fontSize: "13px", lineHeight: "1.8"}}>
              Create your account and bring your projects<br className="d-none d-sm-block" />together in one place.
            </p>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={labelStyle}>Full name</Form.Label>
              <div className="d-flex align-items-center gap-3 px-3">
                <FaUser style={iconStyle} />
                <Form.Control type="text" name="Name" placeholder="Enter your full name" value={formData.Name} onChange={handleChange} autoComplete="name" maxLength={100} required style={{...inputStyle, paddingLeft: "12px"}}/>
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={labelStyle}>Email address</Form.Label>
              <div className="d-flex align-items-center gap-2">
                <div className="d-flex align-items-center gap-2 flex-grow-1 px-3" style={{ minWidth: 0 }}>
                  <FaEnvelope style={iconStyle} />
                  <Form.Control type="email" name="Email" placeholder="you@example.com" value={formData.Email} onChange={handleChange} autoComplete="email" required style={{...inputStyle, minWidth: 0}}/>
                </div>
                <Button type="button" onClick={handleOtpRequest} disabled={otpLoading || (otpSent && otpSentEmail === formData.Email.trim())} style={{minHeight: "48px", minWidth: "82px", borderRadius: "12px", border: "none", fontSize: "12px", fontWeight: "700", background: otpSent && otpSentEmail === formData.Email.trim() ? "#e8f8ef" : "#efedff", color: otpSent && otpSentEmail === formData.Email.trim() ? "#168653" : "#5b50e9", opacity: 1}}>
                  {otpLoading ? ("Sending...") : otpSent && otpSentEmail === formData.Email.trim() ? (
                    <>
                      <FaCheckCircle className="me-1" />Verified
                    </>
                  ) : (
                    "Verify"
                  )}
                </Button>
              </div>
            </Form.Group>
            {otpSent && (
              <Form.Group className="mb-3 p-3" style={{background: "#f8f7ff", border: "1px solid #e8e5ff", borderRadius: "14px"}}>
                <Form.Label style={labelStyle}>Email verification code</Form.Label>
                <div className="d-flex align-items-center gap-3">
                  <FaShieldAlt style={iconStyle} />
                  <Form.Control type="text" name="OTP" placeholder="Enter your OTP" value={formData.OTP} onChange={handleChange} autoComplete="one-time-code" inputMode="numeric" required style={inputStyle}/>
                </div>
                <small className="d-block mt-2" style={{color: "#168653", fontSize: "11px", overflowWrap: "anywhere"}}>
                  <FaCheckCircle className="me-1" />OTP sent to {otpSentEmail}
                </small>
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label style={labelStyle}>Phone number</Form.Label>
              <div className="d-flex align-items-center gap-3 px-3">
                <FaPhone style={iconStyle} />
                <Form.Control type="tel" name="PhNo" placeholder="Enter your phone number" value={formData.PhNo} onChange={handleChange} autoComplete="tel" maxLength={20} required style={inputStyle}/>
              </div>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label style={labelStyle}>Password</Form.Label>
              <div className="d-flex align-items-center gap-3 px-3">
                <FaLock style={iconStyle} />
                <Form.Control type={showPassword ? "text" : "password"} name="Password" placeholder="Create a strong password" value={formData.Password} onChange={handleChange} autoComplete="new-password" minLength={8} required style={{...inputStyle, minWidth: 0}}/>
                <button type="button" onClick={() => setShowPassword((prev) => !prev)} aria-label={showPassword ? "Hide password" : "Show password"} style={{border: "none", background: "transparent", color: "#85899d", padding: "4px"}}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <small className="d-block mt-2" style={{ color: "#9296a8", fontSize: "11px" }}>Use at least 8 characters.</small>
            </Form.Group>
            <Button
              type="submit"
              disabled={!isFormValid || submitting}
              className="w-100 d-flex align-items-center justify-content-center gap-2"
              style={{minHeight: "51px", border: "none", borderRadius: "12px", background: "linear-gradient(115deg,#756bff,#5045e8)", color: "#fff", fontSize: "13px", fontWeight: "750", boxShadow: "0 8px 20px rgba(99,91,255,0.22)", opacity: !isFormValid || submitting ? 0.6 : 1}}>
              {submitting ? "Creating account..." : "Create account"}
              {!submitting && <FaArrowRight />}
            </Button>
            <p className="text-center mb-0 mt-4" style={{ color: "#85899d", fontSize: "12px" }}>
              Already have an account?{" "}
              <Link to="/signin" style={{color: "#5b50e9", fontWeight: "800", textDecoration: "none"}}>Sign in</Link>
            </p>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;