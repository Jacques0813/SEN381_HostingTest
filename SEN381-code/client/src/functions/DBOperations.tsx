export async function DoOperation(
  url: string,
  fetchMethod: string,
  requestBody: string
): Promise<never[]> {
  console.log(`URL: ${url}, METHOD: ${fetchMethod}, BODY: ${requestBody}`);
  await fetch(url, {
    method: fetchMethod,
    headers: {
      "Content-Type": "application/json", // Set the content type if sending JSON data
    },
    body: requestBody,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  return [];
}

export async function SetTable(url: string): Promise<never[]> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
