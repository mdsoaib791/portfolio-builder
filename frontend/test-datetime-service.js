// Simple test for the DateTime service conversion method
// This demonstrates the date conversion functionality

function convertDateToISOString(dateString) {
    if (!dateString) {
        return undefined;
    }

    try {
        const isoString = new Date(dateString + 'T00:00:00.000Z').toISOString();
        return isoString;
    } catch (error) {
        console.error('Error converting date to ISO string:', error);
        return undefined;
    }
}

// Test cases
console.log('=== DateTime Service Conversion Test ===');

// Test valid date strings (frontend format to API format)
console.log('Input: "2025-08-08"');
console.log('Output:', convertDateToISOString('2025-08-08'));

console.log('\nInput: "2024-12-31"');
console.log('Output:', convertDateToISOString('2024-12-31'));

console.log('\nInput: "2023-01-01"');
console.log('Output:', convertDateToISOString('2023-01-01'));

// Test edge cases
console.log('\nInput: null');
console.log('Output:', convertDateToISOString(null));

console.log('\nInput: undefined');
console.log('Output:', convertDateToISOString(undefined));

console.log('\nInput: ""');
console.log('Output:', convertDateToISOString(''));

console.log('\nInput: "invalid-date"');
console.log('Output:', convertDateToISOString('invalid-date'));

console.log('\n=== Test Complete ===');
