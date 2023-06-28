export const createSlug = (title) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  
    return slug;
  };