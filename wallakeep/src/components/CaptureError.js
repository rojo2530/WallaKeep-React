import React from 'react';

export default function CaptureError ({ message, error }) {
	return (
		<div className="notification is-danger" id="no-results">
			<p>{message}</p>
			<p>Detail Error: {error}</p>
		</div>
	)
}