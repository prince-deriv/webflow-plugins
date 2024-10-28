export const loadAndExecuteScript = ({ url }, callback) => {
  const script = document.createElement("script");
  script.src = url;
  script.async = true;

  script.onload = () => {
    console.log(`Script loaded from ${url}`);
    if (typeof callback === "function") {
      callback();
    }
  };

  script.onerror = () => {
    console.error(`Failed to load the script at ${url}`);
  };

  document.head.appendChild(script);
};
