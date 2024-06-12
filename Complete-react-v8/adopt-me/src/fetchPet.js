export default async function fetchPet({ queryKey }) {
  const id = queryKey[1];

  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  if (!apiRes.ok) {
    throw new Error(
      `details/${id} - An error occurred while fetching the data`,
    );
  }

  return apiRes.json();
}
