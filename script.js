const fileInput = document.getElementById("fileInput");
const previewImage = document.getElementById("previewImage");
const removeBtn = document.getElementById("removeBtn");
const downloadLink = document.getElementById("downloadLink");

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    previewImage.src = reader.result;
    previewImage.classList.remove("hidden");
  };
  reader.readAsDataURL(file);
});

removeBtn.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select an image first.");
    return;
  }

  removeBtn.textContent = "Processing...";
  removeBtn.disabled = true;

  const formData = new FormData();
  formData.append("image_file", file);
  formData.append("size", "auto");

  try {
    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": "PUT UR API KEY HERE", 
      },
      body: formData,
    });

    if (!response.ok) throw new Error("Failed to remove background.");

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    
    previewImage.src = imageUrl;
    previewImage.onload = () => {
      downloadLink.href = imageUrl;
      downloadLink.classList.remove("hidden");
    };
  } catch (error) {
    alert("An error occurred. Please try again.");
  } finally {
    removeBtn.textContent = "Remove Background";
    removeBtn.disabled = false;
  }
});
