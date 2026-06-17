import Link from "next/link";
import { FlaskConical } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <FlaskConical className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-primary">
                Chemtrack
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Enterprise-grade chemical inventory management built for compliance, safety, and operational control.
            </p>
            <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link>
              <Link href="#" className="hover:text-primary transition-colors">GitHub</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="#solutions" className="text-muted-foreground hover:text-primary transition-colors">Solutions</Link></li>
              <li><Link href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Security</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Industries</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Chemical Manufacturing</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Pharmaceuticals</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Laboratories</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Water Treatment</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">API Reference</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Chemtrack. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <span className="font-semibold">Powered by Innonsh Technologies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
