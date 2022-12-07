import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: 'ej8d264e',
    dataset: 'production',
    apiVersion: '2022-12-07',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
}
);

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source); //takes image to be rendered (source) as input (either a Sanity image record, an asset record, or just the asset id as a string input)
