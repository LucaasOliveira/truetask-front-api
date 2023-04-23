import styled from "styled-components";

const TrueTask = styled.h1`
  @keyframes blinkCursor {
    from {
      border-right-color: #ffffff;
    }
    to {
      border-right-color: transparent;
    }
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 4.8em;
    }
  }

  color: #ffffff;
  margin: 0 auto;
  text-align: center;
  font-family: "Cutive Mono", monospace;
  border-right: 2px solid #ffffff;
  white-space: nowrap;
  overflow: hidden;
  font-size: 42px;
  word-spacing: -8px;
  letter-spacing: -0.5px;
  animation: blinkCursor 0.5s steps(15) infinite normal,
    typing 3s steps(15) 1s normal both;
`;

export { TrueTask };
