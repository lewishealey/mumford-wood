const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_DELIVERY_TOKEN

const client = require('contentful').createClient({
  space: space,
  accessToken: accessToken,
})

export async function fetchEntries() {
  const entries = await client.getEntries()
  if (entries.items) return entries.items
  console.log(`Error getting Entries for ${contentType.name}.`)
}

export async function fetchProducts() {
    const entries = await client.getEntries({
        content_type: 'product',
        order: 'fields.type',
    })
    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${contentType.name}.`)
}

export async function fetchPages() {
    const entries = await client.getEntries({
        content_type: 'page',
    })
    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${contentType.name}.`)
}

export async function fetchCaseStudies(number) {
    const entries = await client.getEntries({
        content_type: 'caseStudy',
        limit: number,
        order: '-fields.date',
    })
    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${contentType.name}.`)
}

export async function fetchCaseStudy(slug) {
    const product = await client.getEntries({
        content_type: 'caseStudy',
        'fields.slug[in]': slug,
    })
    if (product.items) return product.items
}

export async function fetchBrochures() {
    const entries = await client.getEntries({
        content_type: 'brochure',
    })
    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${contentType.name}.`)
}


export async function fetchArticles() {
    const entries = await client.getEntries({
        content_type: 'news',
    })
    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${contentType.name}.`)
}


export async function fetchTechSpecs() {
    const product = await client.getEntries({
        content_type: 'page',
        'fields.slug[in]': 'technical-specs',
    })
    if (product.items) return product.items
}

export async function fetchArticle(slug) {
    const product = await client.getEntries({
        content_type: 'news',
        'fields.slug[in]': slug,
    })
    if (product.items) return product.items
}

export async function fetchRanges() {
    const entries = await client.getEntries({
        content_type: 'productRange',
        order: 'fields.order',
    })
    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${contentType.name}.`)
}

export async function fetchOffices() {
    const entries = await client.getEntries({
        content_type: 'office',
    })
    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${contentType.name}.`)
}

export async function fetchHomepages() {
    const entries = await client.getEntries({
        content_type: 'homepage',
    })
    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${contentType.name}.`)
}


export async function fetchTeam() {
    const entries = await client.getEntries({
        content_type: 'teamMember',
    })
    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${contentType.name}.`)
}

export async function fetchCadDrawings() {
    const entries = await client.getEntries({
        content_type: 'cadDrawing',
    })
    if (entries.items) return entries.items
}

export async function fetchSalesTeam(slug) {
    const entries = await client.getEntries({
        content_type: 'salesRep',
    })
    if (entries.items) return entries.items
}

export async function fetchPage(slug) {
    const page = await client.getEntries({
        content_type: 'page',
        'fields.slug[in]': slug,
    })
    if (page.items) return page.items
    console.log(`Error getting page for ${slug}.`)
}

export async function fetchRangeProducts(range) {
    const product = await client.getEntries({
        content_type: 'product',
        'fields.range[in]': range,
        order: 'fields.rangeOrder',
    })
    if (product.items) return product.items
}


export async function fetchRelatedProducts(range) {
    const product = await client.getEntries({
        content_type: 'product',
        'fields.range[in]': range,
    })
    if (product.items) return product.items
}

export async function fetchProduct(range, slug) {
    const product = await client.getEntries({
        content_type: 'product',
        'fields.range[in]': range,
        'fields.slug[in]': slug,
    })
    if (product.items) return product.items
}

export async function fetchProductRange(range) {
    const product = await client.getEntries({
        content_type: 'productRange',
        'fields.slug[in]': range,
        order: '-fields.order',
    })
    if (product.items) return product.items
}

//contentful.entries(content_type: 'myUpdates', include: 10, 'fields.slug' => params[:id]).first

//this.contentfulClient.getEntries({
//     content_type: 'YOUR_CONTENT_KEY',
//     'fields.slug[in]': 'THE_SLUG_YOU_ARE_LOOKING_FOR',
//   })
