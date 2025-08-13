import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { EditorState, Project, Template, Version, LintResult } from '../types';

type EditorAction =
  | { type: 'SET_PROJECT'; payload: Project }
  | { type: 'SET_TEMPLATE'; payload: Template }
  | { type: 'SET_VERSION'; payload: Version }
  | { type: 'SET_COMPILED_HTML'; payload: string }
  | { type: 'SET_LINT_RESULTS'; payload: LintResult }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | undefined }
  | { type: 'SET_PREVIEW_MODE'; payload: 'desktop' | 'mobile' }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'TOGGLE_MJML_SOURCE' }
  | { type: 'RESET_STATE' };

const initialState: EditorState = {
  isLoading: false,
  previewMode: 'desktop',
  isDarkMode: false,
  showMjmlSource: false,
};

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'SET_PROJECT':
      return { ...state, currentProject: action.payload };
    case 'SET_TEMPLATE':
      return { ...state, currentTemplate: action.payload };
    case 'SET_VERSION':
      return { ...state, currentVersion: action.payload };
    case 'SET_COMPILED_HTML':
      return { ...state, compiledHtml: action.payload };
    case 'SET_LINT_RESULTS':
      return { ...state, lintResults: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_PREVIEW_MODE':
      return { ...state, previewMode: action.payload };
    case 'TOGGLE_DARK_MODE':
      return { ...state, isDarkMode: !state.isDarkMode };
    case 'TOGGLE_MJML_SOURCE':
      return { ...state, showMjmlSource: !state.showMjmlSource };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

interface EditorContextType {
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}