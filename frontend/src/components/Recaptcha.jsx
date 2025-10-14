import React from "react";

export default function Recaptcha({ siteKey, onChange }) {
  React.useEffect(() => {
    if (!window.grecaptcha) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="g-recaptcha" data-sitekey={siteKey} data-callback={onChange}></div>
  );
}
