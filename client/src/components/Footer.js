export const Footer=()=> {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121212] text-white py-4">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm tracking-wide">
          © {currentYear} Ayushi Jain. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
