"use client";

import { Lock, Unlock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface BookCardProps {
  title: string;
  author: string;
  publisher: string;
  isLocked: boolean;
  pricingTier?: string;
  distributionWindow?: string;
  genre?: string;
  onDecrypt?: () => Promise<void>;
}

export const BookCard = ({ 
  title, 
  author, 
  publisher, 
  isLocked, 
  pricingTier, 
  distributionWindow,
  genre,
  onDecrypt 
}: BookCardProps) => {
  const [isDecrypting, setIsDecrypting] = useState(false);

  const handleDecrypt = async () => {
    if (!onDecrypt) return;
    
    setIsDecrypting(true);
    try {
      await onDecrypt();
    } catch (error) {
      console.error("Decrypt error:", error);
    } finally {
      setIsDecrypting(false);
    }
  };

  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-book)] ${
      isLocked ? "bg-locked/5" : "bg-card"
    }`}>
      {isLocked && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="outline" className="bg-locked text-locked-foreground border-locked">
            <Lock className="w-3 h-3 mr-1" />
            Encrypted
          </Badge>
        </div>
      )}
      
      {!isLocked && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="outline" className="bg-accent text-accent-foreground border-accent">
            <Unlock className="w-3 h-3 mr-1" />
            Unlocked
          </Badge>
        </div>
      )}

      <CardHeader>
        <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
        <CardDescription className="space-y-1">
          <p className="font-medium">by {author}</p>
          <p className="text-xs">Published by {publisher}</p>
          {genre && <Badge variant="secondary" className="mt-2">{genre}</Badge>}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {isLocked ? (
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span className="font-mono">••••••••••••</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span className="font-mono">••••••••••••</span>
            </div>
            <p className="text-xs mt-2">Connect wallet to decrypt licensing terms</p>
          </div>
        ) : (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Pricing Tier:</span>
              <span className="font-semibold text-secondary">{pricingTier}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Distribution:</span>
              <span className="font-semibold">{distributionWindow}</span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        {isLocked ? (
          <Button 
            onClick={handleDecrypt}
            disabled={isDecrypting}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isDecrypting ? (
              <>
                <Lock className="w-4 h-4 mr-2 animate-pulse" />
                Decrypting...
              </>
            ) : (
              <>
                <Unlock className="w-4 h-4 mr-2" />
                Decrypt Rights
              </>
            )}
          </Button>
        ) : (
          <Button variant="outline" className="w-full">
            <Eye className="w-4 h-4 mr-2" />
            View Full Terms
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
