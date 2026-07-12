export async function extractFormData(file: File) {
  const formData = new FormData();

  formData.append("image", file);

  const response = await fetch("https://sir-form-backend.onrender.com/extract", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Backend request failed.");
  }

  return response.json();
}