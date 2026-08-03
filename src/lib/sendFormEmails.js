import emailjs from "@emailjs/browser";

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_OWNER = import.meta.env.VITE_EMAILJS_TEMPLATE_OWNER;
const TEMPLATE_CUSTOMER = import.meta.env.VITE_EMAILJS_TEMPLATE_CUSTOMER;
const OWNER_EMAIL = import.meta.env.VITE_OWNER_EMAIL || "pp4945600@gmail.com";
const FORMSUBMIT_ENDPOINT =
  import.meta.env.VITE_FORMSUBMIT_ENDPOINT || `https://formsubmit.co/ajax/${OWNER_EMAIL}`;

export function isEmailConfigured() {
  return Boolean(PUBLIC_KEY && SERVICE_ID && TEMPLATE_OWNER && TEMPLATE_CUSTOMER);
}

export function formatFormDetails(fields) {
  return Object.entries(fields)
    .map(([label, value]) => `${label}: ${value?.toString().trim() || "-"}`)
    .join("\n");
}

async function submitWithFormSubmit({ formName, customerEmail, customerName, fields }) {
  const fromName = customerName?.trim() || "Website visitor";
  const customerEmailValue = customerEmail?.trim();
  const payload = {
    _subject: `New ${formName} submission - ${fromName}`,
    _template: "table",
    _replyto: customerEmailValue,
    form_name: formName,
    from_name: fromName,
    customer_email: customerEmailValue,
    owner_email: OWNER_EMAIL,
    ...fields,
  };

  const response = await fetch(FORMSUBMIT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || "Unable to send your message right now. Please try again."
    );
  }

  return { delivery: "formsubmit", response: data };
}

/**
 * Sends two emails via EmailJS when configured:
 * 1) Owner - full form data to VITE_OWNER_EMAIL / pp4945600@gmail.com
 * 2) Customer - confirmation to the submitter's email
 *
 * If EmailJS is not configured, submit directly through FormSubmit
 * so the visitor can still send the form without leaving the page.
 */
export async function sendFormEmails({ formName, customerEmail, customerName, fields }) {
  const fromName = customerName?.trim() || "Website visitor";
  const customerEmailValue = customerEmail?.trim();

  if (!customerEmailValue) {
    throw new Error("Customer email is required.");
  }

  if (!isEmailConfigured()) {
    return submitWithFormSubmit({ formName, customerEmail, customerName, fields });
  }

  const formDetails = formatFormDetails(fields);

  const shared = {
    form_name: formName,
    from_name: fromName,
    customer_email: customerEmailValue,
    reply_to: customerEmailValue,
    owner_email: OWNER_EMAIL,
    to_email: OWNER_EMAIL,
    form_details: formDetails,
  };

  await Promise.all([
    emailjs.send(
      SERVICE_ID,
      TEMPLATE_OWNER,
      {
        ...shared,
        to_email: OWNER_EMAIL,
      },
      { publicKey: PUBLIC_KEY }
    ),
    emailjs.send(
      SERVICE_ID,
      TEMPLATE_CUSTOMER,
      {
        ...shared,
        to_email: customerEmailValue,
      },
      { publicKey: PUBLIC_KEY }
    ),
  ]);

  return { delivery: "emailjs" };
}
