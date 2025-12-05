import React from "react";
import { Leaf, Mail, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1A1F2A] text-gray-300 border-t border-amber-900/20">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <aside className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/10 rounded-xl">
                <Leaf className="w-8 h-8 text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Digital Life Lessons
              </h2>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              A sacred space to preserve the wisdom that shaped you. Reflect.
              Grow. Share what truly matters.
            </p>
            <p className="text-sm text-amber-400/80">
              © 2025 Digital Life Lessons. All rights reserved.
            </p>
          </aside>

          {/* Quick Links */}
          <nav className="space-y-4">
            <h6 className="text-amber-500 font-semibold text-lg">Explore</h6>
            <div className="space-y-3">
              <a
                href="/"
                className="block hover:text-amber-400 transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="/public-lessons"
                className="block hover:text-amber-400 transition-colors duration-200"
              >
                Public Lessons
              </a>
              <a
                href="/dashboard/add-lesson"
                className="block hover:text-amber-400 transition-colors duration-200"
              >
                Write a Lesson
              </a>
              <a
                href="/pricing"
                className="block hover:text-amber-400 transition-colors duration-200"
              >
                Go Premium
              </a>
            </div>
          </nav>

          {/* Community & Legal */}
          <nav className="space-y-4">
            <h6 className="text-amber-500 font-semibold text-lg">Community</h6>
            <div className="space-y-3">
              <a
                href="/about"
                className="block hover:text-amber-400 transition-colors duration-200"
              >
                About Us
              </a>
              <a
                href="/blog"
                className="block hover:text-amber-400 transition-colors duration-200"
              >
                Blog
              </a>
              <a
                href="/terms"
                className="block hover:text-amber-400 transition-colors duration-200"
              >
                Terms & Conditions
              </a>
              <a
                href="/privacy"
                className="block hover:text-amber-400 transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </div>
          </nav>

          {/* Contact & Social */}
          <nav className="space-y-5">
            <div>
              <h6 className="text-amber-500 font-semibold text-lg mb-4">
                Stay Connected
              </h6>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5" />
                <span className="text-sm">hello@dllessons.com</span>
              </div>
            </div>

            <div className="flex gap-5">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-amber-500/20 rounded-xl transition-all duration-300 group"
              >
                <Twitter className="w-5 h-5 group-hover:text-amber-400" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-amber-500/20 rounded-xl transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 group-hover:text-amber-400" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-amber-500/20 rounded-xl transition-all duration-300 group"
              >
                <Github className="w-5 h-5 group-hover:text-amber-400" />
              </a>
            </div>

            <p className="text-xs text-gray-500 mt-6">
              Made with <span className="text-red-500">❤️</span> for those who
              believe every experience teaches something beautiful.
            </p>
          </nav>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            "The unexamined life is not worth living." – Socrates
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
