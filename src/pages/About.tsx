import { useNavigate } from 'react-router-dom';
import about from '../images/about.jpg';

function About() {
  const navigate = useNavigate();

  return (
    <div className='about'>
      <div className='about__container'>
        <div className='about__text-container'>
          <h2 className='about__heading'>Магазин для твоего дома</h2>
          <p className='about__text'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <button onClick={() => navigate('/', { replace: true })}>
            К покупкам
          </button>
        </div>
      </div>
      <img className='about__img' src={about} />
    </div>
  );
}

export default About;
