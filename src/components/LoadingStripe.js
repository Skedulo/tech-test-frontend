/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const base = css`
  @keyframes pulse {
    0% {
      transform-origin: bottom right;
      transform: scaleX(1);
    }
    50% {
      transform-origin: bottom right;
      transform: scaleX(0);
    }
    50.01% {
      transform-origin: bottom left;
      transform: scaleX(0);
    }
    100% {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }

  position: relative;

  ::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #3cefff;
    animation: none;
  }
`;

const animation = css`
  animation: pulse 2s cubic-bezier(0.19, 1, 0.22, 1) infinite;
`;

const LoadingStripe = ({ isLoading }) => (
  <div
    css={css`
      ${base};
      ${isLoading && animation};
    `}
    aria-hidden="true"
  />
);

export default LoadingStripe;
