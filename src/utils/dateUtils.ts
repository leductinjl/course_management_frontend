import { format, isValid, parseISO } from 'date-fns';
import dayjs from 'dayjs';

/**
 * Format a date string to display format
 * @param date - ISO date string or Date object or undefined
 * @returns Formatted date string or empty string
 */
export const formatDate = (date?: string | Date | null) => {
  if (!date) return '';
  return dayjs(date).format('DD/MM/YYYY');
};

/**
 * Format a date string to date only format
 * @param dateString - ISO date string or undefined
 * @returns Formatted date string or empty string
 */
export const formatDateOnly = (dateString?: string | null): string => {
  return formatDate(dateString);
};

/**
 * Format a date string to datetime format
 * @param dateString - ISO date string or undefined
 * @returns Formatted datetime string or empty string
 */
export const formatDateTime = (dateString?: string | null): string => {
  return formatDate(dateString);
}; 