// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-6 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} my121shop — Firebase Free Plan के साथ।
      </div>
    </footer>
  );
}