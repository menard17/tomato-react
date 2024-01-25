import React, { useState } from "react";
import { isValidEmail } from "../../../utils/utils";

interface SubscribeFormProps {
    currentEmail: string;
    onClose: () => void;
    handleAlertVisibility: (email: string) => void;
}

interface PostData {
  email: string;
  name: string;
}

const SubscribeForm: React.FC<SubscribeFormProps> = ({ onClose, handleAlertVisibility, currentEmail }) => {

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Update state with new data and validation errors
    setPostData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isValidForm = (data: PostData): boolean => {
    let isvalid = true;
    const errors: { [key: string]: string } = {};
    if (data.email === currentEmail) {
        isvalid = false;
        errors["email"] = "Email has already been subscribed";
      }
    if (!isValidEmail(data.email)) {
      isvalid = false;
      errors["email"] = "Invalid email. Please enter a valid email address.";
    }
    if (data.email.trim() === "") {
      isvalid = false;
      errors["email"] = "Email is required";
    }
    if (data.name.trim() === "") {
      isvalid = false;
      errors["name"] = "Name is required";
    }

    // Update validation errors
    setValidationErrors(errors);
    return isvalid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidForm(postData)) {
      // Handle or display validation errors as needed
      return;
    }

    try {
        fetch("/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers as needed
          },
          body: JSON.stringify(postData),
        })
          .then((response) => response.json())
          .then(() => {
            onClose()
            handleAlertVisibility(postData.email)
          });
      } catch (error) {
        console.error("Error:", error);
      }
  };

  const [postData, setPostData] = useState<PostData>({
    email: "",
    name: "",
  });
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3 text-start">
        <label className="col-form-label text-right">Email:</label>
        <input
          type="email"
          className={`form-control ${validationErrors.email && `is-invalid`}`}
          onChange={handleChange}
          name="email"
          value={postData.email}
        />
        <div id="validationEmail" className="invalid-feedback">
          {validationErrors.email}
        </div>
      </div>
      <div className="mb-3 text-start">
        <label className="col-form-label text-right">Full Name</label>
        <input
          type="text"
          className={`form-control ${validationErrors.name && `is-invalid`}`}
          name="name"
          onChange={handleChange}
          value={postData.name}
        />
        <div id="validationFullName" className="invalid-feedback">
          {validationErrors.name}
        </div>
      </div>
      <button type="submit" className="btn btn-outline-dark">
        Subscribe
      </button>
    </form>
  );
};

export default SubscribeForm;
