import React from 'react';
import App from './Components/App';
jest.mock('react-dom');
import ReactDOM from 'react-dom';

describe('Root file index.js', () => {
	it('Renders the app using ReactDOM', () => {
    require('./index');
		expect(ReactDOM.render).toHaveBeenCalledWith(
			(
				<React.StrictMode>
					<App />
				</React.StrictMode>
      ),
      document.getElementById('root')
		);
	});
});