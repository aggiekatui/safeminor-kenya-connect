
import React from 'react';
import { Button } from '@/components/ui/button';

export default function UssdSection() {
  return (
    <section className="py-16 safeminor-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Access SafeMinor Kenya via USSD
            </h2>
            <p className="mt-4 text-lg">
              No internet? No problem. Access our services by dialing:
            </p>
            <div className="mt-6 p-6 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold text-center">*XXX*YYY#</div>
              <p className="text-center mt-2 text-sm">Available on all major mobile networks in Kenya</p>
            </div>
            <div className="mt-8">
              <Button className="bg-white text-safeminor-primary hover:bg-gray-100">
                Learn More About USSD Access
              </Button>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 flex justify-center">
            <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
              <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
              <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
              <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white">
                <div className="bg-gray-900 p-4 text-white">
                  <div className="text-center font-bold">SafeMinor USSD</div>
                </div>
                <div className="p-4">
                  <div className="text-sm">
                    <div className="font-bold mb-3">Welcome to SafeMinor Kenya USSD</div>
                    <div className="mb-2">1. Report a case</div>
                    <div className="mb-2">2. Check case status</div>
                    <div className="mb-2">3. Find help near you</div>
                    <div className="mb-2">4. Emergency contacts</div>
                    <div className="mb-2">5. Change language</div>
                    <div className="mt-4 border-t pt-2">Reply with number (1-5)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
