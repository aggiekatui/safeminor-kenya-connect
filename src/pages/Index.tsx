
import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import StatSection from '../components/home/StatSection';
import FeatureSection from '../components/home/FeatureSection';
import UssdSection from '../components/home/UssdSection';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <StatSection />
      <FeatureSection />
      <UssdSection />
    </Layout>
  );
};

export default Index;
