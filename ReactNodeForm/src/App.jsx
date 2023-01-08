import { useState } from "react";
import axios from "axios";
import FormInput from "./FormInput";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [user, setUser] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "username",
      label: "Name",
      errorMessage:
        "username should be 3 - 16 characters and should include any character",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "email",
      label: "Email",
      errorMessage: "it should be a valid email address",
      required: true,
    },
    {
      id: 3,
      name: "message",
      type: "text",
      placeholder: "message",
      label: "message",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.subject || !user.message) {
      return toast.error("please fill in email, subject and message");
    }

    try {
      setLoading(!loading);
      const { data } = await axios.post(`/api/email`, {
        email,
        subject,
        message,
      });

      setLoading(false);
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      toast.error(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  const onChange = (e) =>
    setUser({ ...user, [e.target.name]: [e.target.value] });

  return (
    <div className="grid place-items-center w-full h-screen bg-gray-light">
      <ToastContainer position="bottom-center" limit={1} />

      <form
        className="w-full max-w-[400px]  bg-yellow py-2 h-auto flex flex-col rounded-lg"
        onSubmit={handleSubmit}
      >
        {inputs.length &&
          inputs?.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={user[input.name]}
              onChange={onChange}
            />
          ))}
        <button disabled={loading} type="submit">
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default App;
