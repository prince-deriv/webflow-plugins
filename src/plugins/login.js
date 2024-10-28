import { loadAndExecuteScript } from "../utils";
import "../data/cookie.js";

// "https://static.deriv.com/scripts/cookie.js
// loadAndExecuteScript({ url: cookiejs }, () => {
//   console.log("Script loaded successfully.");
// });

const validateForm = (wrapper) => {
  const emailField = wrapper.querySelector('[data-dwp-field="email"]');
  const tcAgreementCheckbox = wrapper.querySelector(
    '[data-dwp-field="tc-agreement"]'
  );
  const signupButton = wrapper.querySelector('[data-dwp-button="signup"]');

  if (!emailField || !signupButton) {
    return;
  }

  const emailValue = emailField.value.trim();
  const isEmailValid =
    emailValue && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const isTcAgreementChecked = tcAgreementCheckbox
    ? tcAgreementCheckbox.checked
    : true;

  if (!(isEmailValid && isTcAgreementChecked)) {
    signupButton.disabled = true;
    signupButton.setAttribute("disabled", "");
  } else {
    signupButton.disabled = false;
    signupButton.removeAttribute("disabled");
  }
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  console.log("Form submitted, but default action prevented.");
};

const addEventListeners = (wrapper) => {
  if (wrapper.dataset.listenersAdded === "true") {
    return;
  }

  const emailField = wrapper.querySelector('[data-dwp-field="email"]');
  const tcAgreementCheckbox = wrapper.querySelector(
    '[data-dwp-field="tc-agreement"]'
  );
  const signupButton = wrapper.querySelector('[data-dwp-button="signup"]');

  const validate = () => {
    validateForm(wrapper);
  };

  if (emailField) {
    emailField.addEventListener("input", validate);
  }

  if (tcAgreementCheckbox) {
    tcAgreementCheckbox.addEventListener("change", validate);
  }

  const form = wrapper.closest("form") || wrapper.querySelector("form");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }

  validate();

  wrapper.dataset.listenersAdded = "true";
};

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (
          node.matches('[data-dwp-form="signup"]') ||
          node.querySelector('[data-dwp-form="signup"]')
        ) {
          addEventListeners(node);
          validateForm(node);
        }
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

const initializeValidation = () => {
  const initialWrappers = document.querySelectorAll('[data-dwp-form="signup"]');
  initialWrappers.forEach((wrapper) => {
    addEventListeners(wrapper);
    validateForm(wrapper);
  });
};

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", initializeValidation);
} else {
  initializeValidation();
}
