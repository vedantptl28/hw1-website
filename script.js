/* Author: Vedant Patel | Purpose: Validates the Student Survey Raffle field and displays a submission result. */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("surveyForm");
  const raffle = document.getElementById("raffle");
  const feedback = document.getElementById("raffleFeedback");
  const message = document.getElementById("submissionMessage");

  if (!form || !raffle) return;

  function raffleNumbers() {
    return raffle.value.split(",").map((value) => value.trim()).filter(Boolean);
  }

  function validateRaffle() {
    const entries = raffleNumbers();
    const valid = entries.length >= 10 && entries.every((value) => /^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 100);
    raffle.classList.toggle("is-invalid", !valid && raffle.value.trim() !== "");
    feedback.textContent = valid ? "" : "Enter at least 10 comma-separated whole numbers from 1 to 100.";
    return valid;
  }

  raffle.addEventListener("input", validateRaffle);
  form.addEventListener("reset", () => {
    raffle.classList.remove("is-invalid");
    feedback.textContent = "";
    message.className = "alert d-none mt-4";
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const raffleValid = validateRaffle();
    form.classList.add("was-validated");
    if (!form.checkValidity() || !raffleValid) return;
    const winner = raffleNumbers().includes("7");
    message.textContent = winner ? "Thank you! Your survey was submitted. Congratulations - you won a free movie ticket." : "Thank you! Your survey was submitted successfully.";
    message.className = `alert ${winner ? "alert-success" : "alert-info"} mt-4`;
    message.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});
