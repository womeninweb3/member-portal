import { useState } from "react";

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

      <style jsx>{`
        form,
        label {
          display: flex;
          flex-flow: column;
          text-align: center;
        }
        .form-header {
          font-size: 22px;
          margin: 25px 0;
        }
        .input-wrapper {
          width: 80%;
          margin: 0 auto 20px;
        }
      `}</style>
    </>
  );
};

export default EmailForm;
