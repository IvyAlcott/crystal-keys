"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookCard } from "@/components/BookCard";
import { PublisherForm } from "@/components/PublisherForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Library, ShieldCheck } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { useBookRights, type Book } from "@/hooks/useBookRights";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { isConnected } = useAccount();
  const { registerBook, decryptBookRights, isEncrypting } = useBookRights();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const [books, setBooks] = useState<Book[]>([
    {
      id: "1",
      title: "Digital Publishing in the Blockchain Era",
      author: "Sarah Chen",
      publisher: "TechPress Publishing",
      genre: "Technology",
      pricingTier: "Premium - $9.99",
      distributionWindow: "Exclusive - 6 months",
      isLocked: true,
    },
    {
      id: "2",
      title: "Cryptographic Rights Management",
      author: "Michael Rodriguez",
      publisher: "Crypto Books Ltd",
      genre: "Technology",
      pricingTier: "Standard - $4.99",
      distributionWindow: "Limited - 3 months",
      isLocked: true,
    },
    {
      id: "3",
      title: "The Future of Digital Content",
      author: "Emily Watson",
      publisher: "Future Media Corp",
      genre: "Business",
      pricingTier: "Basic - $2.99",
      distributionWindow: "Open - Unlimited",
      isLocked: true,
    },
  ]);

  const handleAddBook = async (newBook: Omit<Book, "id" | "isLocked">) => {
    const registeredBook = await registerBook(newBook);
    if (registeredBook) {
      setBooks([registeredBook, ...books]);
      return registeredBook;
    }
  };

  const handleDecrypt = async (bookId: string) => {
    const success = await decryptBookRights(bookId);
    if (success) {
      setBooks(
        books.map((book) =>
          book.id === bookId ? { ...book, isLocked: false } : book
        )
      );
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Publish Safely, License Transparently
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Register encrypted licensing terms for digital books. Verified
            distributors can decrypt pricing tiers and distribution windows
            without exposing sensitive deal structures.
          </p>
          {!isConnected && (
            <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-lg p-6 max-w-md mx-auto">
              <ShieldCheck className="w-12 h-12 text-secondary mx-auto mb-4" />
              <p className="text-primary-foreground mb-4">
                Connect your Rainbow Wallet to unlock rights details and
                complete licensing transactions
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        {!isConnected ? (
          <div className="text-center py-20">
            <Library className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">
              Connect Your Wallet to Get Started
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Please connect your Rainbow Wallet using the button in the header
              to access the platform and view encrypted book rights.
            </p>
          </div>
        ) : (
          <Tabs defaultValue="marketplace" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger
                value="marketplace"
                className="flex items-center gap-2"
              >
                <Library className="w-4 h-4" />
                Marketplace
              </TabsTrigger>
              <TabsTrigger value="publisher" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Publisher Portal
              </TabsTrigger>
            </TabsList>

            <TabsContent value="marketplace" className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-2">
                  Encrypted Book Rights Marketplace
                </h3>
                <p className="text-muted-foreground">
                  Browse available books and decrypt licensing terms with your
                  verified wallet
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                  <BookCard
                    key={book.id}
                    {...book}
                    onDecrypt={async () => await handleDecrypt(book.id)}
                  />
                ))}
              </div>

              {books.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No books registered yet. Be the first to publish!
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="publisher" className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-2">Publisher Portal</h3>
                <p className="text-muted-foreground">
                  Register new books with encrypted licensing terms
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <PublisherForm onSubmit={handleAddBook} isSubmitting={isEncrypting} />
              </div>

              {books.length > 0 && (
                <div className="mt-12">
                  <h4 className="text-2xl font-bold mb-6 text-center">
                    Your Published Books
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                      <BookCard
                        key={book.id}
                        {...book}
                        onDecrypt={async () => await handleDecrypt(book.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </main>

      <Footer />
      <Toaster />
    </div>
  );
}
