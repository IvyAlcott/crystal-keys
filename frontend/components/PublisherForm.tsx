"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, BookOpen } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  genre: string;
  pricingTier: string;
  distributionWindow: string;
  isLocked: boolean;
}

interface PublisherFormProps {
  onSubmit: (book: Omit<Book, "id" | "isLocked">) => Promise<Book | undefined>;
  isSubmitting?: boolean;
}

export const PublisherForm = ({ onSubmit, isSubmitting = false }: PublisherFormProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [genre, setGenre] = useState("");
  const [pricingTier, setPricingTier] = useState("");
  const [distributionWindow, setDistributionWindow] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBook = {
      title,
      author,
      publisher,
      genre,
      pricingTier,
      distributionWindow,
    };

    try {
      // This will trigger wallet signature
      const registeredBook = await onSubmit(newBook);
      
      if (registeredBook) {
        // Reset form only on success
        setTitle("");
        setAuthor("");
        setPublisher("");
        setGenre("");
        setPricingTier("");
        setDistributionWindow("");
      }
    } catch (error) {
      // Error already handled in the hook
      console.error("Form submission error:", error);
    }
  };

  return (
    <Card className="bg-card shadow-[var(--shadow-book)]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <CardTitle>Register New Book Rights</CardTitle>
        </div>
        <CardDescription>
          Encrypt and register licensing terms for your digital publication
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Book Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter book title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="publisher">Publisher</Label>
              <Input
                id="publisher"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="Enter publisher name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Select value={genre} onValueChange={setGenre} required>
                <SelectTrigger id="genre">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fiction">Fiction</SelectItem>
                  <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Self-Help">Self-Help</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricingTier">Pricing Tier (Encrypted)</Label>
              <Select value={pricingTier} onValueChange={setPricingTier} required>
                <SelectTrigger id="pricingTier">
                  <SelectValue placeholder="Select pricing tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Premium - $9.99">Premium - $9.99</SelectItem>
                  <SelectItem value="Standard - $4.99">Standard - $4.99</SelectItem>
                  <SelectItem value="Basic - $2.99">Basic - $2.99</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="distributionWindow">Distribution Window (Encrypted)</Label>
              <Select value={distributionWindow} onValueChange={setDistributionWindow} required>
                <SelectTrigger id="distributionWindow">
                  <SelectValue placeholder="Select distribution window" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Exclusive - 6 months">Exclusive - 6 months</SelectItem>
                  <SelectItem value="Limited - 3 months">Limited - 3 months</SelectItem>
                  <SelectItem value="Open - Unlimited">Open - Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isSubmitting}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            {isSubmitting ? "Encrypting & Signing..." : "Encrypt & Register Book Rights"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
