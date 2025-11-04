"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt="Encrypted Rights Distributor" 
              width={48} 
              height={48}
              className="h-12 w-12"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Encrypted Rights Distributor
              </h1>
              <p className="text-sm text-muted-foreground">
                Publish Safely, License Transparently
              </p>
            </div>
          </div>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};
