export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 mt-auto">
      <p className="text-center text-sm text-gray-400 p-4">&copy; {new Date().getFullYear()} Algorithm Visualizer</p>
    </footer>
  );
}