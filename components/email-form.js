import { useState } from "react";
import emailFormStyles from "../pages/styles/components/email-form.js"

const EmailForm = ({ onEmailSubmit, disabled }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onEmailSubmit(email);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first">Email</label>
        <input
          placeholder="Enter your email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onSubmit={handleSubmit} type="submit">
          Submit
        </button>
      </form>

      <style jsx>
        {emailFormStyles}
      </style>
    </>
  );
};

export default EmailForm;
