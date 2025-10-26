
import React from 'react';
import Layout from '@/components/Layout';
import PasswordStrengthMeter from '@/components/PasswordAnalyzer/PasswordStrengthMeter';
import IPLocationInfo from '@/components/IPLocationInfo';

const PasswordAnalyzer = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Password Analyzer</h1>
        <PasswordStrengthMeter />
        <div className="mt-8">
          <h2 className="text-xl font-medium text-white mb-4">Your Connection Information</h2>
          <IPLocationInfo />
        </div>
      </div>
    </Layout>
  );
};

export default PasswordAnalyzer;
