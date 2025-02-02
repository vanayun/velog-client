import * as React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import ActiveEditor, { ActiveEditorProps } from '../ActiveEditor';
import { createStore } from 'redux';
import rootReducer from '../../../modules';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import renderWithProviders from '../../../lib/renderWithProviders';

describe('ActiveEditor', () => {
  const setup = (props: Partial<ActiveEditorProps> = {}) => {
    const utils = renderWithProviders(<ActiveEditor {...props} />);
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    const utils = setup();
    utils.getByTestId('codemirror'); // initial mode: WYSIWYG
  });
  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
  it('converts editor properly', async () => {
    const { getByTestId, getByText } = setup({});
    const convertButton = getByTestId('quillconvert');
    fireEvent.click(convertButton);
    const confirmButton = getByText('확인');
    fireEvent.click(confirmButton);
    getByTestId('quill');
  });
});
