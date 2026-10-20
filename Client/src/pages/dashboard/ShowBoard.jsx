import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../ContextProvider/UserContextProvider";
import { userBoards, createNewBoard } from "../../lib/api/boardAPI";
import {Button, Form, Modal, Card, Container, Spinner, Alert} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import {Plus, LayoutGrid, ArrowUpRight, PanelsTopLeft, Palette, X} from "lucide-react";

const ShowBoard = () => {
  const [showModal, setShowModal] = useState(false);
  const [newBoard, setNewBoard] = useState({name: "", color: "#E84711"});
  const [boardData, setBoardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { user } = useContext(UserContext);
  const userId = user?._id;
  const navigate = useNavigate();

  // Fetch boards
  const fetchBoardData = async () => {
    if (!userId) {
      setLoading(false);
      setBoardData([]);
      return;
    }
    try {
      setError("");
      const response = await userBoards(userId);
      setBoardData(Array.isArray(response.data.boards) ? response.data.boards : []);
    }
    catch (err) {
      console.error("Error fetching boards:", err);
      setError("Unable to load your boards. Please try again.");
    }
    finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchBoardData();
  }, [userId]);

  // Create a new board
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setError("Please log in to create a board.");
      return;
    }
    if (!newBoard.name.trim()) {
      return;
    }
    setSubmitting(true);
    try {
      const response = await createNewBoard(userId, {boardName: newBoard.name.trim(), boardColor: newBoard.color});
      if (response.status === 200 || response.status === 201) {
        setNewBoard({name: "", color: "#E84711"});
        setShowModal(false);
        await fetchBoardData();
      }
    }
    catch (err) {
      console.error("Error creating board:", err);
      setError(err.response?.data?.message || "Failed to create board. Please try again.");
    }
    finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setNewBoard((prev) => ({...prev, [field]: value}));
  };

  const viewHandler = (board) => {
    navigate(`/dashboard/manageboard/${board._id}`, {state: { boardData: board }});
  };

  const closeModal = () => {
    if (submitting) return;
    setShowModal(false);
    setNewBoard({name: "", color: "#E84711"});
  };

  return (
    <Container fluid className="px-3 px-md-4 py-4 py-lg-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-2" style={{color: "#172033", letterSpacing: "-1px"}}>My Boards</h2>
          <p className="text-secondary mb-0">Organize your work, manage projects and stay productive.</p>
        </div>
        <Button variant="dark" className="d-inline-flex align-items-center justify-content-center gap-2 rounded-3 px-4 py-3 fw-semibold" onClick={() => {setError(""); setShowModal(true)}} style={{backgroundColor: "#4338CA", borderColor: "#4338CA", boxShadow: "0 6px 16px rgba(67, 56, 202, 0.18)"}}>
          <Plus size={19} /> Create New Board
        </Button>
      </div> 
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <p className="text-secondary small mb-0">Select a board to open and manage it.</p>
        </div>

        {!loading && boardData.length > 0 && (
          <span className="rounded-pill px-3 py-2 small fw-semibold" style={{backgroundColor: "#F1F5F9", color: "#475569"}}>
            {boardData.length}{" "}
            {boardData.length === 1 ? "board" : "boards"}
          </span>
        )}
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")} className="rounded-3">
          {error}
          {boardData.length === 0 && !loading && (
            <div className="mt-2">
              <Button variant="outline-danger" size="sm" onClick={fetchBoardData}>Try again</Button>
            </div>
          )}
        </Alert>
      )}
      {loading ? (
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
          <Spinner animation="border" variant="primary" className="mb-3" />
          <p className="text-secondary mb-0">Loading your boards...</p>
        </div>
      ) : boardData.length === 0 ? (
        <Card className="border rounded-4 text-center" style={{borderColor: "#E2E8F0", borderStyle: "dashed", backgroundColor: "#FFFFFF"}}>
          <Card.Body className="py-5 px-3 px-md-4">
            <div className="d-flex align-items-center justify-content-center rounded-4 mx-auto mb-4" style={{width: 76, height: 76, backgroundColor: "#EEF2FF", color: "#4F46E5"}}>
              <PanelsTopLeft size={35} />
            </div>
            <h5 className="fw-bold mb-2" style={{ color: "#172033" }}>No boards yet</h5>
            <p className="text-secondary mx-auto mb-4" style={{ maxWidth: 360 }}>
              Create your first board and start organizing your projects in one place.
            </p>
            <Button className="d-inline-flex align-items-center gap-2 rounded-3 px-4 py-2 fw-semibold" onClick={() => setShowModal(true)} style={{backgroundColor: "#4338CA", borderColor: "#4338CA"}}>
              <Plus size={18} />Create Your First Board
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={18}
          breakpoints={{
            576: {slidesPerView: 2, spaceBetween: 18},
            768: {slidesPerView: 2, spaceBetween: 20},
            992: {slidesPerView: 3, spaceBetween: 22},
            1200: {slidesPerView: 4, spaceBetween: 22},
          }}
          navigation pagination={{ clickable: true }} modules={[Pagination, Navigation]} className="pb-5"
        >
          {boardData.map((board) => (
            <SwiperSlide key={board._id} className="h-auto py-2">
              <Card role="button" tabIndex={0} onClick={() => viewHandler(board)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    viewHandler(board);
                  }
                }}
                className="h-100 border-0 rounded-4 overflow-hidden" style={{cursor: "pointer", backgroundColor: "#FFFFFF", boxShadow: "0 4px 22px rgba(15, 23, 42, 0.07)", transition: "transform 0.2s ease, box-shadow 0.2s ease"}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 30px rgba(15, 23, 42, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 22px rgba(15, 23, 42, 0.07)";
                }}
              >
                <div style={{ height: 7, backgroundColor: board.boardColor || "#4338CA"}}/>
                <Card.Body className="p-4 d-flex flex-column">
                  <div className="d-flex align-items-start justify-content-between gap-2 mb-4">
                    <div className="d-flex align-items-center justify-content-center rounded-3" style={{width: 48, height: 48, flexShrink: 0, backgroundColor: `${board.boardColor || "#4338CA"}18`, color: board.boardColor || "#4338CA"}}>
                      <PanelsTopLeft size={23} />
                    </div>
                    <span className="d-inline-flex align-items-center gap-1 rounded-pill px-2 py-1 small" style={{backgroundColor: "#F8FAFC", color: "#64748B", fontSize: 11}}>
                      <span className="rounded-circle" style={{width: 7, height: 7, backgroundColor: board.boardColor || "#4338CA"}}/>Board</span>
                  </div>
                  <h5 className="fw-bold mb-2 text-break" style={{color: "#172033", minHeight: 48, overflowWrap: "anywhere"}}>
                    {board.boardName}
                  </h5>
                  <p className="text-secondary small mb-4" style={{fontSize: 12, overflowWrap: "anywhere"}}>ID: {board._id}</p>
                  <div className="d-flex align-items-center justify-content-between mt-auto pt-3" style={{borderTop: "1px solid #F1F5F9"}}>
                    <span className="small fw-semibold" style={{ color: "#4338CA" }}>Open board</span>
                    <div className="d-flex align-items-center justify-content-center rounded-circle" style={{width: 34, height: 34, backgroundColor: "#EEF2FF", color: "#4338CA"}}>
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <Modal show={showModal} onHide={closeModal} centered backdrop={submitting ? "static" : true} keyboard={!submitting} contentClassName="border-0 rounded-4 overflow-hidden">
        <div style={{height: 5, background: "linear-gradient(90deg, #4338CA, #818CF8)"}}/>
        <Modal.Header className="border-0 px-4 pt-4 pb-2">
          <div>
            <Modal.Title className="fw-bold" style={{ color: "#172033" }}>Create a new board</Modal.Title>
            <p className="text-secondary small mb-0 mt-2">Give your workspace a name and a color.</p>
          </div>
          <Button variant="light" className="rounded-circle d-flex align-items-center justify-content-center border-0" style={{ width: 36, height: 36 }} onClick={closeModal} disabled={submitting} aria-label="Close modal"> <X size={18} /></Button>
        </Modal.Header>

        <Modal.Body className="px-4 pt-3 pb-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold small">Board name</Form.Label>
              <Form.Control type="text" value={newBoard.name} maxLength={100} required autoFocus className="rounded-3 py-3" style={{ borderColor: "#CBD5E1" }} onChange={(e) =>handleInputChange("name", e.target.value)}/>
              <Form.Text className="text-secondary">Choose a name that describes your project.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold small d-flex align-items-center gap-2">Board color</Form.Label>
              <div className="d-flex align-items-center gap-3 rounded-3 p-3" style={{border: "1px solid #E2E8F0", backgroundColor: "#F8FAFC"}}>
                <Form.Control type="color" title="Choose board color" aria-label="Choose board color" style={{width: 54, height: 45, padding: 4, cursor: "pointer"}} value={newBoard.color} onChange={(e) =>handleInputChange("color", e.target.value)}/>
                <div>
                  <div className="fw-semibold small">Custom color</div>
                  <div className="text-secondary small text-uppercase">{newBoard.color}</div>
                </div>
              </div>
            </Form.Group>
            <div className="rounded-3 overflow-hidden mb-4" style={{border: "1px solid #E2E8F0", backgroundColor: "#FFFFFF"}}>
              <div style={{height: 5, backgroundColor: newBoard.color}}/>
              <div className="d-flex align-items-center gap-3 p-3">
                <div className="d-flex align-items-center justify-content-center rounded-3" style={{width: 42, height: 42, backgroundColor: `${newBoard.color}18`, color: newBoard.color}}>
                  <PanelsTopLeft size={21} />
                </div>
                <div className="flex-grow-1" style={{ minWidth: 0 }}>
                  <div className="fw-semibold text-break" style={{ color: "#172033" }}>{newBoard.name.trim() || "Your board name"}</div>
                  <div className="text-secondary small">Live preview</div>
                </div>
              </div>
            </div>

            <div className="d-flex gap-2">
              <Button type="button" variant="light" className="flex-grow-1 rounded-3 py-2 fw-semibold" onClick={closeModal}disabled={submitting}>Cancel</Button>
              <Button type="submit" className="flex-grow-1 rounded-3 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2" disabled={submitting || !newBoard.name.trim()} style={{backgroundColor: "#4338CA", borderColor: "#4338CA"}}>
                {submitting ? (
                  <>
                    <Spinner size="sm" animation="border" />Creating...
                  </>
                ) : (
                  <>
                    <Plus size={18} />Create Board
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ShowBoard;
