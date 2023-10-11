btnGenerate.addEventListener("click", () => {
  // Display the loading spinner
  spinner.style.display = "flex";

  // Simulate image loading (replace this with your image URL)
  setTimeout(() => {
    const imageUrl = "https://placekitten.com/300/200"; // Replace with your image URL
    image.src = imageUrl;

    // Hide the spinner once the image is successfully loaded
    image.onload = () => {
      spinner.style.display = "none";
    };
  }, 2000); // Simulate a 2-second delay, replace with your image loading code.
});
