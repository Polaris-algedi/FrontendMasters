export default async function fetchBreedList({ queryKey }) {
  const animal = queryKey[1];

  if (!animal) return [];

  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`,
  );

  if (!apiRes.ok) {
    throw new Error(
      `breeds/${animal} - An error occurred while fetching the data`,
    );
  }

  return apiRes.json();
}
