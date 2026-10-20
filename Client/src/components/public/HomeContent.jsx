import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import {FaArrowRight, FaCheckCircle, FaLayerGroup, FaRobot, FaTasks, FaChartLine, FaRegClock, FaBullseye} from "react-icons/fa";

const HomeContent = () => {
  const features = [
    {
      icon: <FaLayerGroup />,
      title: "Personal Task Boards",
      description:
        "Organize your personal projects, break down big goals, and manage every task in one place.",
      color: "#6366f1",
      bg: "#eef2ff",
    },
    {
      icon: <FaChartLine />,
      title: "Flexible Task Views",
      description:
        "Track tasks by status and get a clear overview of what is pending, in progress, or completed.",
      color: "#0891b2",
      bg: "#ecfeff",
    },
    {
      icon: <FaRobot />,
      title: "Smart Organization",
      description:
        "Keep your workflow organized, reduce distractions, and make your daily planning simpler.",
      color: "#9333ea",
      bg: "#faf5ff",
    },
  ];

  const benefits = [
    {
      icon: <FaTasks />,
      title: "Track Every Task",
      description:
        "Keep all your tasks organized by status so you always know what needs to be done next.",
    },
    {
      icon: <FaBullseye />,
      title: "Focus on What Matters",
      description:
        "Identify your priorities, organize important work, and focus on one task at a time.",
    },
    {
      icon: <FaRegClock />,
      title: "Stay on Schedule",
      description:
        "Keep deadlines visible and plan your day with greater clarity and confidence.",
    },
    {
      icon: <FaChartLine />,
      title: "Monitor Your Progress",
      description:
        "See what you have completed, what is in progress, and what still needs your attention.",
    },
  ];

  const highlights = [
    "Simple to use",
    "Stay focused",
    "Track your progress",
  ];

  return (
    <div style={{ color: "#172033", overflow: "hidden" }}>
      <section style={{marginTop: "76px", background: "radial-gradient(circle at 15% 20%, rgba(129,140,248,0.28), transparent 35%), radial-gradient(circle at 85% 30%, rgba(192,132,252,0.22), transparent 32%), linear-gradient(135deg, #f8faff 0%, #eef2ff 55%, #faf5ff 100%)"}}>
        <Container className="py-5">
          <Row className="align-items-center py-lg-5">
            <Col lg={6} className="py-4">
              <h1 className="fw-bold mb-4" style={{fontSize: "clamp(2.5rem, 5vw, 4.2rem)", lineHeight: 1.12, letterSpacing: "-2px"}}>
                Turn your plans into
                <span className="d-block" style={{background:"linear-gradient(90deg, #4f46e5, #9333ea)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>
                  progress.
                </span>
              </h1>
              <p className="mb-4" style={{color: "#64748b", fontSize: "1.08rem", lineHeight: 1.9, maxWidth: "490px"}}>
                Organize your daily tasks, manage priorities, and keep track of deadlines — all in one simple personal workspace. Stay focused, build better habits, and get more done at your own pace.
              </p>
              <div className="d-flex flex-wrap align-items-center gap-3">
                <Button as={Link} to="/signup" className="d-inline-flex align-items-center gap-2 px-4 py-3 border-0 rounded-3 fw-semibold" style={{background:"linear-gradient(135deg, #6366f1, #4f46e5)", boxShadow: "0 8px 20px rgba(79,70,229,0.22)"}}>
                  Get Started — It's Free <FaArrowRight size={13} />
                </Button>
              </div>
              <div className="d-flex flex-wrap gap-3 mt-4">
                {highlights.map((item) => (
                  <span key={item} className="d-flex align-items-center gap-2 small" style={{ color: "#64748b" }}>
                    <FaCheckCircle style={{ color: "#6366f1" }} />{item}
                  </span>
                ))}
              </div>
            </Col>
            <Col lg={6} className="mt-4 mt-lg-0">
              <div
                className="p-2 p-md-3 rounded-4"
                style={{background: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 25px 70px rgba(51,65,120,0.15)"}}>
                <img src="/heroimg.jpeg" alt="Personal taskboard and productivity workspace" className="img-fluid rounded-3 w-100" style={{display: "block", objectFit: "cover"}}/>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-5">
        <Container className="py-lg-4">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: "650px" }}>
            <span className="text-uppercase fw-bold small" style={{ color: "#6366f1", letterSpacing: "2px"}}>
              Everything in one place
            </span>
            <h2 className="fw-bold mt-3 mb-3" style={{fontSize: "clamp(1.8rem, 4vw, 2.7rem)", letterSpacing: "-1px"}}>
              Everything you need to stay organized
            </h2>
            <p className="text-secondary mb-0" style={{ lineHeight: 1.8 }}>
              Bring your tasks, priorities, and daily plans together in one workspace designed around your productivity.
            </p>
          </div>
          <Row className="g-4">
            {features.map((feature) => (
              <Col md={6} lg={4} key={feature.title}>
                <div className="h-100 rounded-4 p-4 p-lg-5" style={{background: "#ffffff", border: "1px solid #e9edf5", boxShadow: "0 8px 28px rgba(15,23,42,0.035)"}}>
                  <div className="d-flex align-items-center justify-content-center rounded-3 mb-4" style={{width: "54px", height: "54px", background: feature.bg, color: feature.color, fontSize: "23px"}}>
                    {feature.icon}
                  </div>
                  <h4 className="fw-bold mb-3">
                    {feature.title}
                  </h4>
                  <p className="mb-0" style={{color: "#64748b", lineHeight: 1.8}}>
                    {feature.description}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section className="py-5" style={{background: "linear-gradient(180deg, #f8faff, #ffffff)"}}>
        <Container className="py-lg-5">
          <Row className="align-items-center g-5">
            <Col lg={5}>
              <span className="text-uppercase fw-bold small" style={{color: "#6366f1", letterSpacing: "2px"}}>
                Work smarter
              </span>
              <h2 className="fw-bold mt-3 mb-4" style={{fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.2, letterSpacing: "-1px"}}>
                Take control of your day.
              </h2>

              <p className="mb-4" style={{color: "#64748b", lineHeight: 1.9}}>
                From your first task to your final accomplishment, plan your work, focus on priorities, and make steady progress toward your goals.
              </p>
            </Col>
            <Col lg={7}>
              <div className="d-flex flex-column gap-3">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="d-flex align-items-start gap-3 rounded-4 p-4" style={{background: "#ffffff", border: "1px solid #e9edf5", boxShadow: "0 6px 20px rgba(15,23,42,0.035)"}}>
                    <div className="d-flex align-items-center justify-content-center flex-shrink-0 rounded-3" style={{width: "46px", height: "46px", background: "#eef2ff", color: "#4f46e5", fontSize: "19px"}}>
                      {benefit.icon}
                    </div>
                    <div>
                      <h5 className="fw-bold mb-2">{benefit.title}</h5>
                      <p className="mb-0" style={{color: "#64748b", lineHeight: 1.7}}>
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="px-3 py-5">
        <Container className="py-3 py-lg-4">
          <div className="text-center rounded-4 p-4 p-md-5" style={{background:"linear-gradient(135deg, #4338ca 0%, #6366f1 55%, #8b5cf6 100%)", boxShadow: "0 18px 45px rgba(79,70,229,0.18)", color: "#ffffff"}}>
            <FaTasks size={35} className="mb-3"/><h2 className="fw-bold mb-3">Ready to get things done?</h2>
            <p className="mx-auto mb-4" style={{maxWidth: "570px", lineHeight: 1.8, color: "rgba(255,255,255,0.85)"}}>
              Create your personal workspace, organize your tasks, and turn your everyday plans into meaningful progress.
            </p>
            <Button as={Link} to="/signup" className="bg-white text-primary border-0 rounded-3 px-4 py-3 fw-bold">
              Create Your Account <FaArrowRight className="ms-2" size={13} />
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default HomeContent;