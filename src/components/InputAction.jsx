import React from 'react';
import FontAwesome from 'react-fontawesome';

const InputAction = ({onChange, value, onKeyDown, actionText, iconName, onAction}) => (
	<div className={`input-action-wrapper ${iconName && 'with-icon'}`}>
		<span>
			<input onChange={onChange} value={value} onKeyDown={onKeyDown} className='input-action-control' />
			<span onClick={onAction} className='input-action-button'>{iconName ? <FontAwesome name={iconName} />: actionText}</span>
		</span>
	</div>
);

export default InputAction;
