
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
import Intro from "@/components/intro";
import StickySectionContent from "@/components/about-us/sticky-scroll-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a1a1a] text-white">
      <Intro />

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

      <StickySectionContent />

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
