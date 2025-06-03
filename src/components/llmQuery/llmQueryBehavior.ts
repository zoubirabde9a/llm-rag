import { useState, useCallback } from 'react';

export interface LlmQueryProps {
  onSubmit: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  disabled?: boolean;
}

export interface LlmQueryState {
  query: string;
  isSubmitting: boolean;
}

export const useLlmQueryBehavior = (props: LlmQueryProps) => {
  const [state, setState] = useState<LlmQueryState>({
    query: props.initialValue || '',
    isSubmitting: false,
  });

  const handleQueryChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, query: event.target.value }));
  }, []);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!state.query.trim() || state.isSubmitting) return;

    setState(prev => ({ ...prev, isSubmitting: true }));
    try {
      await props.onSubmit(state.query);
      setState(prev => ({ ...prev, query: '', isSubmitting: false }));
    } catch (error) {
      setState(prev => ({ ...prev, isSubmitting: false }));
      console.error('Error submitting query:', error);
    }
  }, [state.query, state.isSubmitting, props]);

  return {
    state,
    handleQueryChange,
    handleSubmit,
  };
}; 