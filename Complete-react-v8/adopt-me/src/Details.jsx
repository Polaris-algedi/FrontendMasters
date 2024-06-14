import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";

export default function Details() {
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
        <button>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    </div>
  );
}
