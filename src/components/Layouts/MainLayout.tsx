import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Button from "../Elements/Button/Button";
import { ModalOverlay, SubscribeModal } from "../Elements/Modal/Modal";
import Alert from "../Elements/Alert/Alert";

const MainLayout = () => {
  const [emailValue, setEmail] = useState("");
  const [alertVisible, setAlertVisibility] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAlertVisibility = (email: string) => {
    setEmail(email)
    setAlertVisibility(true)
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>
          { emailValue } successful to Subscribe
        </Alert>
      )}
      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="text-center">
            <h2>
              Live longer. The highest quality tomatoes delivered to your door.
            </h2>
            <p>
              Make homemade pizza like never before. Join our newly established
              campaign to source and disbribute over 250 locally grow tomato
              species
            </p>
            <p>
              subscribe now and we'll let you know as soon as we're ready to
              ship
            </p>
            <Button color="outline-dark" onClick={handleOpenModal}>
              I'm Interested!
            </Button>
            {showModal && (
              <>
                <ModalOverlay
                  showModal={showModal}
                  onClose={handleCloseModal}
                />
                <SubscribeModal showModal={showModal} onClose={handleCloseModal} handleAlertVisibility={handleAlertVisibility} currentEmail={emailValue} />
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
