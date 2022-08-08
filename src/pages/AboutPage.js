import React from 'react';
import styled from 'styled-components';
import { PageHero } from '../components';
import aboutImg from '../assets/hero-bcg.jpeg';

const AboutPage = () => {
  return (
    <main>
      <PageHero title='About' />
      <Wrapper className='page section section-center'>
        <img src={aboutImg} alt='Nice desk' />
        <article>
          <div className='title'>
            <h2>Our story</h2>
            <div className='underline'></div>
          </div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
            optio, odit reprehenderit obcaecati dolorem dolore quod in sapiente
            vel eaque. Eaque qui libero dignissimos. Molestiae possimus officia
            excepturi saepe quod dolorem et ea natus eum exercitationem? Ratione
            tempora ullam officiis obcaecati possimus? Modi officiis dolores eum
            ab rem optio facilis eius culpa explicabo voluptates commodi vel
            deleniti molestias consequuntur quibusdam quaerat repudiandae facere
            voluptate quas unde blanditiis necessitatibus, dolorum, delectus
            est. Consectetur quae placeat commodi quidem nemo, dolorum explicabo
            exercitationem.
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
