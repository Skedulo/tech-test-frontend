import styled from 'styled-components';

const SearchableSelectFieldStyle = styled.div`
  &.select-search {
    width: 100%;
    display: inline-block;
    padding: 27px 0px 10px 0px;
    font-family: 'Roboto', 'Lato', sans-serif;
    border-radius: 10px;
    position: relative;
    color: ${(props) => props.theme.input.text};
    background-color: ${(props) => props.theme.input.bg};
    box-shadow: 5px 5px 10px ${(props) => props.theme.input.boxShadowLeft},
               -5px -5px 10px ${(props) => props.theme.input.boxShadowRight};
    &.disabled {
      pointer-events: none;
    }
  }

  .select-wrapper {
    position: relative;
    display: block;
    width: calc(100% - 20px);
    max-width: calc(100% - 20px);
    background: ${(props) => props.theme.input.bg};
    color: ${(props) => props.theme.input.text};
    cursor: pointer;
    outline: none;
    min-width: 200px;
    list-style: none;
    border: solid 1px ${(props) => props.theme.input.text};
    border-radius: 10px;
    margin: auto;
    &.active {
      border-bottom: none;
      border-radius: 0;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .select-list {
      position: absolute;
      width: 100%;
      background: ${(props) => props.theme.input.bg};
      display: none;
      left: -1px;
      border: solid 1px ${(props) => props.theme.input.text};
      border-top: none;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      z-index: 1001;
      max-height: 300px;
      overflow-y: scroll;
      &.active {
        display: block;
      }
      .select-item {
        padding: 5px;
        padding-left: 15px;
        border-top: solid 1px ${(props) => props.theme.input.text};
        border-bottom: none;
        cursor: pointer;
        &:nth-last-child(1) {
          border-bottom: solid 0px ${(props) => props.theme.input.text};
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }
        &:hover {
          background-color: ${(props) => props.theme.input.dpActive};
        }
      }
    }
  }

  .select-input {
    position: relative;
    cursor: pointer;
    background: transparent;
    outline: none;
    border: none;
    width: calc(100% - 30px);
    margin-left: 15px;
    padding: 10px 0px;
    font-size: 13.3333px;
    color: ${(props) => props.theme.input.text};
    &:focus {
      outline: none;
    }
  }
`;

export { SearchableSelectFieldStyle };
