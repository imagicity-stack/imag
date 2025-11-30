import Layout from '../components/layout/Layout';

export default function PrivacyPolicy() {
  return (
    <Layout title="Privacy Policy" description="Privacy commitments for IMAGICITY.">
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-6">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="text-gray-300">This page renders our privacy policy document.</p>
        <iframe src="/privacy-policy/index.html" className="w-full h-[70vh] rounded-xl border border-gray-800" />
      </div>
    </Layout>
  );
}
