import styled from 'styled-components';

const CardStyle = styled.div`
  .swimlane__container {
    min-width: 800px;
  }

  .swimlane__lane {
    height: 50px;
    width:100%;
    display: flex;
    flex-direction: row;
    border: 1px solid #d4d7de;
    border-bottom-width: 0;
  }

  .swimlane__lane:last-child {
    border-bottom-width: 1px;
  }

  .swimlane__title {
    width: 120px;
    padding-left: 20px;
    border-right: 1px solid #d4d7de;
    line-height: 3em;
  }

  .swimlane__detail {
    flex-grow: 1;
    padding: 7px 0;
    position: relative;
  }

  .swimlane__card {
    position: absolute;
    top: 7px;
    bottom: 7px;
    overflow: hidden;
    display: inline-block;
    border: 1px solid #d4d7de;
    box-shadow: 0 1px 6px 0 #d4d7de;
  }
`;

export { CardStyle };

