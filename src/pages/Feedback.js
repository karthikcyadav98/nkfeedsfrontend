import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { base_url } from "../config";

const Feedback = () => {
  const [feedbackList, setfeedbackList] = useState([]);
  const [initLoading, setInitLoading] = useState(false);
  const [confession, setConfession] = useState("");
  const [subLoading, setSubLoading] = useState(false);
  const [confessionError, setConfessionError] = useState("");

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  const updateWindowDimensions = () => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  };

  // const getFeedbackList = () => {
  //   setInitLoading(true);
  //   axios({
  //     method: "get",
  //     url: base_url + "confessions",
  //   })
  //     .then((res) => {
  //       if (res.data) setfeedbackList(res.data.reverse());
  //     })
  //     .catch((err) => console.log("ajsghdasd", err))
  //     .finally(() => setInitLoading(false));
  // };

  const addFeedback = () => {
    if (!subLoading && confession) {
      setSubLoading(true);
      axios({
        method: "post",
        url: base_url + "addConfessions",
        data: {
          email: "feedback@neokred.tech",
          confession: confession,
        },
      })
        .then((res) => {
          if (res.data) {
            setOpenModal(false);
            setConfession("");
            // getFeedbackList();
          }
        })
        .catch((err) => console.log("ajsghdasd", err))
        .finally(() => {
          setSubLoading(false);
          setConfessionError("");
        });
    } else {
      setConfessionError("This field is required");
    }
  };

  useEffect(() => {
    // getFeedbackList();
  }, []);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 50,
      borderRadius: 30,
    },
  };

  return (
    <div style={{ padding: "20px 30px" }}>
      <div
        style={{
          backgroundColor: "#fee4c5",
          padding: "10px 50px",
          borderRadius: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3>Your feedbacks are anonymous here!</h3>
        <h3
          onClick={async () => {
            localStorage.removeItem("isLogin");
            window.location.assign("login");
          }}
          style={{ color: "red", cursor: "pointer" }}
        >
          Logout
        </h3>
      </div>

      <div
        style={{
          marginTop: 50,
          padding: "0px 50px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {initLoading ? (
          <p>loading...</p>
        ) : (
          <>
            <div
              onClick={() => setOpenModal(true)}
              style={{
                width: dimensions.width > 1160 ? "23%" : "25%",
                minWidth: "20%",
                minHeight: 250,
                backgroundColor: "#fee4c5",
                borderRadius: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "1%",
                cursor: "pointer",
              }}
            >
              <p style={{ fontWeight: "bold" }}>+ Add Note</p>
            </div>
            {/* {feedbackList.map((item) => (
              <div
                style={{
                  width: "19%",
                  padding: 20,
                  backgroundColor: "#fee4c5",
                  borderRadius: 20,
                  minHeight: 250,
                  margin: "1%",
                }}
              >
                <p
                  style={{
                    color: "#000",
                    wordWrap: "break-all",
                    overflow: "hidden",
                    margin: 0,
                  }}
                >
                  {item.confession}
                </p>
              </div>
            ))} */}
          </>
        )}
      </div>

      <Modal
        style={customStyles}
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
      >
        <h2 style={{ marginTop: 0 }}>Give your feedback</h2>
        <textarea
          autoFocus={true}
          value={confession}
          onChange={(e) => setConfession(e.target.value)}
          style={{ height: 200, width: 400, maxHeight: 300, padding: 10 }}
        />
        <p style={{ margin: 0, color: "red" }}>{confessionError}</p>
        <br></br>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              marginTop: 30,
              borderRadius: 100,
              padding: 15,
              width: 150,
              backgroundColor: "#fff",
              border: "2px solid #fee4c5",
              cursor: "pointer",
              fontWeight: "bold",
              display: "inline-block",
            }}
            onClick={() => {
              setConfessionError("");
              setOpenModal(false);
            }}
          >
            <p style={{ margin: 0, textAlign: "center" }}>Cancel</p>
          </div>
          <div
            style={{
              marginTop: 30,
              borderRadius: 100,
              padding: 15,
              width: 150,
              marginLeft: 10,
              backgroundColor: "#fee4c5",
              cursor: "pointer",
              fontWeight: "bold",
              display: "inline-block",
            }}
            onClick={addFeedback}
          >
            <p style={{ margin: 0, textAlign: "center" }}>
              {subLoading ? "loading..." : "Submit"}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Feedback;
