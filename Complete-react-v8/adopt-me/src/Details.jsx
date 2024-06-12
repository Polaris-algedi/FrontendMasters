import { useParams } from "react-router-dom";

export default function Details() {
  const params = useParams();
  const { id } = useParams();
  console.log(params);

  return <h2>{id}</h2>;
}
