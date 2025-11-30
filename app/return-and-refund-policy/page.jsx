import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Return and Refund Policy | IMAGICITY'
};

export default function ReturnAndRefundPolicyPage() {
  redirect('/return-and-refund-policy/index.html');
}
