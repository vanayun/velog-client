import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import SettingEditButton from './SettingEditButton';
import { userThumbnail } from '../../static/images';
import useToggle from '../../lib/hooks/useToggle';
import SettingInput from './SettingInput';
import useInputs from '../../lib/hooks/useInputs';

export type SettingUserProfileProps = {
  onUpload: () => void;
  onClearThumbnail: () => void;
  onUpdate: (params: { shortBio: string; displayName: string }) => Promise<any>;
  thumbnail: string | null;
  displayName: string;
  shortBio: string;
};

function SettingUserProfile({
  onUpdate,
  onUpload,
  onClearThumbnail,
  thumbnail,
  displayName,
  shortBio,
}: SettingUserProfileProps) {
  const [edit, onToggleEdit] = useToggle(false);
  const [inputs, onChange] = useInputs({
    displayName,
    shortBio,
  });
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(inputs);
    onToggleEdit();
  };

  return (
    <Section>
      <div className="thumbnail-area">
        <img src={thumbnail || userThumbnail} alt="profile" />
        <Button onClick={onUpload}>이미지 업로드</Button>
        <Button color="transparent" onClick={onClearThumbnail}>
          이미지 제거
        </Button>
      </div>
      <div className="info-area">
        {edit ? (
          <Form onSubmit={onSubmit}>
            <SettingInput
              placeholder="이름"
              fullWidth
              className="display-name"
              name="displayName"
              value={inputs.displayName}
              onChange={onChange}
            />
            <SettingInput
              placeholder="한 줄 소개"
              fullWidth
              name="shortBio"
              value={inputs.shortBio}
              onChange={onChange}
              autoFocus
            />
            <div className="button-wrapper">
              <Button>저장</Button>
            </div>
          </Form>
        ) : (
          <>
            <h2>{displayName}</h2>
            <p>{shortBio}</p>
            <SettingEditButton onClick={onToggleEdit} />
          </>
        )}
      </div>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  height: 13.75rem;
  .thumbnail-area {
    padding-right: 1.5rem;
    display: flex;
    flex-direction: column;
    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
      display: block;
      margin-bottom: 1.25rem;
    }
    button + button {
      margin-top: 0.5rem;
    }
  }
  .info-area {
    flex: 1;
    padding-left: 1.5rem;
    border-left: 1px solid ${palette.gray2};
    h2 {
      font-size: 2.25rem;
      margin: 0;
      line-height: 1.5;
      color: ${palette.gray8};
    }
    p {
      font-size: 1rem;
      margin-top: 0.25rem;
      margin-bottom: 0.5rem;
      line-height: 1.5;
      color: ${palette.gray6};
    }
  }
`;

const Form = styled.form`
  input + input {
    margin-top: 1rem;
  }
  .display-name {
    font-size: 1.5rem;
    font-weight: 600;
  }
  .button-wrapper {
    display: flex;
    margin-top: 1.5rem;
    justify-content: flex-end;
  }
`;

export default SettingUserProfile;
