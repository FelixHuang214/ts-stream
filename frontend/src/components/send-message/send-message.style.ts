import styled from "styled-components";
import ContentEditable from "@/components/content-editable/content-editable.component";

export const Form = styled.form``;

export const Username = styled.p`
      font-size: 1.2rem;
    color: rgba(255,255,255,0.5);
    font-weight: bold;
`

export const TopField = styled.div`
  display: flex;
`;

export const Photo = styled.div`
  width: 24px;
  height: 24px;
  min-width: 24px;
  background-color: blue;
  border-radius: 50%;
`;

export const InputField = styled.div`
  color: white;
  flex-grow: 1;
  margin-left: 1.6rem;
`;

export const Underline = styled.div`
  width: 100%;
  height: 1px;
  background-color: #666;
  margin-top: 2px;
`;

export const Input = styled.input`
  color: white;
  width: 100%;
`;

export const StyledContentEditable = styled(ContentEditable)`
  color: white;
  word-break: break-word;
  max-width: 100%;
  font-size: 1.2rem;
  line-height: 1.8rem;
  max-height: 10rem;
  overflow-y: auto;
  overflow-x: hidden;
  overflow-wrap: break-word;

  &:hover {
    border: 0;
  }

  &:focus-visible {
    outline: 0;
  }
`;

export const BottomField = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

export const EmojiPicker = styled.div``;