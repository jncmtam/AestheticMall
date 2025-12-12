// New file: src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Aesthetic Gifts. All rights reserved.</p>
        <div className="space-x-4 mt-2">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">FAQ</a>
        </div>
      </div>
    </footer>
  );
}