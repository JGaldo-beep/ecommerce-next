import sanityClient from "@sanity/client";
import imageBuilder from "@sanity/image-url";

export const client = sanityClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: "production",
	apiVersion: "2022-12-16",
	useCdn: true,
	token: process.env.NEXT_PUBLIC_API_TOKEN,
});

const builder = imageBuilder(client);

export const urlFor = source => builder.image(source); //once per project
