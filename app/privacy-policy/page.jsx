import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Privacy Policy | IMAGICITY'
};

export default function PrivacyPolicyPage() {
  redirect('/privacy-policy/index.html');
}
