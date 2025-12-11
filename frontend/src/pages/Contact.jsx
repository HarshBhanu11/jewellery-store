// frontend/src/pages/Contact.jsx
import { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

  function onChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setStatus(null);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    // Basic client-side validation
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: 'error', message: 'Please fill name, email and message.' });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/api/contact`, form, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("res:",res)

      if (res.data.success) {
        setStatus({ type: 'success', message: 'Thanks — your message has been sent.' });
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus({ type: 'error', message: 'Something went wrong. Try again.' });
      }
    } catch (err) {
      console.error(err.response || err.message);
      const msg =
        err.response?.data?.errors?.[0]?.msg ||
        err.response?.data?.message ||
        'Network or server error';
      setStatus({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page" style={{ maxWidth: 760 }}>
      <h1>Get in touch</h1>
      <p>Fill the form and we will get back to you on WhatsApp or call.</p>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Your name"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder="Your email"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={onChange}
          placeholder="Phone (optional)"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          placeholder="Your message"
          rows={6}
          required
        />
        <div>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>

      {status && (
        <p style={{ marginTop: 16, color: status.type === 'success' ? 'green' : 'crimson' }}>
          {status.message}
        </p>
      )}
    </div>
  );
}
