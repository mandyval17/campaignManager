/* eslint-disable @typescript-eslint/no-explicit-any */

import { TimeFormat } from '../components/types/models/common';


/**
 * Removes the trailing slash from the input string if it exists.
 *
 * @param inputString - The input string from which to remove the trailing slash.
 * @returns The input string with the trailing slash removed, or the original string if no trailing slash was found.
 */
export function removeTrailingSlash(inputString: string) {
  if (inputString.endsWith('/')) {
    return inputString.slice(0, -1); // Remove the last character
  }
  return inputString;
}

/**
 * Checks if an object is empty.
 *
 * An object is considered empty if it has no own properties and 
 * its constructor is the built-in Object.
 *
 * @param obj - The object to check for emptiness.
 * @returns True if the object is empty, otherwise false.
 */

export function isEmptyObject(obj: Record<string, unknown>) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * Omits the given keys from the input object.
 *
 * @param obj - The input object from which to omit the given keys.
 * @param keysToRemove - The array of keys to remove from the input object.
 * @returns The input object with the specified keys omitted.
 */

export function omit<T extends object, K extends keyof T>(obj: T, keysToRemove: K[]): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keysToRemove.includes(key as K))
  ) as Omit<T, K>;
}

/**
 * Returns a debounced version of the given function.
 *
 * @param fn - The function to debounce.
 * @param delay - The delay to wait before calling the debounced function.
 * @returns A debounced function that will call the original function after the specified delay.
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Converts a given time in HH:mm or HH:mm A format to a Date object.
 * @param {TimeFormat} time - The time in HH:mm or HH:mm A format.
 * @returns {Date} A Date object representing the given time today.
 */
export const convertTimeToDate = (time: TimeFormat): Date => {
  // Get current date
  const now = new Date();

  // Split the time into components
  const timeParts = time.match(/(\d+):(\d+)\s*(AM|PM)?/i);

  if (!timeParts) {
    return now;
  }

  let hours = parseInt(timeParts[1], 10);
  const minutes = parseInt(timeParts[2], 10);
  const period = timeParts[3];

  if (period) {
    // Handle AM/PM
    if (period.toUpperCase() === 'PM' && hours < 12) {
      hours += 12;
    } else if (period.toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }
  }

  // Set the hours and minutes to the current date
  now.setHours(hours);
  now.setMinutes(minutes);
  now.setSeconds(0);
  now.setMilliseconds(0);

  return now;
};

/**
 * Converts a given string into a slug by taking the first letter of each word.
 * The resulting slug is a concatenation of the lowercase initial letters of each word.
 * Empty words are ignored.
 *
 * @param str - The input string to be slugified.
 * @returns - The generated slug from the input string.
 */

export function slugify(str: string): string {
  return str
    .split(' ')
    .filter(word => word.length > 0 && word.toLowerCase() !== 'and') // Filter out any empty words
    .map(word => word[0].toLowerCase())
    .join('');
}


/**
 * Converts a given string into a slug by taking the first letter of each word.
 * The resulting slug is a concatenation of the lowercase initial letters of each word.
 * Empty words are ignored.
 *
 * @param key - The input string to be slugified.
 * @returns - The generated slug from the input string.
 */
export function keyFormatter(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase letters
    .replace(/(\d+)/g, ' $1 ')           // Add space before and after numbers
    .replace(/_/g, ' ')                  // Replace underscores with spaces
    .replace(/\s+/g, ' ')                // Replace multiple spaces with a single space
    .trim()                              // Remove extra spaces at the start and end
    .replace(/^\w/, c => c.toUpperCase()); // Capitalize the first letter of the string
}
