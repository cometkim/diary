import * as assert from 'uvu/assert';
import * as diary from '../src';
import { json } from '../src/reporters';
import { describe, trap_console } from './helpers';

describe('api', (it) => {
	it('should export', () => {
		assert.type(json, 'function');
	});
});

describe('output', (it) => {
	it('simple', () => {
		let result;
		const trap = trap_console('log', (...args: any) => {
			result = args.join('');
		});
		const scope = diary.diary('json', json);
		scope.info('foo %s', 'bar');

		assert.equal(
			result,
			'{"name":"json","level":"info","message":"foo bar"}',
		);
		trap();
	});

	it('with rest', () => {
		let result;
		const trap = trap_console('log', (...args: any) => {
			result = args.join('');
		});

		const scope = diary.diary('json', (event) => {
			event.context = { sequence: 0 };
			json(event);
		});

		scope.info('foo %s', 'bar');

		assert.equal(
			result,
			'{"name":"json","level":"info","message":"foo bar","context":{"sequence":0}}',
		);
		trap();
	});
});
