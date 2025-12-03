'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { getFile } from '@/lib/utils';
import { useSettings } from './settings-provider';

export type Gateway = {
  id: number;
  name: string;
  currency: string;
  rate: number; // rate per 1 BDT
  image: string;
  description: string;
};

type Props = {
  gateways: Gateway[];
  baseAmount: number; 
  selectedId: number | null;
  onSelect: (id: number) => void;
};

const defaultGateways: Gateway[] = [
  {
    id: 1,
    name: 'stripe',
    currency: 'USD',
    rate: 1,  
    image: 'stripe.jpg',
    description: 'Fast and secure mobile payments.',
  },
];


export default function PaymentGateways({
  gateways = defaultGateways,
  baseAmount,
  selectedId,
  onSelect,
}: Props) {

  const settings = useSettings();
  return (
    <div className="w-full space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Payment Method</h2>

      <div className="space-y-4">
        {gateways.map((g) => {
          const payable = +(baseAmount * g.rate).toFixed(2);
          const selected = selectedId === g.id;

          return (
            <Card
              key={g.id}
              onClick={() => onSelect(g.id)}
              className={cn(
                "cursor-pointer rounded-2xl border p-4 transition-all duration-200",
                "hover:shadow-lg hover:border-primary/50",
                selected && "border-primary shadow-xl bg-primary/5"
              )}
            >
              <div className="flex items-start gap-4">
                
                {/* Radio */}
                <div className="pt-1">
                  <input
                    type="radio"
                    checked={selected}
                    onChange={() => onSelect(g.id)}
                    className="h-5 w-5 accent-primary"
                  />
                </div>

                {/* Image */}
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-white shadow-sm border flex-shrink-0">
                    <Image src={getFile(g.image)} alt={g.name} unoptimized fill className="object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{g.name}</h3>
                    <span className="text-sm text-muted-foreground">{g.currency}</span>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {g.description}
                  </p>

                  <Separator />

                  <div className="flex items-center justify-between text-sm">
                    <Label className="text-muted-foreground">Rate</Label>
                    <span className="font-medium">
                      {g.rate} {g.currency} / { settings.base_currency }
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <Label className="text-muted-foreground">Payable Amount</Label>
                    <span className="text-base font-semibold text-primary">
                      {payable.toLocaleString()} {g.currency}
                    </span>
                  </div>
                </div>
              </div>

            </Card>
          );
        })}
      </div>
    </div>
  );
}
