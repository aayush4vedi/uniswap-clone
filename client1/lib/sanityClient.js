import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "coo2kv74",
  dataset: "production",
  apiVersion: "v1",
  token:
    "sk1pkdXwhQc43bKliYkNEeNQSm469J3Mrg7JI7slx7OZgedcvZydS13dnat6bPCQLy4vkaigsHDEx28ZISnDHfc5s930PMgObsNUobzKfRlbVKeL1P8Fa3uHGeoHmYhgpjiAd8JpBZ6Y1ouScPFUQLjnqvl7A87S5PXeQ2t3a7yUPfv4YWwO",
  useCdn: false,
});
