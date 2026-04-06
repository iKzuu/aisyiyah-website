import { client } from "./sanityClient";

// Sanity CMS Types (Interface sudah benar)
export interface SanityPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  publishedAt?: string;
  body?: {
    _type: string;
    _key: string;
    children?: {
      text: string;
    }[];
    asset?: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  }[];
  author?: {
    name: string;
    image?: {
      asset: {
        url: string;
      };
    };
  };
}

export async function getPosts(): Promise<SanityPost[]> {
  // PERBAIKAN DI SINI: Tambahkan dereferencing (->) pada author
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage {
      asset->{
        url
      },
      alt
    },
    publishedAt,
    body,
    "author": author-> { 
      name,
      image {
        asset-> {
          url
        }
      }
    }
  }`;

  return await client.fetch(query);
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage {
      asset->{
        url
      },
      alt
    },
    publishedAt,
    body,
    "author": author-> {
      name,
      image {
        asset-> {
          url
        }
      }
    }
  }`;

  return await client.fetch(query, { slug });
}