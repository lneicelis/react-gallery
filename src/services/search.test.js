import {assert} from 'chai';
import filterByTitle from './search';

describe('photos search', () => {

    const data = [
        {
            title: 'should return all if needle is not provided',
            sample: ['hello', 'world'],
            needle: '',
            expectation: ['hello', 'world']
        },
        {
            title: 'should match title from beginning of the word',
            sample: ['hello', 'world'],
            needle: 'hell',
            expectation: ['hello']
        },
        {
            title: 'should match at the middle of the word',
            sample: ['hello', 'world'],
            needle: 'ell',
            expectation: ['hello']
        },
        {
            title: 'should match at the end of the word',
            sample: ['hello', 'world'],
            needle: 'rld',
            expectation: ['world']
        },
        {
            title: 'should match if two words are searched',
            sample: ['hello', 'world', 'say goodbye'],
            needle: 'say bye',
            expectation: ['say goodbye']
        },
        {
            title: 'should be case insensitive',
            sample: ['hello', 'world', 'World'],
            needle: 'world',
            expectation: ['world', 'World']
        }
    ];

    data.forEach(test => {
        it(test.title, () => {
            const result = test.sample
        .filter(filterByTitle(test.needle));

            assert.deepEqual(test.expectation, result);
        });
    });
});