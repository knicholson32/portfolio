export async function load({ params }) {
  const slug = params.slug
  const component = await import(`../../_content/posts/${slug}/index.md`)
  return {
    props: {
      page: component.default,
      metadata: component.metadata,
    }
  }
}