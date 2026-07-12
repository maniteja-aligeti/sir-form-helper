export async function preprocessImage(
  source: HTMLCanvasElement,
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");

  // Upscale image (2x)
  canvas.width = source.width * 2;
  canvas.height = source.height * 2;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Unable to create canvas.");
  }

  // Draw enlarged image
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height,
  );

  const data = imageData.data;

  // Grayscale + contrast + simple threshold
  for (let i = 0; i < data.length; i += 4) {
    const gray =
      data[i] * 0.299 +
      data[i + 1] * 0.587 +
      data[i + 2] * 0.114;

    // Increase contrast
    const contrast = gray > 150 ? 255 : 0;

    data[i] = contrast;
    data[i + 1] = contrast;
    data[i + 2] = contrast;
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas;
}