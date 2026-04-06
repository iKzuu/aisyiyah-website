import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  User,
} from "lucide-react";
import { PortableText } from "@portabletext/react";
import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "@/src/lib/sanityClient";
import {
  getPostBySlug,
  getPosts,
} from "@/src/lib/sanity";
import { extractTextFromBody } from "@/src/lib/extractText";
import { Button } from "@/src/components/ui/Button";

const builder =
  createImageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset)
        return null;
      return (
        <div className="relative w-full aspect-video my-10 rounded-2xl overflow-hidden shadow-lg border border-border">
          <Image
            src={urlFor(
              value,
            ).url()}
            alt={
              value.alt ||
              "Gambar artikel"
            }
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">
        {children}
      </h3>
    ),
    normal: ({
      children,
    }: any) => (
      <p className="mb-6 leading-relaxed">
        {children}
      </p>
    ),
    blockquote: ({
      children,
    }: any) => (
      <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-foreground bg-muted/30 py-4 pr-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({
      children,
    }: any) => (
      <ul className="my-6 space-y-2 list-none">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({
      children,
    }: any) => (
      <li className="flex items-start gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
        <span>{children}</span>
      </li>
    ),
  },
};

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;
  const post =
    await getPostBySlug(slug);

  if (!post)
    return {
      title: "Post Not Found",
    };

  return {
    title: `${post.title} | Aisyiyah Ngasem`,
    description: post.body
      ? extractTextFromBody(
          post.body,
        ).substring(0, 160)
      : "",
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;
  const post =
    await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts =
    await getPosts();
  const relatedPosts = allPosts
    .filter(
      (p) => p._id !== post._id,
    )
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="relative bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Blog
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            {post.publishedAt && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(
                  post.publishedAt,
                ).toLocaleDateString(
                  "id-ID",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
              </span>
            )}
            {post.author && (
              <span className="inline-flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author.name}
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Main Featured Image */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-0 md:-mt-4">
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border">
          <Image
            src={
              post.mainImage.asset
                .url
            }
            alt={
              post.mainImage
                .alt || post.title
            }
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {post.author && (
          <div className="flex items-center gap-4 pb-8 mb-8 border-b border-border">
            {post.author.image
              ?.asset?.url ? (
              <Image
                src={
                  post.author
                    .image.asset
                    .url
                }
                alt={
                  post.author.name
                }
                width={56}
                height={56}
                className="rounded-full object-cover aspect-square border border-border"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
            )}
            <div>
              <p className="font-medium text-foreground">
                {post.author.name}
              </p>
              <p className="text-sm text-muted-foreground">
                Penulis
              </p>
            </div>
          </div>
        )}

        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-a:text-primary prose-strong:text-foreground">
          {post.body ? (
            <PortableText
              value={
                post.body as any
              }
              components={
                portableTextComponents
              }
            />
          ) : (
            <p>
              Konten tidak
              tersedia.
            </p>
          )}
        </div>

        {/* CTA */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground">
              Suka dengan artikel
              ini? Bagikan ke
              orang lain.
            </p>
            <Button asChild>
              <Link href="/#contact">
                Hubungi Kami{" "}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length >
        0 && (
        <section className="bg-card border-t border-border py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-semibold mb-10">
              Cerita Lainnya
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {relatedPosts.map(
                (rp) => (
                  <article
                    key={rp._id}
                    className="group bg-background rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all"
                  >
                    <Link
                      href={`/blog/${rp.slug.current}`}
                      className="block relative h-48 overflow-hidden"
                    >
                      <Image
                        src={
                          rp
                            .mainImage
                            .asset
                            .url
                        }
                        alt={
                          rp
                            .mainImage
                            .alt ||
                          rp.title
                        }
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </Link>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {rp.title}
                      </h3>
                      <Link
                        href={`/blog/${rp.slug.current}`}
                        className="inline-flex items-center mt-4 text-sm font-medium text-primary"
                      >
                        Baca
                        Selengkapnya{" "}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
