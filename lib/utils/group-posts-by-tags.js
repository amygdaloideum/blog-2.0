module.exports = function groupPostsByTags(posts) {
  const groups = [];
  posts.forEach(post => {
    const tags = post.fields.tags;
    tags.forEach(tag => {
      const existingGroup = groups.find(group => group.name === tag);
      if (existingGroup) {
        existingGroup.posts.push(post);
      } else {
        groups.push({ name: tag, posts: [post] });
      }
    });
  });
  return groups;
};
