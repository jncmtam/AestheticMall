// New file: src/pages/Contact.tsx
export default function Contact() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <form className="space-y-4">
        <input type="text" placeholder="Name" className="block w-full p-2 border rounded" />
        <input type="email" placeholder="Email" className="block w-full p-2 border rounded" />
        <textarea placeholder="Message" className="block w-full p-2 border rounded h-32" />
        <button type="submit" className="bg-purple-500 text-white px-6 py-3 rounded">Send</button>
      </form>
    </div>
  );
}