import { setMessage } from './helpers.js';

class ErrorReporter {
	static report(message) {
		setMessage(`
			<p class="text-red-700">
				${message}
			</p>
        `);

		throw message;
	}
}

export default ErrorReporter;
