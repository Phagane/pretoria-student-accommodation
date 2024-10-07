import { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // FAQ data
  const faqs = [
    {
      question: "What is the process for applying for accommodation?",
      answer: "You can apply for accommodation by browsing available properties, selecting one, and filling out the application form. Our team will review your application and get back to you within 3-5 business days."
    },
    {
      question: "How can I check the status of my application?",
      answer: "Once you submit an application, you can track its status in the 'My Applications' section of your profile. We’ll also send you email notifications when there are updates."
    },
    {
      question: "What documents do I need to provide?",
      answer: "You'll need to provide proof of identity, proof of enrollment, and any supporting documents for funding or scholarships (if applicable)."
    },
    {
      question: "Can I schedule a property viewing before applying?",
      answer: "Yes, you can request a property viewing before submitting your application. Just click the 'Request to View' button on the property page and select a convenient time."
    },
    {
      question: "Is there a security deposit required?",
      answer: "Yes, most properties require a security deposit. The deposit amount will vary depending on the property, and it will be stated in the property details."
    },
    {
      question: "What should I do if I need to cancel my application?",
      answer: "If you need to cancel your application, you can do so in the 'My Applications' section. Please note that once you cancel, you’ll need to reapply if you change your mind."
    },
    {
      question: "How long does it take to get approved for accommodation?",
      answer: "The approval process usually takes 3-5 business days, depending on the property owner and the completeness of your application."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-section max-w-2xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b-2 border-gray-200 pb-4">
            <h3
              className="text-lg font-medium text-gray-800 cursor-pointer flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className={`transform transition-transform ${activeIndex === index ? "rotate-180" : "rotate-0"}`}>
                &#9662;
              </span>
            </h3>
            {activeIndex === index && (
              <p className="mt-3 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
