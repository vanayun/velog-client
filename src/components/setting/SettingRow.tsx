import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import SettingEditButton from './SettingEditButton';

export type SettingRowProps = {
  title: string;
  children: React.ReactNode;
  editButton?: boolean;
  description?: string;
};

function SettingRow({
  title,
  children,
  editButton,
  description,
}: SettingRowProps) {
  return (
    <Row>
      <div className="wrapper">
        <div className="title-wrapper">
          <h3>{title}</h3>
        </div>
        <div className="contents">{children}</div>
        {editButton && (
          <div className="edit-wrapper">
            <SettingEditButton />
          </div>
        )}
      </div>
      {description && <div className="description">{description}</div>}
    </Row>
  );
}

const Row = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  & > .wrapper {
    display: flex;
  }
  .title-wrapper {
    width: 9.5rem;
    flex-shrink: 0;
    h3 {
      line-height: 1.5;
      color: ${palette.gray8};
      margin: 0;
      font-size: 1.125rem;
    }
  }
  .contents {
    flex: 1;
    font-size: 1rem;
    color: ${palette.gray7};
    line-height: 1.5;
  }
  .description {
    margin-top: 0.875rem;
    color: ${palette.gray6};
    font-size: 0.875rem;
  }
  .edit-wrapper {
    display: flex;
    align-items: center;
    margin-left: 1rem;
  }
  & + & {
    border-top: 1px solid ${palette.gray2};
  }
`;

export default SettingRow;
