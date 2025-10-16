import { useState } from 'react';
import { ClipboardList } from 'lucide-react';
import { ProgressBar } from './components/ProgressBar';
import { NavigationButtons } from './components/NavigationButtons';
import { Question1 } from './components/questions/Question1';
import { Question2 } from './components/questions/Question2';
import { Question3 } from './components/questions/Question3';
import { Question4 } from './components/questions/Question4';
import { Question5 } from './components/questions/Question5';
import { Question6 } from './components/questions/Question6';
import { Question7 } from './components/questions/Question7';
import { Question8 } from './components/questions/Question8';
import { Question9 } from './components/questions/Question9';
import { Question10 } from './components/questions/Question10';
import { Question11 } from './components/questions/Question11';
import { Question12 } from './components/questions/Question12';
import { Question13 } from './components/questions/Question13';
import { Question14 } from './components/questions/Question14';
import { Question15 } from './components/questions/Question15';
import { Question16 } from './components/questions/Question16';
import { SubmitPage } from './components/questions/SubmitPage';
import { supabase } from './lib/supabase';
import type { SurveyData } from './types/survey';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [surveyData, setSurveyData] = useState<SurveyData>({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
    q6: [],
    q7a: '',
    q7b: 5,
    q8: null,
    q9: null,
    q10: [],
    q10_elaborate: '',
    q11: '',
    q12: null,
    q13: [],
    q14: null,
    q15: null,
    q16: [],
  });

  const totalPages = 17;

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isPageValid = () => {
    switch (currentPage) {
      case 0:
        return surveyData.q1 !== null;
      case 1:
        return surveyData.q2 !== null;
      case 2:
        return surveyData.q3 !== null;
      case 3:
        return surveyData.q4 !== null;
      case 4:
        return surveyData.q5 !== null;
      case 5:
        return surveyData.q6.length > 0;
      case 6:
        return surveyData.q7a.trim() !== '';
      case 7:
        return surveyData.q8 !== null;
      case 8:
        return surveyData.q9 !== null;
      case 9:
        return surveyData.q10.length > 0;
      case 10:
        return surveyData.q11.trim() !== '';
      case 11:
        return surveyData.q12 !== null;
      case 12:
        return surveyData.q13.length > 0;
      case 13:
        return surveyData.q14 !== null;
      case 14:
        return surveyData.q15 !== null;
      case 15:
        return surveyData.q16.length > 0;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('survey_responses').insert([surveyData]);

      if (error) {
        console.error('Error submitting survey:', error);
        alert('There was an error submitting your survey. Please try again.');
      } else {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <div className="flex items-center gap-3">
              <ClipboardList className="w-8 h-8 text-white" />
              <h1 className="text-3xl font-bold text-white">
                Digitalization and future tech @Chassis - Survey
              </h1>
            </div>
            <p className="text-blue-100 mt-2">
              Help us understand your experience with digital tools and AI technology
            </p>
          </div>

          <div className="p-8">
            {currentPage < totalPages - 1 && (
              <ProgressBar current={currentPage} total={totalPages} />
            )}

            <div className="min-h-[400px]">
              {currentPage === 0 && (
                <Question1
                  value={surveyData.q1}
                  onChange={(value) => setSurveyData({ ...surveyData, q1: value })}
                />
              )}
              {currentPage === 1 && (
                <Question2
                  value={surveyData.q2}
                  onChange={(value) => setSurveyData({ ...surveyData, q2: value })}
                />
              )}
              {currentPage === 2 && (
                <Question3
                  value={surveyData.q3}
                  onChange={(value) => setSurveyData({ ...surveyData, q3: value })}
                />
              )}
              {currentPage === 3 && (
                <Question4
                  value={surveyData.q4}
                  onChange={(value) => setSurveyData({ ...surveyData, q4: value })}
                />
              )}
              {currentPage === 4 && (
                <Question5
                  value={surveyData.q5}
                  onChange={(value) => setSurveyData({ ...surveyData, q5: value })}
                />
              )}
              {currentPage === 5 && (
                <Question6
                  value={surveyData.q6}
                  onChange={(value) => setSurveyData({ ...surveyData, q6: value })}
                />
              )}
              {currentPage === 6 && (
                <Question7
                  valueA={surveyData.q7a}
                  valueB={surveyData.q7b}
                  onChangeA={(value) => setSurveyData({ ...surveyData, q7a: value })}
                  onChangeB={(value) => setSurveyData({ ...surveyData, q7b: value })}
                />
              )}
              {currentPage === 7 && (
                <Question8
                  value={surveyData.q8}
                  onChange={(value) => setSurveyData({ ...surveyData, q8: value })}
                />
              )}
              {currentPage === 8 && (
                <Question9
                  value={surveyData.q9}
                  onChange={(value) => setSurveyData({ ...surveyData, q9: value })}
                />
              )}
              {currentPage === 9 && (
                <Question10
                  value={surveyData.q10}
                  elaborate={surveyData.q10_elaborate}
                  onChange={(value) => setSurveyData({ ...surveyData, q10: value })}
                  onElaborateChange={(value) =>
                    setSurveyData({ ...surveyData, q10_elaborate: value })
                  }
                />
              )}
              {currentPage === 10 && (
                <Question11
                  value={surveyData.q11}
                  onChange={(value) => setSurveyData({ ...surveyData, q11: value })}
                />
              )}
              {currentPage === 11 && (
                <Question12
                  value={surveyData.q12}
                  onChange={(value) => setSurveyData({ ...surveyData, q12: value })}
                />
              )}
              {currentPage === 12 && (
                <Question13
                  value={surveyData.q13}
                  onChange={(value) => setSurveyData({ ...surveyData, q13: value })}
                />
              )}
              {currentPage === 13 && (
                <Question14
                  value={surveyData.q14}
                  onChange={(value) => setSurveyData({ ...surveyData, q14: value })}
                />
              )}
              {currentPage === 14 && (
                <Question15
                  value={surveyData.q15}
                  onChange={(value) => setSurveyData({ ...surveyData, q15: value })}
                />
              )}
              {currentPage === 15 && (
                <Question16
                  value={surveyData.q16}
                  onChange={(value) => setSurveyData({ ...surveyData, q16: value })}
                />
              )}
              {currentPage === 16 && (
                <SubmitPage
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  isSubmitted={isSubmitted}
                />
              )}
            </div>

            {currentPage < totalPages - 1 && (
              <NavigationButtons
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={handlePrev}
                onNext={handleNext}
                disabledNext={!isPageValid()}
              />
            )}
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Your responses are confidential and will be used to improve our digital initiatives.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
