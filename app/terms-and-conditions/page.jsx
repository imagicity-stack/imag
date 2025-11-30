import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Terms and Conditions | IMAGICITY'
};

export default function TermsAndConditionsPage() {
  redirect('/terms-and-conditions/index.html');
}
