import styled from "styled-components";

export const Container = styled.div`
  flex-grow: 1;
  min-width: 640px;

  @media (max-width: 1024px) {
    min-width: auto;
  }
`;

export const Video = styled.video`
  width: 100%;
  height: 100%;
`