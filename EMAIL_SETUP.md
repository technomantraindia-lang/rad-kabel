# Email setup (Dealer Registration + Contact Us)

Both forms send **two emails** on submit:

1. **Owner** → `pp4945600@gmail.com` with all form fields  
2. **Customer** → the email address entered in the form (confirmation)

Powered by [EmailJS](https://www.emailjs.com/) (no custom server).

---

## 1. Create EmailJS account

1. Sign up at https://www.emailjs.com/
2. Go to **Email Services** → **Add New Service** → choose **Gmail**
3. Connect **`pp4945600@gmail.com`** and finish the Gmail OAuth steps
4. Copy the **Service ID** (e.g. `service_xxxxx`)

## 2. Create two email templates

### A) Owner template (full data)

- **To Email:** `pp4945600@gmail.com` (fixed)
- **Subject:** `New {{form_name}} submission — {{from_name}}`
- **Content example:**

```text
New website form submission

Form: {{form_name}}
From: {{from_name}}
Customer email: {{customer_email}}

Details:
{{form_details}}
```

Copy the **Template ID** → use as `VITE_EMAILJS_TEMPLATE_OWNER`.

### B) Customer template (confirmation)

- **To Email:** `{{to_email}}`  ← must be dynamic (customer address)
- **Subject:** `We received your {{form_name}} — RAD Kabel`
- **Content example:**

```text
Hi {{from_name}},

Thank you for contacting RAD Kabel.
We have received your {{form_name}} and our team will get back to you shortly.

— RAD Kabel
```

Copy the **Template ID** → use as `VITE_EMAILJS_TEMPLATE_CUSTOMER`.

## 3. Public Key

Account → **API Keys** → copy **Public Key** → `VITE_EMAILJS_PUBLIC_KEY`.

## 4. Fill `.env`

In `rad-kabel-vite-setup/.env` (already created from `.env.example`):

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_OWNER=your_owner_template_id
VITE_EMAILJS_TEMPLATE_CUSTOMER=your_customer_template_id
VITE_OWNER_EMAIL=pp4945600@gmail.com
```

Restart the dev server after changing `.env`:

```bash
npm run dev
```

## Template variables used by the app

| Variable | Description |
|---|---|
| `form_name` | `"Contact Us"` or `"Dealer Registration"` |
| `from_name` | Customer full name |
| `customer_email` | Customer email |
| `reply_to` | Same as customer email |
| `to_email` | Owner address (owner mail) or customer address (customer mail) |
| `owner_email` | `pp4945600@gmail.com` |
| `form_details` | All fields as plain text (owner email body) |

## Code entry points

- Shared sender: `src/lib/sendFormEmails.js`
- Contact form: `src/pages/ContactUsPage.jsx`
- Dealer form: `src/pages/DealerNetworkPage.jsx`
