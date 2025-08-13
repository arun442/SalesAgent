export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8 ">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>
          © {new Date().getFullYear()} Global Knowledge Technologies. All rights
          reserved.
        </p>
        <div className="space-x-4 mt-4 md:mt-0">
          <a
            href="#"
            className="hover:text-primary cursor-pointer"
          >
            Privacy Policy
          </a>
          <span>|</span>
          <a href="#" className="hover:text-primary cursor-pointer">
            Terms of Use
          </a>
        </div>
      </div>
    </footer>
  );
}
