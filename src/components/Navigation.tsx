import ThemeSwitcher from './ThemeSwitcher';
import { ExternalLink } from 'lucide-react';

interface NavigationProps {
  logoSrc: string;
}
//
export default function Navigation({ logoSrc }: NavigationProps) {
  return (
    <nav className="bg-[#050505] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="block">
              <img
                src={logoSrc}
                alt="Innfactory AI Consulting"
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Right side - Link and Theme Switcher */}
          <div className="flex items-center gap-4">
            <a
              href="https://innfactory.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors text-sm font-medium flex items-center gap-1.5"
            >
              innfactory.ai
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
