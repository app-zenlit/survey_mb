import { CheckCircle, Loader2 } from 'lucide-react';

interface SubmitPageProps {
  onSubmit: () => void;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

export function SubmitPage({ onSubmit, isSubmitting, isSubmitted }: SubmitPageProps) {
  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h2>
        <p className="text-lg text-gray-600 mb-8">
          Your response has been submitted successfully.
        </p>
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-sm text-gray-700">
            Your feedback will help us better understand how to improve digitalization and AI adoption in our organization.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Submit?</h2>
        <p className="text-lg text-gray-600 mb-6">
          Please review your answers before submitting. Once submitted, you won't be able to make changes.
        </p>
      </div>

      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className={`inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
          isSubmitting
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-lg hover:shadow-xl'
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <CheckCircle className="w-6 h-6" />
            Submit Survey
          </>
        )}
      </button>

      <p className="text-sm text-gray-500 mt-6">
        By submitting this survey, you acknowledge that your responses will be used to improve our organization's digital initiatives.
      </p>
    </div>
  );
}
