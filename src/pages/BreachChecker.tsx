
import React from 'react';
import Layout from '@/components/Layout';
import EmailChecker from '@/components/BreachChecker/EmailChecker';

const BreachChecker = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Data Breach Checker</h1>
        <EmailChecker />
      </div>
    </Layout>
  );
};

export default BreachChecker;
