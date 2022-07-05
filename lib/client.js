/* This will be used for our sanity.io client */
import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// create the sanity client object and immediately export it 
export const client = sanityClient({
    projectId: '3t3tdzj2',
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: true, 
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN 
}); 

// create the image builder so we can use it 
const builder = imageUrlBuilder(client); 

// Sanity will give us all the URL's for our images given a source 
export const urlFor = (source) => builder.image(source); 