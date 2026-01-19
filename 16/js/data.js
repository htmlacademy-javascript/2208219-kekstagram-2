import { newFetch } from './serverutils.js';

let photosData = [];

export async function loadPhotosData() {
  photosData = await newFetch();
  return photosData;
}

export function getPhotosData() {
  return photosData;
}


