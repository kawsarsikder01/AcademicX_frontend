'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

import PaymentGateways from './gateways';
import axios from 'axios';
export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart(); // assume totalPrice is in BDT
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [selectedGatewayId, setSelectedGatewayId] = useState<number | null>(null);

  // If you have dynamic gateway list from PaymentGateways, you can import or fetch it.
  // Here we use the default inside PaymentGateways.

  if (!items || items.length === 0) {
    // If no items, redirect to cart
    router.push('/cart');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedGatewayId) {
      toast.error('Please select a payment gateway.');
      return;
    }

    setProcessing(true);

    const course_ids = items.map(item => item.id);

    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout`, {
      course_ids,
      gateway_id: selectedGatewayId,
    }).then(response => {
      console.log(response.data);
      const { redirect_url } = response.data;
      if (redirect_url) {
        clearCart();
        window.location.href = redirect_url;
      } else {
        toast.error('Failed to initiate payment. Please try again.');
      }
      setProcessing(false);
    }).catch(error => {
      toast.error(error.response?.data || 'An error occurred during checkout.');
      setProcessing(false);
    });
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <PaymentGateways
                  baseAmountBDT={totalPrice}
                  selectedId={selectedGatewayId}
                  onSelect={setSelectedGatewayId}
                />

                <div className="flex items-center justify-between gap-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={processing || selectedGatewayId === null}
                  >
                    {processing ? 'Processing...' : `Pay ${totalPrice.toFixed(2)} BDT`}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
