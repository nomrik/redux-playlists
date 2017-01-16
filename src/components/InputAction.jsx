import React from 'react';

const InputAction = ({onChange, value, onKeyDown, actionText, onAction}) => (
	<div className='input-action-wrapper'>
		<span>
			<input onChange={onChange} value={value} onKeyDown={onKeyDown} className='input-action-control' />
			<span onClick={onAction} className='input-action-button'>{actionText}</span>
		</span>
	</div>
);

export default InputAction;
