import FAQ from '../components/FAQ';
import FeedbackForm from '../components/FeedbackForm';

export default function Contact() {
  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4 text-center">Frequently Asked Questions</h2>
        </div>

        <div className="col-12 col-md-8 offset-md-2 mb-5">
          <FAQ />
        </div>

        <div className="col-12 col-md-6 offset-md-3">
          <FeedbackForm />
        </div>
      </div>
    </div>
  );
}
