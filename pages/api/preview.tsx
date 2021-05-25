import { slugToURL } from '@lib/SlugToURL';

export default function handler(req, res) {
  const { secret, slug, typename } = req?.query;
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (secret !== 'mwpreviewcontent04hdksh' || !slug) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  let redirect;

  if (!typename && !slug) {
    redirect = '/';
  } else {
    redirect = slugToURL(typename, slug);
  }

  // Enable Preview Mode by setting the cookies, set to 5 minutes
  res.setPreviewData({ maxAge: 60 * 5 });

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(redirect);
}
