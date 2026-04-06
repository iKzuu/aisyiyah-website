import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createImageUrlBuilder } from "@sanity/image-url";

import {
  getPosts,
  type SanityPost,
} from "../lib/sanity";
import { client } from "../lib/sanityClient";
import { extractTextFromBody } from "../lib/extractText";
import { Button } from "./ui/Button";

const builder =
  createImageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export async function BlogSection() {
  const posts = await getPosts();

  return (
    <section
      id="blog"
      className="py-20 md:py-32 bg-card"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Kabar Terbaru
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground text-balance">
              Kabar Terbaru
              Aisyiyah Ngasem
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Ikuti perkembangan
              program, dokumentasi
              pengajian, dan aksi
              sosial kami di
              lingkungan Ngasem.
            </p>
          </div>
          <Button
            variant="outline"
            className="w-fit"
            asChild
          >
            <Link href="/blog">
              Lihat Semua
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {posts.length === 0 && (
          <p className="text-muted-foreground text-center">
            No posts available
            yet.
          </p>
        )}

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(
            (
              post: SanityPost,
            ) => {
              const imageUrl =
                post.mainImage
                  ? urlFor(
                      post.mainImage,
                    )
                      .width(800)
                      .height(500)
                      .url()
                  : "https://placehold.co/600x400";
              const excerpt =
                extractTextFromBody(
                  post.body || [],
                );

              return (
                <article
                  key={post._id}
                  className="group bg-background rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                >
                  {/* Image */}
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="block relative h-52 overflow-hidden"
                  >
                    <Image
                      src={
                        imageUrl
                      }
                      alt={
                        post
                          .mainImage
                          ?.alt ||
                        post.title
                      }
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                    />
                  </Link>

                  {/* Content */}
                  <div className="p-6">
                    {post.publishedAt && (
                      <time className="text-xs text-muted-foreground">
                        {new Date(
                          post.publishedAt,
                        ).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month:
                              "long",
                            day: "numeric",
                          },
                        )}
                      </time>
                    )}
                    <Link
                      href={`/blog/${post.slug.current}`}
                    >
                      <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {
                          post.title
                        }
                      </h3>
                    </Link>

                    <p className="mt-2 text-muted-foreground text-sm leading-relaxed line-clamp-2">
                      {excerpt.length >
                      120
                        ? excerpt.slice(
                            0,
                            120,
                          ) +
                          "..."
                        : excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="inline-flex items-center mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Selengkapnya
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
