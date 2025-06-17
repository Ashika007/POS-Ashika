import affogato from '../assets/images/Affogato.jpg';
import americano from '../assets/images/Americano.jpg';
import blackforest from '../assets/images/Blackforest.jpg';
import butterCroissant from '../assets/images/ButterCroissant.jpg';
import cappuccino from '../assets/images/Cappuccino.jpg';
import cheeseCroissant from '../assets/images/CheeseCroissant.jpg';
import chocolateCroissant from '../assets/images/ChocolateCroissant.jpg';
import cupcake from '../assets/images/Cupcake.jpg';
import donut from '../assets/images/Donut.jpg';
import doppio from '../assets/images/Doppio.jpg';
import espresso from '../assets/images/Espresso.jpg';
import icedAmericano from '../assets/images/IcedAmericano.jpg';
import icedCoffee from '../assets/images/IcedCoffee.jpg';
import icedLatte from '../assets/images/IcedLatte.jpg';
import latte from '../assets/images/Latte.jpg';
import logo from '../assets/images/logo.png';
import macchiato from '../assets/images/Macchiato.jpg';
import mocha from '../assets/images/Mocha.jpg';
import muffins from '../assets/images/Muffins.jpg';
import redVelvet from '../assets/images/RedVelvet.jpg';
import whiteforest from '../assets/images/Whiteforest.jpg';

export const popularDrinks = [
  {
    id: 1,
    image: affogato,
    name: 'Affogato',
    numberOfOrders: 210,
  },
  {
    id: 2,
    image: americano,
    name: 'Americano',
    numberOfOrders: 190,
  },
  {
    id: 3,
    image: blackforest,
    name: 'Black Forest',
    numberOfOrders: 200,
  },
  {
    id: 4,
    image: butterCroissant,
    name: 'Butter Croissant',
    numberOfOrders: 220,
  },
  {
    id: 5,
    image: cappuccino,
    name: 'Cappuccino',
    numberOfOrders: 310,
  },
  {
    id: 6,
    image: cheeseCroissant,
    name: 'Cheese Croissant',
    numberOfOrders: 180,
  },
  {
    id: 7,
    image: chocolateCroissant,
    name: 'Chocolate Croissant',
    numberOfOrders: 175,
  },
  {
    id: 8,
    image: cupcake,
    name: 'Cupcake',
    numberOfOrders: 195,
  },
  {
    id: 9,
    image: donut,
    name: 'Donut',
    numberOfOrders: 250,
  },
  {
    id: 10,
    image: doppio,
    name: 'Doppio',
    numberOfOrders: 165,
  },
  {
    id: 11,
    image: espresso,
    name: 'Espresso',
    numberOfOrders: 270,
  },
  {
    id: 12,
    image: icedAmericano,
    name: 'Iced Americano',
    numberOfOrders: 225,
  },
  {
    id: 13,
    image: icedCoffee,
    name: 'Iced Coffee',
    numberOfOrders: 260,
  },
  {
    id: 14,
    image: icedLatte,
    name: 'Iced Latte',
    numberOfOrders: 215,
  },
  {
    id: 15,
    image: latte,
    name: 'Latte',
    numberOfOrders: 280,
  },
  {
    id: 16,
    image: macchiato,
    name: 'Macchiato',
    numberOfOrders: 205,
  },
  {
    id: 17,
    image: mocha,
    name: 'Mocha',
    numberOfOrders: 240,
  },
  {
    id: 18,
    image: muffins,
    name: 'Muffins',
    numberOfOrders: 198,
  },
  {
    id: 19,
    image: redVelvet,
    name: 'Red Velvet',
    numberOfOrders: 230,
  },
  {
    id: 20,
    image: whiteforest,
    name: 'White Forest',
    numberOfOrders: 200,
  },
];

export const tables = [
  { id: 1, name: 'Table 1', status: 'Booked', initial: 'AM', seats: 4 },
  { id: 2, name: 'Table 2', status: 'Available', initial: 'MB', seats: 6 },
  { id: 3, name: 'Table 3', status: 'Booked', initial: 'JS', seats: 2 },
  { id: 4, name: 'Table 4', status: 'Available', initial: 'HR', seats: 4 },
  { id: 5, name: 'Table 5', status: 'Booked', initial: 'PL', seats: 3 },
  { id: 6, name: 'Table 6', status: 'Available', initial: 'RT', seats: 4 },
  { id: 7, name: 'Table 7', status: 'Booked', initial: 'LC', seats: 5 },
  { id: 8, name: 'Table 8', status: 'Available', initial: 'DP', seats: 5 },
  { id: 9, name: 'Table 9', status: 'Booked', initial: 'NK', seats: 6 },
  { id: 10, name: 'Table 10', status: 'Available', initial: 'SB', seats: 6 },
  { id: 11, name: 'Table 11', status: 'Booked', initial: 'GT', seats: 4 },
  { id: 12, name: 'Table 12', status: 'Available', initial: 'JS', seats: 6 },
  { id: 13, name: 'Table 13', status: 'Booked', initial: 'EK', seats: 2 },
  { id: 14, name: 'Table 14', status: 'Available', initial: 'QN', seats: 6 },
  { id: 15, name: 'Table 15', status: 'Booked', initial: 'TW', seats: 3 },
];

export const hotBeverages = [
  { id: 1, name: 'Espresso', price: 120, category: 'Hot' },
  { id: 2, name: 'Americano', price: 130, category: 'Hot' },
  { id: 3, name: 'Cappuccino', price: 150, category: 'Hot' },
  { id: 4, name: 'Latte', price: 150, category: 'Hot' },
  { id: 5, name: 'Doppio', price: 140, category: 'Hot' },
  { id: 6, name: 'Macchiato', price: 160, category: 'Hot' },
  { id: 7, name: 'Mocha', price: 170, category: 'Hot' },
  { id: 8, name: 'Affogato', price: 180, category: 'Hot' },
];

export const coldBeverages = [
  { id: 1, name: 'Iced Coffee', price: 160, category: 'Cold' },
  { id: 2, name: 'Iced Latte', price: 170, category: 'Cold' },
  { id: 3, name: 'Iced Americano', price: 150, category: 'Cold' },
];

export const pastries = [
  { id: 1, name: 'Black Forest', price: 200, category: 'Pastry' },
  { id: 2, name: 'Red Velvet', price: 210, category: 'Pastry' },
  { id: 3, name: 'White Forest', price: 220, category: 'Pastry' },
  { id: 4, name: 'Cupcake', price: 130, category: 'Pastry' },
  { id: 5, name: 'Muffins', price: 140, category: 'Pastry' },
];

export const donuts = [{ id: 1, name: 'Donut', price: 110, category: 'Sweet' }];

export const croissants = [
  { id: 1, name: 'Butter Croissant', price: 120, category: 'Croissant' },
  { id: 2, name: 'Cheese Croissant', price: 130, category: 'Croissant' },
  { id: 3, name: 'Chocolate Croissant', price: 140, category: 'Croissant' },
];

export const menus = [
  {
    id: 1,
    name: 'Hot Beverages',
    bgColor: '#c14444',
    icon: '☕',
    items: hotBeverages,
  },
  {
    id: 2,
    name: 'Cold Beverages',
    bgColor: '#2f90d1',
    icon: '🧊',
    items: coldBeverages,
  },
  {
    id: 3,
    name: 'Pastries',
    bgColor: '#ff8c42',
    icon: '🧁',
    items: pastries,
  },
  {
    id: 4,
    name: 'Donuts',
    bgColor: '#ff6f91',
    icon: '🍩',
    items: donut,
  },
  {
    id: 5,
    name: 'Croissants',
    bgColor: '#ffe156',
    icon: '🥐',
    items: croissants,
  },
];

export const metricsData = [
  {
    title: 'Revenue',
    value: 'Rs.50,846.90',
    percentage: '12%',
    color: '#025cca',
    isIncrease: false,
  },
  {
    title: 'Outbound Clicks',
    value: '10,342',
    percentage: '16%',
    color: '#02ca3a',
    isIncrease: true,
  },
  {
    title: 'Total Customer',
    value: '19,720',
    percentage: '10%',
    color: '#f6b100',
    isIncrease: true,
  },
  {
    title: 'Event Count',
    value: '20,000',
    percentage: '10%',
    color: '#be3e3f',
    isIncrease: false,
  },
];

export const itemsData = [
  {
    title: 'Total Categories',
    value: '8',
    percentage: '12%',
    color: '#5b45b0',
    isIncrease: false,
  },
  {
    title: 'Total Dishes',
    value: '50',
    percentage: '12%',
    color: '#285430',
    isIncrease: true,
  },
  {
    title: 'Active Orders',
    value: '12',
    percentage: '12%',
    color: '#735f32',
    isIncrease: true,
  },
  { title: 'Total Tables', value: '10', color: '#7f167f' },
];

export const orders = [
  {
    id: '101',
    customer: 'Amrit Raj',
    status: 'Ready',
    dateTime: 'January 18, 2025 08:32 PM',
    items: 8,
    tableNo: 3,
    total: 250.0,
  },
  {
    id: '102',
    customer: 'John Doe',
    status: 'In Progress',
    dateTime: 'January 18, 2025 08:45 PM',
    items: 5,
    tableNo: 4,
    total: 180.0,
  },
  {
    id: '103',
    customer: 'Emma Smith',
    status: 'Ready',
    dateTime: 'January 18, 2025 09:00 PM',
    items: 3,
    tableNo: 5,
    total: 120.0,
  },
  {
    id: '104',
    customer: 'Chris Brown',
    status: 'In Progress',
    dateTime: 'January 18, 2025 09:15 PM',
    items: 6,
    tableNo: 6,
    total: 220.0,
  },
];
