
import React from 'react';
import { ShieldCheck, Phone, Users, LineChart } from 'lucide-react';

interface Feature {
  name: string;
  description: string;
  icon: React.ElementType;
}

export default function FeatureSection() {
  const features: Feature[] = [
    {
      name: 'Easy Reporting',
      description: 'Report cases through our mobile app or USSD for areas with limited internet access.',
      icon: ShieldCheck,
    },
    {
      name: 'Case Tracking',
      description: 'Monitor the progress of reported cases from initial report to resolution.',
      icon: LineChart,
    },
    {
      name: 'Stakeholder Notifications',
      description: 'Automatic alerts to police officers and medical professionals when cases are reported.',
      icon: Phone,
    },
    {
      name: 'Support Network',
      description: 'Connect victims with professional psychologists and support groups.',
      icon: Users,
    },
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How SafeMinor Kenya Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Our platform connects victims, reporters, medical professionals, and law enforcement.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 rounded-md bg-safeminor-primary text-white flex items-center justify-center">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900">{feature.name}</h3>
                <p className="mt-2 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
