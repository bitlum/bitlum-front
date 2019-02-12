/**
 * Entrypoint of vendors store
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import logger from 'utils/logging';

import vendorShark from 'assets/icons/vendors/shark.svg';
import vendorBear from 'assets/icons/vendors/bear.svg';
import vendorBird from 'assets/icons/vendors/bird.svg';
import vendorDog from 'assets/icons/vendors/dog.svg';
import vendorCat from 'assets/icons/vendors/cat.svg';
import vendorLion from 'assets/icons/vendors/lion.svg';
import vendorFrog from 'assets/icons/vendors/frog.svg';
import vendorChicken from 'assets/icons/vendors/chicken.svg';
import vendorElephant from 'assets/icons/vendors/elephant.svg';
import vendorFish from 'assets/icons/vendors/fish.svg';
import vendorGorilla from 'assets/icons/vendors/gorilla.svg';
import vendorHorse from 'assets/icons/vendors/horse.svg';
import vendorPenguin from 'assets/icons/vendors/penguin.svg';
import vendorSquirrel from 'assets/icons/vendors/squirrel.svg';

import { createDataFetcher } from './dataGeneric';

const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const vendors = {
  randomVendors: (() =>
    [].concat(
      ...[
        { name: 'Shark', iconUrl: vendorShark },
        { name: 'Bear', iconUrl: vendorBear },
        { name: 'Bird', iconUrl: vendorBird },
        { name: 'Dog', iconUrl: vendorDog },
        { name: 'Cat', iconUrl: vendorCat },
        { name: 'Lion', iconUrl: vendorLion },
        { name: 'Frog', iconUrl: vendorFrog },
        { name: 'Chicken', iconUrl: vendorChicken },
        { name: 'Elephant', iconUrl: vendorElephant },
        { name: 'Fish', iconUrl: vendorFish },
        { name: 'Gorilla', iconUrl: vendorGorilla },
        { name: 'Horse', iconUrl: vendorHorse },
        { name: 'Penguin', iconUrl: vendorPenguin },
        { name: 'Squirrel', iconUrl: vendorSquirrel },
      ].map(character =>
        [
          { color: '#e57373', name: 'Red' },
          { color: '#F06292', name: 'Pink' },
          { color: '#BA68C8', name: 'Purple' },
          { color: '#9575CD', name: 'Violet' },
          { color: '#7986CB', name: 'Indigo' },
          { color: '#64B5F6', name: 'Blue' },
          { color: '#4FC3F7', name: 'Sky' },
          { color: '#4DD0E1', name: 'Cyan' },
          { color: '#4DB6AC', name: 'Teal' },
          { color: '#81C784', name: 'Green' },
          { color: '#AED581', name: 'Grass' },
          { color: '#DCE775', name: 'Lime' },
          { color: '#FFF176', name: 'Yellow' },
          { color: '#FFD54F', name: 'Amber' },
          { color: '#FFB74D', name: 'Orange' },
          { color: '#A1887F', name: 'Brown' },
          { color: '#E0E0E0', name: 'Grey' },
          { color: '#90A4AE', name: 'Livid' },
        ].map(color => ({
          ...character,
          ...color,
          name: `${color.name} ${character.name}`,
        })),
      ),
    ))(),
  generateUnique(usedNames) {
    const unusedVendors = this.randomVendors.filter(vendor => !usedNames.includes(vendor.name));
    return unusedVendors[Math.floor(Math.random() * unusedVendors.length)];
  },
  getRandom(vuid) {
    let savedRandom;
    try {
      savedRandom = JSON.parse(localStorage.getItem('randomizedVendors')) || {};
    } catch (e) {
      savedRandom = {};
      log.error(e);
    }
    const usedNames = Object.keys(savedRandom).map(vuidSaved => savedRandom[vuidSaved].name);
    if (savedRandom[vuid]) {
      return [savedRandom[vuid]];
    }
    const generated = this.generateUnique(usedNames);
    localStorage.setItem(
      'randomizedVendors',
      JSON.stringify({ [vuid]: generated, ...savedRandom }),
    );
    return [generated];
  },
};

vendors.get = createDataFetcher({
  name: 'VendorsGet',
  async run(vuid, { origin = '' } = {}) {
    this.startFetching({
      url: `${this.fetchOptions.url}/${vuid}?origin=${origin}`,
      vuid,
    });
  },
  parseData(data, options) {
    if (data.length === 0) {
      return vendors.getRandom(options.vuid);
    }
    return data;
  },
  fetchOptions: {
    url: '/vendors',
  },
});

export default vendors;
