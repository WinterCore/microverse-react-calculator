import calculate from './calculate';
import operate from './operate';

describe('Calculate', () => {
  describe('Clearing (Using the AC button)', () => {
    test('Clears everything when AC is used', () => {
      const data1 = { next: '1', operation: '+' };
      const data2 = { next: '1', operation: '+', total: '123' };

      const result1 = calculate(data1, 'AC');
      const result2 = calculate(data2, 'AC');

      expect(result1).toEqual({});
      expect(result2).toEqual({});
    });
  });

  describe('Digit management', () => {
    test('Sets next to the specified digit when next & operation are empty', () => {
      const data = {};

      const result = calculate(data, '1');

      expect(result).toEqual({ next: '1' });
    });

    test('Appends the specified digit to next when next already contains other digits', () => {
      const data = { next: '123' };

      const result = calculate(data, '1');

      expect(result).toEqual({ next: '1231' });
    });

    test('Ignores zeroes at the start (when next is empty)', () => {
      const data = {};

      const result = calculate(data, '0');

      expect(result).toEqual({});
    });

    test('Sets total to the specified digit when next & operation are filled and total is empty', () => {
      const data = { next: '1', operation: '+' };

      const result = calculate(data, '1');

      expect(result).toEqual(Object.assign(data, { total: '1' }));
    });

    test('Sets total to the specified digit when next & operation are filled and total contains digits', () => {
      const data = { next: '1', operation: '+', total: '123' };

      const result = calculate(data, '1');

      expect(result).toEqual(Object.assign(data, { total: '1231' }));
    });

    test('Ignores extra zeroes at the start', () => {
      const data = { next: '1', operation: '+', total: '0' };

      const result = calculate(data, '0');

      expect(result).toEqual(data);
    });

    test('Adds the decimal dot correctly and doesn\'t allow duplicate decimal dots', () => {
      const data1 = {};
      const data2 = { next: '1' };
      const data3 = { next: '1.1' };
      const data4 = { next: '.1' };

      const result1 = calculate(data1, '.');
      const result2 = calculate(data2, '.');
      const result3 = calculate(data3, '.');
      const result4 = calculate(data4, '.');

      expect(result1).toEqual({ next: '.' });
      expect(result2).toEqual({ next: '1.' });
      expect(result3).toEqual({ next: '1.1' });
      expect(result4).toEqual({ next: '.1' });
    });
  });

  describe('Handle operations', () => {
    test('Ignores an operation when next & total are empty', () => {
      const result = calculate({}, '+');

      expect(result).toEqual({});
    });

    test('Sets the operation when next is not empty but total is empty', () => {
      const data = { next: '123' };

      const result = calculate(data, '+');

      expect(result).toEqual(Object.assign(data, { operation: '+' }));
    });

    test('Sets next to the result & sets the provided operation if next, operation & total are not empty', () => {
      const data = { next: '1', operation: '-', total: '2' };

      const result = calculate(data, '+');

      expect(result).toEqual({ next: operate(data.next, data.total, data.operation), operation: '+' });
    });

    test('Changes the sign of the last used number when using the +/- sign', () => {
      const data1 = {};
      const data2 = { next: '11' };
      const data3 = { next: '11', operation: '-', total: '15' };

      const result1 = calculate(data1, '+/-');
      const result2 = calculate(data2, '+/-');
      const result3 = calculate(data3, '+/-');

      expect(result1).toEqual({});
      expect(result2).toEqual({ next: operate(data2.next, '-1', 'X') });
      expect(result3).toEqual(Object.assign(data3, { total: operate(data3.total, '-1', 'X') }));
    });

    test('Calculates the result when using the percentage (%) sign correctly', () => {
      const data1 = {};
      const data2 = { next: '11' };
      const data3 = { next: '10', operation: '-', total: '15' };

      const result1 = calculate(data1, '%');
      const result2 = calculate(data2, '%');
      const result3 = calculate(data3, '%');

      expect(result1).toEqual({});
      expect(result2).toEqual(data2);
      expect(result3).toEqual(Object.assign(data3, { total: '1.5' }));
    });
  });

  describe('Handle equals (=) sign', () => {
    test('Ignore the equals operation if any of next, operation and total are empty', () => {
      const data1 = {};
      const data2 = { next: '1' };
      const data3 = { next: '12', operation: '-' };

      const result1 = calculate(data1, '=');
      const result2 = calculate(data2, '=');
      const result3 = calculate(data3, '=');

      expect(result1).toEqual(data1);
      expect(result2).toEqual(data2);
      expect(result3).toEqual(data3);
    });

    test('Calculate the result if total, operation & next are filled', () => {
      const data = { next: '100', operation: '÷', total: '10' };

      const result = calculate(data, '=');

      expect(result.next).toEqual(operate(data.next, data.total, data.operation));
    });
  });
});
