import { getPhotos } from './server-utils.js';

let photosData = [];

export async function loadPhotosData() {
  photosData = await getPhotos();
  return photosData;
}

export function getPhotosData() {
  return photosData;
}


