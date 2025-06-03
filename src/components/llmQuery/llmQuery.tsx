import React from 'react';
import { CircularProgress } from '@mui/material';
import { QueryContainer, StyledTextField, SubmitButton } from './llmQueryStyles';
import { LlmQueryProps, useLlmQueryBehavior } from './llmQueryBehavior';

const LlmQuery: React.FC<LlmQueryProps> = (props) => {
  const { placeholder = "Enter your query...", disabled = false } = props;
  const { state, handleQueryChange, handleSubmit } = useLlmQueryBehavior(props);

  console.log(state.query);
  return (
    <QueryContainer>
      <form onSubmit={handleSubmit}>
        <StyledTextField
          fullWidth
          multiline
          rows={4}
          value={state.query}
          onChange={handleQueryChange}
          placeholder={placeholder}
          disabled={disabled || state.isSubmitting}
          variant="outlined"
          InputProps={{
            style: {
              fontSize: '0.9rem',
              lineHeight: '1.5',
            },
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SubmitButton
            type="submit"
            disabled={state.query.length === 0 || state.isSubmitting || disabled}
          >
            {state.isSubmitting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Submit Query'
            )}
          </SubmitButton>
        </div>
      </form>
    </QueryContainer>
  );
};

export default LlmQuery; 