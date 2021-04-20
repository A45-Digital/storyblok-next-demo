export default async function preview(req, res) {
  console.log('DEBUG: preview(): activate preview mode')
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== process.env.STORYBLOK_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Set cookie to None, so it can be read in the Storyblok iframe
  const cookies = res.getHeader('Set-Cookie')
  res.setHeader('Set-Cookie', cookies.map((cookie) => cookie.replace('SameSite=Lax', 'SameSite=None')))

  console.log('DEBUG: preview(): redirect to:', `/${req.query.slug}`)

  // Redirect to the path from the fetched post
  res.redirect(`/${req.query.slug}`)
  res.end()
}
