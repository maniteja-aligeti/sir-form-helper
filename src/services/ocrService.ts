export function validateForm6File(file: File): string | null {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
  ];

  if (!allowedTypes.includes(file.type)) {
    return "Please upload JPG, PNG or WEBP image.";
  }

  const maxSize = 15 * 1024 * 1024;

  if (file.size > maxSize) {
    return "Maximum file size is 15 MB.";
  }

  return null;
}