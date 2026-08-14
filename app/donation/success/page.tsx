import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";



export default function DonationSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <div className=" pt-28 flex-1 bg-brand-light flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-brand-light-surface border border-brand-light-border p-8 lg:p-12 text-center shadow-sm">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-brand-red" />
            </div>
          </div>
          
          <h1 className="text-3xl font-black text-brand-light-text tracking-tight mb-4">
            Thank You!
          </h1>
          
          <p className="text-brand-light-muted mb-8 leading-relaxed">
            Your donation has been successfully processed. We have sent a confirmation email to the address provided during checkout. Your support is greatly appreciated and helps us continue our mission.
          </p>
          
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-brand-red text-white text-sm font-bold px-8 py-4 tracking-widest uppercase hover:bg-brand-red/90 active:scale-95 transition-all duration-200 group w-full"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Return to Home
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
