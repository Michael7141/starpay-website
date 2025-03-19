import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import PaymentIntegrations from "@/components/payment-integrations";
import RequestMoneySection from "@/components/request-money-section";
import MerchantDashboardSection from "@/components/merchant-dashboard-section";
import GenerateBillSection from "@/components/generate-bill-section";
import WhatStarPayOffersSection from "@/components/what-starpay-offers-section";
import LastIntegrationSection from "@/components/last-integration-section";
import RemittanceApiSection from "@/components/remittance-api-section";
import StarCoinSection from "@/components/star-coin-section";
import JoinMerchantsSection from "@/components/join-merchants-section";
import PaymentSolutionsSection from "@/components/payment-solutions-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a1a1a] text-white">
      <header className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/logo2.png"
            alt="StarPay Logo"
            width={120}
            height={40}
            className="mr-8"
          />
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#products"
              className="text-white/80 hover:text-white transition-colors"
            >
              Products
            </Link>
            <Link
              href="#features"
              className="text-white/80 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#developers"
              className="text-white/80 hover:text-white transition-colors"
            >
              Developers
            </Link>
            <Link
              href="#faq"
              className="text-white/80 hover:text-white transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="#about"
              className="text-white/80 hover:text-white transition-colors"
            >
              About us
            </Link>
          </nav>
        </div>
        <Button className="bg-[#008F5F] hover:bg-emerald-600 text-white rounded-full">
          Become a Merchant{" "}
          <Icon icon="tabler:arrow-right" className="ml-2 h-4 w-4" />
        </Button>
      </header>

      <section className="container mx-auto px-4 pt-20 pb-10 text-center relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            STARPAY - THE SMARTER WAY
            <br />
            TO ACCEPT PAYMENTS
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto mb-12">
            With StarPay, you can effortlessly send or receive money from any
            bank or digital wallet across Ethiopia, making
            <br />
            transactions not only convenient but also secure. Whether
            you&apos;re paying for...
          </p>
          <Button className="bg-[#008F5F] hover:bg-emerald-600 text-white rounded-full" size={"lg"}>
            Explore More <ChevronDown className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute w-[800px] h-[800px] rounded-full bg-emerald-500/10 blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="mt-16 relative z-10">
          <Image
            src="/hero1.png"
            alt="StarPay Dashboard"
            width={1000}
            height={500}
            className="mx-auto rounded-xl shadow-2xl"
          />
        </div>
      </section>

      <PaymentIntegrations />

      <RequestMoneySection />

      <GenerateBillSection />

      <WhatStarPayOffersSection />

      <MerchantDashboardSection />

      <LastIntegrationSection />

      <RemittanceApiSection />

      <StarCoinSection />

      <JoinMerchantsSection />

      <PaymentSolutionsSection />

      <section className="py-20 bg-[#0a1a1a]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Continue Exploring StarPay
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Discover more features and benefits of using StarPay for your
            business.
          </p>
        </div>
      </section>
    </div>
  );
}
