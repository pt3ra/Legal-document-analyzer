import React from 'react'

function faq({faq, index, toggleFAQ}) {
  return (
    <div className={'faq ' + (faq.open ? 'open' : '')} key={index} onClick={() => toggleFAQ(index)}>
        <div className='faq-question'>
            {faq.question}
        </div>
        <div className='faq-answer'>
            {faq.answer}
        </div>

    </div>
  )
}

export default faq