import React, {useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import * as Scroll from 'react-scroll';
import Hero from '../components/Hero/hero'
import Features from '../components/Features/features'
import Title from '../components/Title/title'
import About from '../components/About/about'
import Demo from '../components/Demo/demo'
import Faq from '../components/FAQ/faqs'
import Feedback from '../components/Feedback/feedback'

const mainPage = () => {
  const location = useLocation();
  const scroller = Scroll.scroller;

  useEffect(() => {
    if(location.state?.scrollTo) {
      const target = location.state.scrollTo;

      // Waiting a tick to ensure elements are in the DOM
      setTimeout(() => {
        scroller.scrollTo(target, {
          duration: 500,
          smooth: true,
          offset: -260
        });
      }, 100);

      // Clean up state to prevent re-scroll on back navigation
      window.history.replaceState({}, document.title)
    }
  }, [location.state])



  return (
    <div>
        <Hero/>
        <div className='container'>
            <Title subTitle='What We Offer' title='Powerful Features for Legal Analysis'/>
            <Features/>
        </div>
        <section className='section-layer-1'>
          <div className='container'>
            <Title subTitle='How It Works' title='Three simple steps to analyze any legal document'/>
            <About/>
          </div>
        </section>
        <section className='section-layer-2'>
            <div className='container'>
                <Title subTitle='Try It Yourself' title='Upload a document or try with our sample to see how it works'/>
                <Demo/>
            </div>
        </section>
        <section className='section-layer-1'>
            <div className='container'>
                <Title subTitle='FYI' title='Frequently Asked Questions'/>
                <Faq/>
            </div>
        </section>
        <div className='container'>
            <Title subTitle='Contact us' title='Leave Your Feedback'/>
            <Feedback/>
        </div>
    </div>
    
  )
}

export default mainPage