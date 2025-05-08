let currentPage = 0;

export function	setupModal(modal, modalPages, prevButton, nextButton, closeButton)
{
	function updateNavigationButtons(totalPages) {
		prevButton.disabled = currentPage === 0;
		nextButton.disabled = currentPage === totalPages - 1;
	}

	// Handle navigation between pages
	prevButton.addEventListener("click", () => {
		const pages = document.querySelectorAll(".modal-page");
		pages[currentPage].style.display = "none"; // Hide current page
		currentPage--;
		pages[currentPage].style.display = "block"; // Show previous page
		updateNavigationButtons(pages.length);
	});

	nextButton.addEventListener("click", () => {
		const pages = document.querySelectorAll(".modal-page");
		pages[currentPage].style.display = "none"; // Hide current page
		currentPage++;
		pages[currentPage].style.display = "block"; // Show next page
		updateNavigationButtons(pages.length);
	});

	// Close the modal when the close button is clicked
	closeButton.addEventListener("click", () => {
		modal.style.display = "none"; // Hide the modal
	});

	// Close the modal when clicking outside the modal content
	window.addEventListener("click", (event) => {
		if (event.target === modal) {
			modal.style.display = "none"; // Hide the modal
		}
	});

	// Ensure the modal is hidden on page load
	window.addEventListener("DOMContentLoaded", () => {
		modal.style.display = "none"; // Explicitly hide the modal
	});

	return updateNavigationButtons;
}

function    createImagePage(page, pageIndex)
{
	const pageDiv = document.createElement("div");

	pageDiv.className = "modal-page";
	pageDiv.style.display = "none";

	const img = document.createElement("img");
	img.src = page.image;
	img.alt = `Page ${pageIndex + 1}`;

	const date = document.createElement("p");
	date.textContent = `Date: ${page.date}`;

	pageDiv.appendChild(img);
	pageDiv.appendChild(date);

	return pageDiv;
}

function createDescriptionPage(destination) {
	const page = document.createElement("div");
	page.className = "modal-page";
	page.style.display = "block"; // Show the first page initially

	const descriptionText = document.createElement("p");
	descriptionText.textContent = destination.description;

	page.appendChild(descriptionText);

	return page;
}

// Function to display destination details in the modal
export function displayDetails(destination, modal, modalPages, updateNavigationButtons) {
	modalPages.innerHTML = ""; // Clear previous pages

	const descriptionPage = createDescriptionPage(destination);
	modalPages.appendChild(descriptionPage);
	// Create pages for the modal
	destination.pages.forEach((page, pageIndex) => {
		const pageDiv = createImagePage(page, pageIndex);
		modalPages.appendChild(pageDiv);
	});

	currentPage = 0; // Reset to the first page
	updateNavigationButtons(destination.pages.length + 1);

	modal.style.display = "block"; // Show the modal
}