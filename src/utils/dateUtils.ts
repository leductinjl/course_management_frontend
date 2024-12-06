import { format, isValid, parseISO } from 'date-fns';

/**
 * Format a date string to display format
 * @param dateString - ISO date string or undefined
 * @param formatString - date-fns format string (default: 'dd/MM/yyyy HH:mm')
 * @param fallback - Value to return if date is invalid (default: 'N/A')
 * @returns Formatted date string or fallback value
 */
export const formatDate = (
  dateString?: string, 
  formatString: string = 'dd/MM/yyyy HH:mm',
  fallback: string = 'N/A'
): string => {
  if (!dateString) return fallback;
  
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return fallback;
    return format(date, formatString);
  } catch {
    return fallback;
  }
};

/**
 * Format a date string to date only format
 * @param dateString - ISO date string or undefined
 * @param fallback - Value to return if date is invalid (default: 'N/A')
 * @returns Formatted date string or fallback value
 */
export const formatDateOnly = (
  dateString?: string,
  fallback: string = 'N/A'
): string => {
  return formatDate(dateString, 'dd/MM/yyyy', fallback);
};

/**
 * Format a date string to datetime format
 * @param dateString - ISO date string or undefined
 * @param fallback - Value to return if date is invalid (default: 'N/A')
 * @returns Formatted datetime string or fallback value
 */
export const formatDateTime = (
  dateString?: string,
  fallback: string = 'N/A'
): string => {
  return formatDate(dateString, 'dd/MM/yyyy HH:mm', fallback);
}; 