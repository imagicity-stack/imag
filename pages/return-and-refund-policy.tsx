import Layout from '../components/layout/Layout';

export default function RefundPolicy() {
  return (
    <Layout title="Return and Refund Policy" description="Return and refund guidelines for IMAGICITY.">
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-6">
        <h1 className="text-3xl font-bold">Return and Refund Policy</h1>
        <p className="text-gray-300">Understand how we handle returns and refunds.</p>
        <iframe src="/return-and-refund-policy/index.html" className="w-full h-[70vh] rounded-xl border border-gray-800" />
      </div>
    </Layout>
  );
}
