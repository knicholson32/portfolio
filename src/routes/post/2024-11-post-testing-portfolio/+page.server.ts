
export const load = async ({ route, parent }) => {

  const data = await parent();

  return {
    meta: data.posts[route.id.replace('/post/', '')]
  }
}