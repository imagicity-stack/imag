import Layout from '../components/layout/Layout';

export default function TermsAndConditions() {
  return (
    <Layout title="Terms and Conditions" description="Usage terms for IMAGICITY.">
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-6">
        <h1 className="text-3xl font-bold">Terms and Conditions</h1>
        <p className="text-gray-300">Review the latest service terms.</p>
        <iframe src="/terms-and-conditions/index.html" className="w-full h-[70vh] rounded-xl border border-gray-800" />
      </div>
    </Layout>
  );
}
