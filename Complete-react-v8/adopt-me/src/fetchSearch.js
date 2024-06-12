export default async function fetchSearch({ queryKey }) {
  const { animal, location, breed } = queryKey[1];
  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`,
  );

  if (!apiRes.ok) {
    throw new Error(
      `animals:${animal} - location:${location} - breed:${breed} - An error occurred while fetching the data`,
    );
  }

  return apiRes.json();
}
