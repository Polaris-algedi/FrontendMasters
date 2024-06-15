import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import { useState } from "react";
import Modal from "./Modal";

export default function Details() {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const { isLoading, /* isError, */ data } = useQuery(
    ["details", id],
    fetchPet,
  );

  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🐶</h2>
      </div>
    );
  }

  //if (isError) return <h1>There is an Error</h1>;

  const pet = data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
        </h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button onClick={() => setShowModal(false)}>Yes</button>
                <button onClick={() => setShowModal(false)}>
                  Definitely Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    </div>
  );
}

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export { DetailsErrorBoundary };
