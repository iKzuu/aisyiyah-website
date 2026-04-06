import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { createImageUrlBuilder } from "@sanity/image-url";
import {
  getPosts,
  type SanityPost,
} from "@/src/lib/sanity";
import { extractTextFromBody } from "@/src/lib/extractText";
import { client } from "@/src/lib/sanityClient";
import { Button } from "@/src/components/ui/Button";

const builder =
  createImageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export const metadata = {
  title: "Blog | Aisyiyah Ngasem",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali Ke Beranda
          </Link>
          <span className="block text-sm font-medium text-primary uppercase tracking-wider">
            Our Blog
          </span>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground text-balance">
            Kabar Terbaru Aisyiyah
            Ngasem
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed text-pretty">
            Ikuti perkembangan
            program, dokumentasi
            pengajian, dan aksi
            sosial kami di
            lingkungan Ngasem.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No posts yet.
                Check back soon!
              </p>
            </div>
          ) : (
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
                          .width(
                            800,
                          )
                          .height(
                            500,
                          )
                          .url()
                      : "https://placehold.co/600x400";
                  const excerpt =
                    extractTextFromBody(
                      post.body ||
                        [],
                    );

                  return (
                    <article
                      key={
                        post._id
                      }
                      className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                    >
                      {/* Image */}
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="block relative h-56 overflow-hidden"
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
                          <h2 className="mt-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {
                              post.title
                            }
                          </h2>
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
                          Read
                          More
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </article>
                  );
                },
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-card border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
            Want to stay updated?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Subscribe to our
            newsletter for the
            latest news, stories,
            and event
            announcements.
          </p>
          <Button
            asChild
            className="mt-8"
          >
            <Link href="/#contact">
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
