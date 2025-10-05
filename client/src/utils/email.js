import emailjs from "@emailjs/browser";

// Centralized EmailJS sender for Contact page and future reuse
// Requires environment variables to be set in Vite:
// VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY

export async function sendContactEmail({ name, email, subject, message }) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      "EmailJS env vars missing. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY"
    );
  }

  const templateParams = {
    from_name: name,
    from_email: email,
    subject,
    message,
  };

  const response = await emailjs.send(serviceId, templateId, templateParams, {
    publicKey,
  });

  return response;
}


