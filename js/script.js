"use strict";

const shorten = function () {
  /* ---------------------- */
  /* Elements 👇 */
  /* ---------------------- */
  const section = document.querySelector(".shorten");
  const shortenBtn = section.querySelector(".shorten__button");
  const input = section.querySelector(".shorten__input");
  const modal = document.querySelector(".shorten__output");
  const copyBtn = modal.querySelector(".shorten__button--copy");
  const copiedBtn = modal.querySelector(".shorten__button--copied");
  const longLabel = modal.querySelector(".shorten__link--long");
  const shortLabel = modal.querySelector(".shorten__link--short");

  /* ---------------------- */
  /* Functions 👇 */
  /* ---------------------- */
  // Helper function:
  const displayError = () => {
    section.classList.remove("success");
    section.classList.add("error");
  };

  const displayModal = () => {
    section.classList.remove("error");
    section.classList.add("success");
  };

  const displayCopyBtn = () => {
    copyBtn.style.display = "block";
    copiedBtn.style.display = "none";
  };

  const displayCopiedBtn = () => {
    copyBtn.style.display = "none";
    copiedBtn.style.display = "block";
  };

  const hideModal = (sec) => {
    setTimeout(() => section.classList.remove("success"), sec * 1000);
  };

  // Async function to get a short link from API
  const shortenLink = async (url) => {
    try {
      const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
      const data = await res.json();

      return data.result.short_link;
    } catch (err) {
      throw err;
    }
  };

  // Async function to get the copied short link in the clipboard
  const copyToClipboard = async () =>
    await window.navigator.clipboard.writeText(shortLabel.textContent);

  // Async function, which displays modal window with short link or error message based on the result of shortenLink(url) function
  const displayResult = async () => {
    try {
      const url = input.value;
      // A short link from API
      const shortLink = await shortenLink(url);

      // Replace error class with success (show modal)
      displayModal();

      // Display both links (original and short) in the modal labels
      longLabel.textContent = url;
      shortLabel.textContent = shortLink;

      // Change button appearance (display copyBtn)
      displayCopyBtn();
    } catch (err) {
      // Replace success class with error (show error message)
      displayError();
    }
  };

  /* ---------------------- */
  /* Event listeners 👇 */
  /* ---------------------- */
  shortenBtn.addEventListener("click", function (e) {
    e.preventDefault();
    displayResult();
  });

  copyBtn.addEventListener("click", function () {
    // Clear input field
    input.value = "";
    copyToClipboard();

    // Change button appearance (display copiedBtn)
    displayCopiedBtn();

    // Hide modal window after N seconds
    hideModal(1.5);
  });
};

shorten();
