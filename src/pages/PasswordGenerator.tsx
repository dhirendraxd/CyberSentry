
import React from 'react';
import Layout from '@/components/Layout';
import PasswordGeneratorComponent from '@/components/PasswordGenerator/PasswordGenerator';

const PasswordGenerator = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Password Generator</h1>
        <PasswordGeneratorComponent />
      </div>
    </Layout>
  );
};

export default PasswordGenerator;
