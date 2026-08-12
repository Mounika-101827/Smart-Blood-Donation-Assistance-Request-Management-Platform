import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateRequestStatus } from "../services/requestService";
import "./preDonationScreening.css";

function PreDonationScreening() {
  const [form, setForm] =useState({
    healthy:false,
    fever:false,
    donatedRecently:false,
    antibiotics:false,
    confirm:false,
  });

  const navigate=useNavigate();
  const {requestId}=useParams();

  const handleChange=(e)=>{
    const {name,checked}=e.target;

    setForm((prev)=>({
      ...prev,
      [name]:checked,
    }));
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

    const eligible=
      form.healthy &&
      form.fever &&
      form.donatedRecently &&
      form.antibiotics &&
      form.confirm;

    try{

      if(eligible){

        await updateRequestStatus(requestId,"Accepted");

        alert("🎉 Screening Passed! Blood request accepted.");

      }
      else{

        await updateRequestStatus(requestId,"Rejected");

        alert("❌ Screening Failed. Blood request rejected.");

      }

      navigate("/notifications");

    }catch(error){

      console.log(error);

      alert("Something went wrong.");

    }
  };

  return(

    <div className="screening-container">

      <div className="screening-card">


        <h1>Pre-Donation Health Screening</h1>

        <p className="info">
          Please answer every question honestly. This quick screening helps
          ensure a safe blood donation process for both the donor and the recipient.
        </p>

        <div className="warning">
          <strong>Important:</strong> If any eligibility criteria are not met,
          this donation request will automatically be declined to protect the
          recipient's safety.
        </div>

        <form onSubmit={handleSubmit}>

          <div className="question">
            <label>
              <input
                type="checkbox"
                name="healthy"
                checked={form.healthy}
                onChange={handleChange}
              />
              I feel healthy today.
            </label>
          </div>

          <div className="question">
            <label>
              <input
                type="checkbox"
                name="fever"
                checked={form.fever}
                onChange={handleChange}
              />
              I have not had a fever or any infection during the last 14 days.
            </label>
          </div>

          <div className="question">
            <label>
              <input
                type="checkbox"
                name="donatedRecently"
                checked={form.donatedRecently}
                onChange={handleChange}
              />
              I have not donated blood within the last 3 months.
            </label>
          </div>

          <div className="question">
            <label>
              <input
                type="checkbox"
                name="antibiotics"
                checked={form.antibiotics}
                onChange={handleChange}
              />
              I am not taking antibiotics or any medication that prevents blood donation.
            </label>
          </div>

          <div className="question confirm-box">
            <label>
              <input
                type="checkbox"
                name="confirm"
                checked={form.confirm}
                onChange={handleChange}
              />
              I confirm that the above information is accurate and truthful.
            </label>
          </div>

          <button
            type="submit"
            className="submit-btn"
          >
            Continue →
          </button>

        </form>

      </div>

    </div>

  );
}

export default PreDonationScreening;