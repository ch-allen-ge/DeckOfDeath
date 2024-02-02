import { describe, expect, test } from 'vitest'
import {
    validatePassword,
    validateUsername,
    validateLoginCredentials,
    validateSavedWorkoutName
} from './index';

//can only contain letters, numbers, or @ or .
describe('username validation', () => {
    test('should not accept username with special character', () => {
        const usernameWithSpecialCharacter = 'Us3rn4m3%%!!';
        expect(validateUsername(usernameWithSpecialCharacter)).toBe(false);
    });

    test('should accept username as email', () => {
        const usernameWithSpecialCharacter = 'user@gmail.com';
        expect(validateUsername(usernameWithSpecialCharacter)).toBe(true);
    });

    test('should accept username that only contains letters and numbers', () => {
        const normalUsername = 'Us3rn4m3';
        expect(validateUsername(normalUsername)).toBe(true);
    });
});

//must be minimum 8 characters, at least 1 lowercase letter and one number
describe('password validation', () => {
    test('should not accept password without number', () => {
        const passwordWithoutNumber = 'PAssword';
        expect(validatePassword(passwordWithoutNumber)).toBe(false);
    });

    test('should not accept password without lowercase letter', () => {
        const passwordWithoutLowercase = '1234PASS';
        expect(validatePassword(passwordWithoutLowercase)).toBe(false);
    });

    test('should accept passwords with lowercase letter and number', () => {
        const acceptedPassword = '1234PASSword';
        expect(validatePassword(acceptedPassword)).toBe(true);
    });

    test('should accept passwords with special characters', () => {
        const passwordWithSpecialCharacters = '1234PAss!!';
        expect(validatePassword(passwordWithSpecialCharacters)).toBe(true);
    });
});

//username and password field cannot be empty
describe('login validation', () => {
    test('should not accept a login with empty password', () => {
        const loginCredentials = {
            username: 'username',
            password: ''
        };

        expect(validateLoginCredentials(loginCredentials)).toBe(false);
    });

    test('should not accept a login with empty username', () => {
        const loginCredentials = {
            username: '',
            password: 'password'
        };

        expect(validateLoginCredentials(loginCredentials)).toBe(false);
    });

    test('should accept a login with username and password', () => {
        const loginCredentials = {
            username: 'username',
            password: 'password'
        };

        expect(validateLoginCredentials(loginCredentials)).toBe(true);
    });
});

describe('saved workout name validation', () => {
    test('should not accept empty saved workout name', () => {
        const emptyWorkoutName = '';

        expect(validateSavedWorkoutName(emptyWorkoutName)).toBe(false);
    });

    test('should accept non-empty saved workout name', () => {
        const nonEmptyWorkoutName = 'My First Workout';

        expect(validateSavedWorkoutName(nonEmptyWorkoutName)).toBe(true);
    });
});