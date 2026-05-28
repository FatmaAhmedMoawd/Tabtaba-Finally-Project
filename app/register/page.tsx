import React from 'react';
import type { Metadata } from 'next';
import { RegisterPageContent } from './register-client';

export const metadata: Metadata = {
  title: 'Create an Account - Tabtaba',
  description: 'Create a new account to begin your journey towards better mental health.',
};

export default function RegisterPage() {
  return <RegisterPageContent />;
}
