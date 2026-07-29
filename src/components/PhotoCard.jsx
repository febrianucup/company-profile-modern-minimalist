import React from 'react';
import styled from 'styled-components';

const PhotoCard = ({img, topic, mainTitle, description, date}) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card_form">
            <span>{topic}</span>
            <img src={img} alt="imgCard" />
        </div>
        <div className="card_data">
          <div style={{display: 'flex'}} className="data">
            <div className="text">
              <label className="text_m">{mainTitle}</label>
              <div className="cube text_s">
                <label className="side front">{description}</label>
                <label className="side top">{date}</label>
              </div>
            </div>
          </div>
          <span title="Acceder a la lista (Temas)">Access</span>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 6px;
    gap: 0.5rem;
    height: max-content;
    border: 2px solid #2DB34F;
  }
  .card_form {
    position: relative;
    width: 15em;
    height: 15em;
    border-radius: 4px;
    background-color: #2DB34F;
    transition: 0.2s ease-in-out;
    overflow: hidden;
  }
  .card_form span {
    font-size: 1.5em;
    position: absolute;
    inset: 0;
    padding: 5px 10px;
    color: #2DB34F;
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
    opacity: 0;
    transition: all 0.2s ease-in-out;
  }
  .card:hover .card_form span,
  .card:hover .card_data span {
    opacity: 1;
  }
  .card_data {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card_data span {
    color: #2DB34F;
    display: flex;
    align-items: center;
    font-size: 0.9em;
    transition: 0.2s ease-in-out;
    opacity: 0;
    cursor: pointer;
  }
  .card_data span:hover {
    text-decoration: underline;
  }
  .text {
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: white;
  }
  .text_m {
    font-size: 0.9em;
    color: #2DB34F;
  }
  .text_s {
    color: #2DB34F;
    font-size: 0.6em;
  }
  .cube {
    width: max-content;
    height: 10px;
    transition: all 0.2s;
    transform-style: preserve-3d;
  }
  .card:hover .cube {
    transform: rotateX(90deg);
  }
  .side {
    width: max-content;
    height: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: bold;
  }
  .top {
    transform: rotateX(-90deg) translate3d(0, 0, 0em);
  }
  .front {
    transform: translate3d(0, 0, 1em);
  }`;

export default PhotoCard;
