/**
 * Dummy MySQL Driver - Replit ortamı için
 * Bu modül, MySQL'in mevcut olmadığı Replit ortamında kullanılır.
 * In-memory depolama kullanacağımız için sadece boş nesneler döndürür.
 */
import * as schema from '@shared/mysql-schema';

// Sahte Pool Nesnesi
const dummyPool = {
  getConnection: () => Promise.resolve({ 
    release: () => {},
    query: () => Promise.resolve([[], []]),
    execute: () => Promise.resolve([[], []])
  }),
  query: () => Promise.resolve([[], []]),
  execute: () => Promise.resolve([[], []]),
  end: () => Promise.resolve(),
  on: () => {},
  format: () => ""
};

// Sahte Drizzle Nesnesi
const dummyDrizzle = {
  query: () => Promise.resolve([]),
  select: () => ({ from: () => ({}) }),
  insert: () => ({ values: () => ({}) }),
  update: () => ({ set: () => ({}) }),
  delete: () => ({ from: () => ({}) }),
  transaction: (callback: any) => Promise.resolve(callback()),
  execute: () => Promise.resolve([]),
  prepare: () => ({ execute: () => Promise.resolve([]) }),
  schema
};

console.log('Replit ortamı - MySQL dummy driver kullanılıyor');
console.log('Not: In-memory depolama varsayılan olarak kullanılacak');

// Drizzle nesnesi ve Pool'u dışa aktar
export const db = dummyDrizzle;
export const pool = dummyPool;