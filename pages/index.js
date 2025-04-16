
import { motion } from "framer-motion";
import { Home, Hammer, Wrench, Building2, Ruler, Users } from "lucide-react";
import Link from "next/link";
import "../styles/globals.css";
import { useState } from "react";

export default function HomePage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", project: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, source) => {
    e.preventDefault();

    await fetch("https://script.google.com/macros/s/AKfycbyr0IhgDLJWcAesjjupNiOOHLPUTEeLpbFpTqffy-46vF4zTfxmDKnIyiLuMDyRel1J7w/exec", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        source,
      }),
    });

    const botToken = "7645816333:AAG4Og2PcDGExWdR5wO1GY1cEfuiv0djQa0";
    const chatId = "95217033";
    const message = `📩 New ${source}\n👤 Name: ${formData.name}\n📧 Email: ${formData.email}\n📱 Phone: ${formData.phone}\n📋 Project: ${formData.project}`;

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    alert("✅ Your message was sent successfully!");
    setFormData({ name: "", email: "", phone: "", project: "" });
  };

  return (
    <html style={{ scrollBehavior: "smooth" }}>
      <body className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-blue-50 text-gray-800 font-sans">
        <div className="bg-white shadow-sm py-3 px-6 flex justify-between items-center sticky top-0 z-50">
          <div className="font-bold text-xl text-blue-700">SIA SmartHome</div>
          <nav className="space-x-4 text-sm">
            <Link href="#home" className="hover:text-blue-600">Home</Link>
            <Link href="#about" className="hover:text-blue-600">About</Link>
            <Link href="#services" className="hover:text-blue-600">Services</Link>
            <Link href="#projects" className="hover:text-blue-600">Projects</Link>
            <Link href="#contact" className="hover:text-blue-600">Contact</Link>
            <Link href="#quote" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Get Quote</Link>
          </nav>
        </div>

        <section id="contact" className="bg-white py-20 px-6">
          <h2 className="text-4xl font-bold mb-8 text-center text-blue-800">Contact Us</h2>
          <form onSubmit={(e) => handleSubmit(e, "Contact Form")} className="max-w-xl mx-auto space-y-4">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="bg-slate-50 w-full p-2 rounded border" />
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="bg-slate-50 w-full p-2 rounded border" />
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="bg-slate-50 w-full p-2 rounded border" />
            <textarea name="project" value={formData.project} onChange={handleChange} placeholder="Your Message" rows={4} className="bg-slate-50 w-full p-2 rounded border" />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Send Message</button>
          </form>
        </section>

        <section id="quote" className="bg-blue-50 py-20 px-6">
          <h2 className="text-4xl font-bold mb-8 text-center text-blue-800">Request a Quote</h2>
          <form onSubmit={(e) => handleSubmit(e, "Quote Form")} className="max-w-xl mx-auto space-y-4 bg-white p-6 rounded-2xl shadow-xl">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="bg-slate-50 w-full p-2 rounded border" />
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="bg-slate-50 w-full p-2 rounded border" />
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="bg-slate-50 w-full p-2 rounded border" />
            <textarea name="project" value={formData.project} onChange={handleChange} placeholder="Brief project description" rows={4} className="bg-slate-50 w-full p-2 rounded border" />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Submit Request</button>
          </form>
        </section>
      </body>
    </html>
  );
}
