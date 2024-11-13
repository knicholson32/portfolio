
export const load = async ({ route, parent }) => {

  const data = await parent();

  return {
    meta: data.postMeta.posts[route.id.replace('/post/', '')]
  }
}