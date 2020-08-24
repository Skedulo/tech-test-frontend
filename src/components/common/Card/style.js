import styled from 'styled-components';

const CardStyle = styled.div`
  position: relative;
  height: 90px;
  margin: 20px;
  padding: 20px;
  background: ${props => props.color.card.bg};
  .card-header {
    .card-header-title {
      font-size: 18px;
      font-weight: bold;
      margin-right: 5px;
      color: ${props => props.color.card.headerText};
    }
    .card-header-desc {
      font-size: 16px;
      color: ${props => props.color.card.lightText};
    }
  }
  .card-sub-header {
    font-size: 16px;
    color: ${props => props.color.card.lightText};
  }
  .card-footer {
    display: grid;
    position: absolute;
    bottom: 20px;
    font-size: 16px;
    .card-footer-title {
      font-weight: bold;
      color: ${props => props.color.card.boldText};
    }
    .card-footer-desc {
      color: ${props => props.color.card.lightText};
    }
  }
  .card-counter {
    position: absolute;
    bottom: 20px;
    right: 20px;
    height: 36px;
    width: 36px;
    font-size: 14px;
    border-radius: 50%;
    border: 2px solid ${props => props.color.card.counter};
    color: ${props => props.color.card.counter};
    font-weight: bold;
    display: flex;
    span {
      margin: auto;
    }
  }
`;

export { CardStyle };

