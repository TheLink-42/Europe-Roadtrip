import { destinations } from './destinations.js';
import { displayDetails } from './modal.js';

export function	renderRoadmap(roadmapContainer, modal, modalPages, updateNavigationButtons)
{
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width", "100%");
	svg.setAttribute("height", "100%");
	svg.style.position = "absolute";
	svg.style.top = "0";
	svg.style.left = "0";
	svg.style.zIndex = "0";
	roadmapContainer.appendChild(svg);

	function    createDestinationContainer(destination, containerWidth, containerHeight)
	{
    	const destinationContainer = document.createElement("div");

    	destinationContainer.className = "roadmap-destination-container";
    	destinationContainer.style.position = "absolute"; // Make it positionable
    
    	const size = destination.size;

   		// Define the margin (e.g., 1rem converted to pixels)
  		const margin = 16; // Assuming 1rem = 16px

    	// Parse percentage values for top and left
    	let top = parseFloat(destination.position.top) / 100 * containerHeight;
    	let left = parseFloat(destination.position.left) / 100 * containerWidth;


    	// Adjust top to keep the destination inside vertical boundaries
    	if (top < margin) top = margin; // Prevent going above the top boundary
    	if (top + size + margin > containerHeight) top = containerHeight - size - margin; // Prevent going below the bottom boundary

    	// Adjust left to keep the destination inside horizontal boundaries
    	if (left - size / 2 < margin) left = margin + size / 2; // Prevent going beyond the left boundary
    	if (left + size / 2 > containerWidth - margin) left = containerWidth - margin - size / 2; // Prevent going beyond the right boundary

    	// Apply adjusted positions
    	destinationContainer.style.top = `${top}px`;
    	destinationContainer.style.left = `${left}px`;
    	destinationContainer.style.transform = "translateX(-50%)";

    	return destinationContainer;
	}

	function    createDestination(destination)
	{
    	const newDestination = document.createElement("div");

    	newDestination.className = "roadmap-destination";
    	newDestination.style.backgroundImage = `url(${destination.image})`;
    	newDestination.style.backgroundSize = "cover";
    	newDestination.style.backgroundPosition = "center";
    	newDestination.style.width = `${destination.size}px`;
    	newDestination.style.height = `${destination.size}px`;
    	newDestination.addEventListener("click", () => displayDetails(destination, modal, modalPages, updateNavigationButtons));

    	return newDestination;
	}

	function    createLabel(destination)
	{
    	const label = document.createElement("div");

    	label.className = "roadmap-destination-label";
    	label.textContent = destination.name.split(",")[0];

    	return label;
	}

	function    createPath(prevDestination, destination, containerWidth, containerHeight)
	{
    	const size = destination.size;
    	const top = parseFloat(destination.position.top) / 100 * containerHeight + size / 1.8;
    	const left = parseFloat(destination.position.left) / 100 * containerWidth;
    	const prevTop = parseFloat(prevDestination.position.top) / 100 * containerHeight + size / 2;
    	const prevLeft = parseFloat(prevDestination.position.left) / 100 * containerWidth;

    	// Calculate control points for the curve
    	const controlX = (prevLeft + left) / 2; // Midpoint for X
    	const curveDirection = Math.random() < 0.5 ? -50 : 150;
    	const controlY = Math.min(prevTop, top) + curveDirection; // Curve

    	const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    	path.setAttribute(
     	   "d",
     	   `M ${prevLeft} ${prevTop} Q ${controlX} ${controlY}, ${left} ${top}`
    	);

    	return path;
	}

	function    setPath(path)
	{
    	path.setAttribute("stroke", "black");
	    path.setAttribute("stroke-width", "5");
    	path.setAttribute("fill", "none");
    	path.setAttribute("stroke-dasharray", "5,15");
    	path.setAttribute("stroke-linecap", "round");
    	path.setAttribute("stroke-linejoin", "round");
	}

	function	render()
	{
		roadmapContainer.innerHTML = "";
		roadmapContainer.appendChild(svg);
		svg.innerHTML = "";
		destinations.forEach((destination, index) => {
			const containerWidth = roadmapContainer.offsetWidth;
			const containerHeight = roadmapContainer.offsetHeight;

			const newDestinationContainer = createDestinationContainer(destination, containerWidth, containerHeight);
			const newDestination = createDestination(destination);
			const label = createLabel(destination);

			newDestinationContainer.appendChild(newDestination);
			newDestinationContainer.appendChild(label);
			roadmapContainer.appendChild(newDestinationContainer);

			if (index > 0) {
				const path = createPath(destinations[index - 1], destination, containerWidth, containerHeight);
				setPath(path);
				svg.appendChild(path);
			}
		});
	}

	render();
	window.addEventListener("resize", render);
}