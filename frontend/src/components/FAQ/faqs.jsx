import React, { useState } from 'react'
import './faqs.css'
import FAQ from './faq'

// Initializing FAQ section with content and state
const faqs = () => {
  const [faqs, setfaqs] = useState([
    {
      question: 'How accurate is the analysis?',
      answer: 'Our AI is trained on thousands of real legal documents and uses advanced natural language understanding. While it offers highly accurate and useful feedback, we still recommend a final review by a legal professional for critical matters. ',
      open: false
    },
    {
      question: 'Is my document secure?',
      answer: 'Sample answer 2',
      open: false
    },
    {
      question: 'How fast is the document review?',
      answer: 'Sample answer 3',
      open: false
    }
  ]);

  // Function that toggles faq element state => open/closed
  const toggleFAQ = index =>{
    setfaqs(faqs.map((faq, i) =>{
      if(i === index){
        faq.open = !faq.open;
      }

      return faq;
    }))
  }

  return (
    <div className='faqs'>
      {faqs.map((faq, i) =>(
        <div>
          <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
        </div>
      ))}
    </div>
  )
}

export default faqs