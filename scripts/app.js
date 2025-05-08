import { renderRoadmap } from './roadmap.js';
import { setupModal } from './modal.js';

const roadmapContainer = document.getElementById("roadmap-container");
const modal = document.getElementById("destination-modal");
const modalPages = document.getElementById("modal-pages");
const closeButton = document.querySelector(".close-button");
const prevButton = document.getElementById("prev-page");
const nextButton = document.getElementById("next-page");

const updateNavigationButtons = setupModal(modal, modalPages, prevButton, nextButton, closeButton);
renderRoadmap(roadmapContainer, modal, modalPages, updateNavigationButtons);



