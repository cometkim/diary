import type { LogEvent, LogLevels } from 'diary';
import { sprintf } from 'diary/utils';

import { is_node } from './helpers';

export type Reporter = (event: LogEvent) => void;

export const json: Reporter = ({ name, level, message, extra, ...rest }) =>
	console.log(
		JSON.stringify({
			name,
			level,
			message: sprintf(message, ...extra),
			...rest,
		}),
	);

const loglevel_strings: Record<LogLevels, string> = {
	fatal: '✗ fatal',
	error: '✗ error',
	warn: '‼ warn ',
	debug: '● debug',
	info: 'ℹ info ',
	log: '◆ log  ',
} as const;
	
export const text: Reporter = (event) => {
	let label = '';
	if (is_node) label = `${loglevel_strings[event.level]} `;
	if (event.name) label += `[${event.name}] `;

	console[event.level === 'fatal' ? 'error' : event.level](label + event.message, ...event.extra);
};
